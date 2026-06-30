import React from "react";
import { formatCurrency } from "../../utils/formatCurrency";
import styles from "./PortfolioSummary.module.css";

function PortfolioSummary({ totalValue, cash, totalPnL }) {
  const isProfit = totalPnL >= 0;

  return (
    <div className={styles.summary}>
      <div className={styles.card}>
        <h3 className={styles.label}>Total Portfolio Value</h3>
        <p className={styles.value}>{formatCurrency(totalValue)}</p>
      </div>
      <div className={styles.card}>
        <h3 className={styles.label}>Cash</h3>
        <p className={styles.value}>{formatCurrency(cash)}</p>
      </div>
      <div className={styles.card}>
        <h3 className={styles.label}>Total P&L</h3>
        <p className={`${styles.value} ${isProfit ? styles.profit : styles.loss}`}>
          {isProfit ? "+" : ""}
          {formatCurrency(totalPnL)}
        </p>
      </div>
    </div>
  );
}

export default PortfolioSummary;