import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight, Inbox } from "lucide-react";
import { formatCurrency } from "../../utils/formatCurrency";
import styles from "./HoldingsTable.module.css";

function HoldingsTable({ holdings }) {
  const navigate = useNavigate();

  const goToStock = (symbol) => {
    navigate(`/dashboard/stocks?symbol=NASDAQ:${symbol}`);
  };

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Stock</th>
            <th>Qty</th>
            <th>Avg Buy</th>
            <th>Current</th>
            <th>P&L</th>
          </tr>
        </thead>
        <tbody>
          {holdings?.length > 0 ? (
            holdings.map((h) => {
              const currentPrice = h.currentPrice ?? h.avgBuyPrice ?? 0;
              const pnl = (currentPrice - h.avgBuyPrice) * h.quantity;
              const isProfit = pnl >= 0;

              return (
                <tr
                  key={h.symbol}
                  className={styles.row}
                  onClick={() => goToStock(h.symbol)}
                  style={{ cursor: "pointer" }}
                >
                  <td className={styles.symbol}>{h.symbol}</td>
                  <td>{h.quantity}</td>
                  <td>{formatCurrency(h.avgBuyPrice)}</td>
                  <td>{formatCurrency(currentPrice)}</td>
                  <td className={isProfit ? styles.profitText : styles.lossText}>
                    {isProfit ? (
                      <ArrowUpRight size={14} strokeWidth={2.5} />
                    ) : (
                      <ArrowDownRight size={14} strokeWidth={2.5} />
                    )}
                    {isProfit ? "+" : ""}
                    {formatCurrency(pnl)}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5" className={styles.emptyRow}>
                <div className={styles.emptyState}>
                  <Inbox size={20} strokeWidth={1.5} />
                  <span>No holdings yet</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default HoldingsTable;