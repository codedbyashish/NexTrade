import React from "react";
import { useNavigate } from "react-router-dom";
import Sparkline from "../Sparkline/Sparkline";
import styles from "./WatchlistTable.module.css";

function WatchlistTable({ symbols, quotes, onRemove }) {
  const navigate = useNavigate();

  const goToStock = (sym) => {
    
    navigate(`/dashboard/stocks?symbol=NASDAQ:${sym}`);
  };

  return (
    <div className={styles.tableWrap}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Instrument / Exchange</th>
            <th>Price</th>
            <th>Day Chg %</th>
            <th>7D Trend</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {symbols.map((sym) => {
            const q = quotes[sym];
            const isPositive = (q?.d ?? 0) >= 0;

            return (
              <tr
                key={sym}
                className={styles.row}
                onClick={() => goToStock(sym)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  <div className={styles.instrumentCell}>
                    <span className={styles.symName}>{sym}</span>
                    <span className={styles.exchange}>NASDAQ</span>
                  </div>
                </td>
                <td className={styles.price}>
                  {q ? `$${q.c.toFixed(2)}` : "—"}
                </td>
                <td className={isPositive ? styles.positive : styles.negative}>
                  {q ? `${isPositive ? "+" : ""}${q.dp.toFixed(2)}%` : "—"}
                </td>
                <td>
                  <Sparkline quote={q} />
                </td>
                <td>
                  <div className={styles.actions}>
                    <button
                      className={styles.tradeBtn}
                      onClick={(e) => {
                        e.stopPropagation(); // row click se conflict na ho
                        goToStock(sym);
                      }}
                    >
                      Quick Trade
                    </button>
                    <button
                      className={styles.deleteBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove?.(sym);
                      }}
                      title={`Remove ${sym}`}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"/>
                        <path d="M19 6l-1 14H6L5 6"/>
                        <path d="M10 11v6"/>
                        <path d="M14 11v6"/>
                        <path d="M9 6V4h6v2"/>
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default WatchlistTable;