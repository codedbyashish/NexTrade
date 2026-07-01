import React from "react";
import { Zap, ShieldCheck } from "lucide-react";
import styles from "./SmartAlerts.module.css";

function SmartAlerts({ alerts }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <Zap size={16} className={styles.headerIcon} />
        <h3 className={styles.heading}>Smart Alerts</h3>
      </div>

      {alerts?.length > 0 ? (
        <div className={styles.list}>
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`${styles.alertItem} ${
                alert.type === "profit" ? styles.borderProfit : styles.borderAnomaly
              }`}
            >
              <div className={styles.alertTop}>
                <span className={styles.alertTitle}>{alert.title}</span>
                <span className={styles.alertTime}>{alert.timeAgo}</span>
              </div>
              <p className={styles.alertDesc}>{alert.description}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <ShieldCheck size={22} className={styles.emptyIcon} strokeWidth={1.5} />
          <p className={styles.emptyTitle}>No alerts right now</p>
          <p className={styles.emptyDesc}>
            Your positions are quiet — we'll let you know if anything needs attention.
          </p>
        </div>
      )}
    </div>
  );
}

export default SmartAlerts;
