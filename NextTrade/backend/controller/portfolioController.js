const Wallet = require("../models/Wallet");
const Holding = require("../models/Holding");
//  Import  Transaction model
const Transaction = require("../models/Transaction"); 
const getMarketPrice = require("../services/marketPriceService");

// user Portfolio
const getPortfolio = async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Get or create wallet
    let wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      wallet = await Wallet.create({
        userId,
        balance: 10000,
      });
    }

    //  Get holdings
    const holdings = await Holding.find({ userId });

    //  it will Fetch the users  recent transactions, sorted by newest first and it is limited to 4 records
    const recentTransactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 }) // it will Sorts by latest date
      .limit(4);

    let totalPnL = 0;
    let totalInvestment = 0;
    let currentValue = 0;

    //fetch live prices + calculate everything
    const enrichedHoldings = await Promise.all(
      holdings.map(async (h) => {
        const currentPrice = await getMarketPrice(h.symbol);
        const safePrice = currentPrice || 0;

        const invested = h.avgBuyPrice * h.quantity;
        const marketValue = safePrice * h.quantity;
        const pnl = marketValue - invested;

        totalInvestment += invested;
        currentValue += marketValue;
        totalPnL += pnl;

        return {
          symbol: h.symbol,
          quantity: h.quantity,
          avgBuyPrice: h.avgBuyPrice,
          currentPrice: safePrice,
          investives: invested, // keeps it safe
          marketValue,
          pnl,
        };
      })
    );

    // NOW calculate total portfolio value correctly
    const totalPortfolioValue = wallet.balance + currentValue;

    //Inject the real transactions array into the JSON response payload
    return res.status(200).json({
      cash: wallet.balance,
      totalInvestment,
      currentValue,
      totalPnL,
      totalPortfolioValue, 
      holdings: enrichedHoldings,
      transactions: recentTransactions // Sent down as live data  to frontend
    });

  } catch (error) {
    console.error("Portfolio Error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getPortfolio,
};