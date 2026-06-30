import React from "react";
import { Download, Plus } from "lucide-react";
import styles from "./TradingHeader.module.css";

function TradingHeader({ onExport, onNewTrade }) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Trading Activity</h1>
        <p className={styles.subtitle}>
          Real-time status of your active trades and historical records.
        </p>
      </div>

     
    </div>
  );
}

export default TradingHeader;