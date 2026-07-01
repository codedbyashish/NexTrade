import React from "react";
import styles from "./RecentActivity.module.css";

function RecentActivity({ transactions }) {
  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>Recent Transactions</h3>

      {transactions?.length > 0 ? (
        <ul className={styles.list}>
          {transactions.slice(0, 4).map((tx, idx) => {
            const isBuy = tx.type?.toLowerCase() === "buy";

            return (
              <li key={idx} className={styles.item}>
                <span className={styles.txText}>
                  <span className={isBuy ? styles.buyTag : styles.sellTag}>
                    {tx.type?.toUpperCase()}
                  </span>{" "}
                  {tx.symbol} ({tx.quantity} shares)
                </span>
                <span className={styles.date}>
                  {tx.createdAt
                    ? new Date(tx.createdAt).toLocaleDateString()
                    : "Recent"}
                </span>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.emptyText}>No recent transactions found.</p>
      )}
    </div>
  );
}

export default RecentActivity;
