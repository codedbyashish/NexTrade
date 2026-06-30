import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OrderHistory.module.css";

const TABS = ["All", "Executed", "Pending"];

function OrderHistory({ orders }) {
  const [activeTab, setActiveTab] = useState("Executed");
  const navigate = useNavigate();

  const filtered =
    activeTab === "All"
      ? orders
      : orders.filter((o) => o.status === activeTab.toLowerCase());

  const goToStock = (symbol) => {
    navigate(`/dashboard/stocks?symbol=NASDAQ:${symbol}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.heading}>Order History</h3>
        <div className={styles.tabs}>
          {TABS.map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Time</th>
              <th>Stock</th>
              <th>Type</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((o, idx) => (
                <tr
                  key={idx}
                  className={styles.row}
                  onClick={() => goToStock(o.symbol)}
                >
                  <td className={styles.time}>{o.time}</td>
                  <td className={styles.symName}>{o.symbol}</td>
                  <td>
                    <span
                      className={
                        o.type === "BUY" ? styles.buyBadge : styles.sellBadge
                      }
                    >
                      {o.type}
                    </span>
                  </td>
                  <td>{o.qty}</td>
                  <td>₹{o.price.toFixed(2)}</td>
                  <td>
                    <span className={styles.statusCell}>
                      <span
                        className={
                          o.status === "executed"
                            ? styles.dotExecuted
                            : styles.dotPending
                        }
                      />
                      {o.status === "executed" ? "Executed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className={styles.emptyRow}>
                  No orders found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderHistory;