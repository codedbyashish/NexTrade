import React, { useState } from "react";
import styles from "./TradeSimulator.module.css";

const FLAT_BROKERAGE = 20;
const PERCENT_BROKERAGE = 0.0005;

function calcBrokerage(turnover) {
  return Math.max(FLAT_BROKERAGE, turnover * PERCENT_BROKERAGE);
}

function TradeSimulator({ symbol = "AAPL", currentPrice = 0 }) {
  const price = Number(currentPrice);
  const isPriceValid = price > 0;

  const [mode, setMode] = useState("buy");
  const [orderType, setOrderType] = useState("Market Order");
  const [quantity, setQuantity] = useState(1);

  const [position, setPosition] = useState({
    quantity: 0,
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const turnover = isPriceValid ? quantity * price : 0;
  const brokerage = isPriceValid ? calcBrokerage(turnover) : 0;

  const total = isPriceValid
    ? mode === "buy"
      ? turnover + brokerage
      : turnover - brokerage
    : 0;

  const incQty = () => setQuantity((q) => q + 1);
  const decQty = () => setQuantity((q) => Math.max(1, q - 1));

  const cleanSymbol = symbol
    .replace("NASDAQ:", "")
    .replace("NYSE:", "")
    .trim();

  const handleConfirm = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("Please login again");
        return;
      }

      const url =
        mode === "buy"
          ? "http://localhost:5000/api/trade/buy"
          : "http://localhost:5000/api/trade/sell";

      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          symbol: cleanSymbol,
          quantity,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Trade failed");
        return;
      }

      if (mode === "buy") {
        setPosition((p) => ({
          quantity: p.quantity + quantity,
        }));
      } else {
        setPosition((p) => ({
          quantity: Math.max(0, p.quantity - quantity),
        }));

        setResult(data);
      }

      // Refresh Portfolio page immediately
      window.dispatchEvent(new Event("portfolio-update"));
    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* BUY / SELL */}
      <div className={styles.tabRow}>
        <button
          className={`${styles.tab} ${
            mode === "buy" ? styles.tabActiveBuy : ""
          }`}
          onClick={() => setMode("buy")}
        >
          BUY
        </button>

        <button
          className={`${styles.tab} ${
            mode === "sell" ? styles.tabActiveSell : ""
          }`}
          onClick={() => setMode("sell")}
        >
          SELL
        </button>
      </div>

      {/* ORDER TYPE */}
      <div className={styles.field}>
        <label className={styles.label}>ORDER TYPE</label>

        <select
          className={styles.select}
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
        >
          <option>Market Order</option>
          <option>Limit Order</option>
        </select>
      </div>

      {/* QUANTITY */}
      <div className={styles.field}>
        <div className={styles.qtyHeader}>
          <label className={styles.label}>QUANTITY</label>

          <span className={styles.balance}>
            Holding: {position.quantity} Shares
          </span>
        </div>

        <div className={styles.qtyInputRow}>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) =>
              setQuantity(Math.max(1, Number(e.target.value)))
            }
            className={styles.qtyInput}
          />

          <div className={styles.stepper}>
            <button onClick={incQty} type="button">
              +
            </button>

            <button onClick={decQty} type="button">
              −
            </button>
          </div>
        </div>
      </div>

      {/* SUMMARY */}
      <div className={styles.summaryCard}>
        <div className={styles.summaryRow}>
          <span>Qty × Price</span>
          <span>${turnover.toFixed(2)}</span>
        </div>

        <div className={styles.summaryRow}>
          <span>Brokerage</span>
          <span>${brokerage.toFixed(2)}</span>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.totalRow}>
          <span>
            {mode === "buy" ? "Total Payable" : "Net Receivable"}
          </span>

          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* BUTTON */}
      <button
        className={
          mode === "buy"
            ? styles.confirmBuy
            : styles.confirmSell
        }
        onClick={handleConfirm}
        disabled={loading || !isPriceValid}
      >
        {loading
          ? "Processing..."
          : mode === "buy"
          ? "Buy"
          : "Sell"}
      </button>

      {/* SELL RESULT */}
      {result && (
        <p className={result.profitLoss >= 0 ? styles.profit : styles.loss}>
          {result.profitLoss >= 0 ? "Profit" : "Loss"}: ₹
          {Math.abs(result.profitLoss).toFixed(2)}
        </p>
      )}
    </div>
  );
}

export default TradeSimulator;