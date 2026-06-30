const Wallet = require("../models/Wallet");
const Holding = require("../models/Holding");
const Order = require("../models/Order");
const getMarketPrice = require("../services/marketPriceService");
const Transaction = require("../models/Transaction");


// CLEAN SYMBOL HELPER

const normalizeSymbol = (symbol) => {
  if (!symbol) return null;
  return symbol.replace("NASDAQ:", "").replace("NYSE:", "").trim();
};

// Deterministic-ish color per symbol so the same stock always gets the same dot color
const LOGO_COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#06b6d4"];
const colorForSymbol = (symbol) => {
  const code = symbol.split("").reduce((sum, ch) => sum + ch.charCodeAt(0), 0);
  return LOGO_COLORS[code % LOGO_COLORS.length];
};


// BUY STOCK

const buyStock = async (req, res) => {
  try {
    const userId = req.user.id;
    let { symbol, quantity } = req.body;

    symbol = normalizeSymbol(symbol);
    quantity = Number(quantity);

    if (!symbol || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid symbol or quantity" });
    }

    const price = await getMarketPrice(symbol);

    if (price === null || price === undefined || isNaN(price)) {
      return res.status(500).json({ message: "Price not available" });
    }

    const totalCost = quantity * price;

    let wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      wallet = await Wallet.create({ userId, balance: 100000 });
    }

    if (wallet.balance < totalCost) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct wallet cash balance and save changes
    wallet.balance -= totalCost;
    await wallet.save();

    // Log the execution to your Transaction History collection
    await Transaction.create({
      userId,
      symbol,
      type: "BUY",
      quantity,
      price: price,
    });

    // Update or create user holdings records
    let holding = await Holding.findOne({ userId, symbol });

    if (!holding) {
      holding = await Holding.create({
        userId,
        symbol,
        quantity,
        avgBuyPrice: price,
      });
    } else {
      const newQty = holding.quantity + quantity;
      const newAvg = (holding.avgBuyPrice * holding.quantity + price * quantity) / newQty;

      holding.quantity = newQty;
      holding.avgBuyPrice = newAvg;
      await holding.save();
    }

    // Create an entry in orders history tracking table
    const order = await Order.create({
      userId,
      symbol,
      type: "BUY",
      quantity,
      price,
      total: totalCost,
    });

    return res.status(200).json({
      message: "Stock bought successfully",
      order,
      wallet,
      holding,
    });
  } catch (error) {
    console.error("BUY ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// SELL STOCK

const sellStock = async (req, res) => {
  try {
    const userId = req.user.id;
    let { symbol, quantity } = req.body;

    symbol = normalizeSymbol(symbol);
    quantity = Number(quantity);

    if (!symbol || !quantity || quantity <= 0) {
      return res.status(400).json({ message: "Invalid symbol or quantity" });
    }

    const price = await getMarketPrice(symbol);

    if (price === null || price === undefined || isNaN(price)) {
      return res.status(500).json({ message: "Price not available" });
    }

    const holding = await Holding.findOne({ userId, symbol });

    if (!holding || holding.quantity < quantity) {
      return res.status(400).json({ message: "Not enough holdings" });
    }

    const totalSellValue = quantity * price;

    let wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(400).json({ message: "Wallet not found" });
    }

    //Add funds back into cash wallet balance
    wallet.balance += totalSellValue;
    await wallet.save();

    // Log the sale entry to your Transaction History collection
    await Transaction.create({
      userId,
      symbol,
      type: "SELL",
      quantity,
      price: price,
    });

    const profitLoss = (price - holding.avgBuyPrice) * quantity;

    // Hold time = how long this position has been open, based on when the
    // Holding doc was first created ((it only updates in place on subsequent buys)
    const holdHours = (Date.now() - holding.createdAt.getTime()) / (1000 * 60 * 60);

    holding.quantity -= quantity;

    // Clean up database entry if entire holding position was liquidated
    if (holding.quantity === 0) {
      await Holding.deleteOne({ _id: holding._id });
    } else {
      await holding.save();
    }

    // Create an entry in orders history tracking table
    const order = await Order.create({
      userId,
      symbol,
      type: "SELL",
      quantity,
      price,
      total: totalSellValue,
      pnl: profitLoss,
      holdHours,
    });

    return res.status(200).json({
      message: "Stock sold successfully",
      order,
      wallet,
      profitLoss,
    });
  } catch (error) {
    console.error("SELL ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// GET TRADING ACTIVITY (Activee Positions + Order History + Analytics + Alerts)

const getTradingActivity = async (req, res) => {
  try {
    const userId = req.user.id;

    // Active Positions (from current holdings, enriched with live price )
    const holdings = await Holding.find({ userId });

    const activePositions = await Promise.all(
      holdings.map(async (h) => {
        const ltp = (await getMarketPrice(h.symbol)) || h.avgBuyPrice;
        const pnl = (ltp - h.avgBuyPrice) * h.quantity;
        const pnlPercent = h.avgBuyPrice > 0 ? ((ltp - h.avgBuyPrice) / h.avgBuyPrice) * 100 : 0;

        return {
          symbol: h.symbol,
          exchange: "NASDAQ", // Adjust if you start tracking exchange per-holding
          logo: h.symbol.charAt(0).toUpperCase(),
          logoColor: colorForSymbol(h.symbol),
          qty: h.quantity,
          avgPrice: h.avgBuyPrice,
          ltp,
          pnl,
          pnlPercent,
        };
      })
    );

    //Order History (most recent 20 orders) 
    const orders = await Order.find({ userId }).sort({ createdAt: -1 }).limit(20);

    const orderHistory = orders.map((o) => ({
      time: new Date(o.createdAt).toLocaleTimeString("en-US", { hour12: false }),
      symbol: o.symbol,
      type: o.type,
      qty: o.quantity,
      price: o.price,
      // Your system executes orders synchronously — there's no "pending" state yet.
      status: "executed",
    }));

    //Execution Analytics (computed from closed SELL orders only)
    const closedSells = orders.filter((o) => o.type === "SELL" && o.pnl !== null && o.pnl !== undefined);

    const winRate =
      closedSells.length > 0
        ? Math.round((closedSells.filter((o) => o.pnl > 0).length / closedSells.length) * 100)
        : 0;

    const avgHoldHours =
      closedSells.length > 0
        ? Number(
            (
              closedSells.reduce((sum, o) => sum + (o.holdHours || 0), 0) / closedSells.length
            ).toFixed(1)
          )
        : 0;

    const analytics = {
      winRate,
      targetWinRate: 75, //  Static for now — make this user-configurable later if needed
      avgHoldHours,
    };

    //  Smart Alerts
    // No backend logic exists yet for detecting profit targets or market anomalies.
    // this will Returning an empty array rather than making fake alerts.
    const alerts = [];

    return res.status(200).json({
      activePositions,
      orderHistory,
      analytics,
      alerts,
    });
  } catch (error) {
    console.error("TRADING ACTIVITY ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};


// CLOSE POSITION (full liquidation of a holding at current market price)

const closePosition = async (req, res) => {
  try {
    const userId = req.user.id;
    const symbol = normalizeSymbol(req.params.symbol);

    const holding = await Holding.findOne({ userId, symbol });

    if (!holding) {
      return res.status(404).json({ message: "Position not found" });
    }

    const price = await getMarketPrice(symbol);

    if (price === null || price === undefined || isNaN(price)) {
      return res.status(500).json({ message: "Price not available" });
    }

    const quantity = holding.quantity;
    const totalSellValue = quantity * price;

    let wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(400).json({ message: "Wallet not found" });
    }

    wallet.balance += totalSellValue;
    await wallet.save();

    await Transaction.create({
      userId,
      symbol,
      type: "SELL",
      quantity,
      price,
    });

    const profitLoss = (price - holding.avgBuyPrice) * quantity;
    const holdHours = (Date.now() - holding.createdAt.getTime()) / (1000 * 60 * 60);

    await Holding.deleteOne({ _id: holding._id });

    const order = await Order.create({
      userId,
      symbol,
      type: "SELL",
      quantity,
      price,
      total: totalSellValue,
      pnl: profitLoss,
      holdHours,
    });

    return res.status(200).json({
      message: "Position closed successfully",
      order,
      wallet,
      profitLoss,
    });
  } catch (error) {
    console.error("CLOSE POSITION ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  buyStock,
  sellStock,
  getTradingActivity,
  closePosition,
};
