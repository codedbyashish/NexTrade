import React from "react";
import { BarChart3, Clock } from "lucide-react";
import styles from "./ExecutionAnalytics.module.css";

function ExecutionAnalytics({ winRate, targetWinRate, avgHoldHours }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <h3 className={styles.heading}>Execution Analytics</h3>
        <div className={styles.iconBox}>
          <BarChart3 size={18} />
        </div>
      </div>

      <div className={styles.winRateSection}>
        <div className={styles.winRateTop}>
          <span className={styles.winRateLabel}>Win Rate</span>
          <span className={styles.winRateValue}>{winRate}%</span>
        </div>
        <div className={styles.progressTrack}>
          <div
            className={styles.progressFill}
            style={{ width: `${winRate}%` }}
          />
        </div>
        <p className={styles.targetText}>
          Target Win Rate {targetWinRate}% (Global average)
        </p>
      </div>

      <div className={styles.holdTimeCard}>
        <div className={styles.holdIcon}>
          <Clock size={16} />
        </div>
        <div>
          <p className={styles.holdLabel}>Avg. Hold Time</p>
          <p className={styles.holdValue}>{avgHoldHours} Hours</p>
        </div>
      </div>
    </div>
  );
}

export default ExecutionAnalytics;