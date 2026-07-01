import React from "react";
import { useNavigate } from "react-router-dom";
import { Briefcase, X } from "lucide-react";
import { formatCurrency } from "../../../../utils/formatCurrency";
import styles from "./ActivePositions.module.css";

function ActivePositions({ positions, onClose }) {
  const navigate = useNavigate();

  const goToStock = (symbol, exchange) => {
    navigate(`/dashboard/stocks?symbol=${exchange}:${symbol}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <Briefcase size={18} className={styles.headerIcon} />
          <h3 className={styles.heading}>Active Positions</h3>
        </div>
        <span className={styles.badge}>{positions.length} Positions</span>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty</th>
              <th>Avg Price</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((p) => {
              const isProfit = p.pnl >= 0;
              return (
                <tr
                  key={p.symbol}
                  className={styles.row}
                  onClick={() => goToStock(p.symbol, p.exchange)}
                >
                  <td>
                    <div className={styles.instrumentCell}>
                      <div
                        className={styles.logo}
                        style={{ background: p.logoColor }}
                      >
                        {p.logo}
                      </div>
                      <div>
                        <div className={styles.symName}>{p.symbol}</div>
                        <div className={styles.exchange}>{p.exchange}</div>
                      </div>
                    </div>
                  </td>
                  <td>{p.qty}</td>
                  <td>{formatCurrency(p.avgPrice)}</td>
                  <td>{formatCurrency(p.ltp)}</td>
                  <td className={isProfit ? styles.profit : styles.loss}>
                    <div>
                      {isProfit ? "+" : ""}
                      {formatCurrency(p.pnl)}
                    </div>
                    <div className={styles.pnlPercent}>
                      {isProfit ? "+" : ""}
                      {p.pnlPercent.toFixed(2)}%
                    </div>
                  </td>
                  <td>
                    <button
                      className={styles.closeBtn}
                      onClick={(e) => {
                        e.stopPropagation();
                        onClose?.(p.symbol);
                      }}
                      title={`Close ${p.symbol}`}
                    >
                      <X size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ActivePositions;