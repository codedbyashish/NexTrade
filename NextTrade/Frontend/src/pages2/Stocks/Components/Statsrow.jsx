import React from "react";
import styles from "./StatsRow.module.css";

function StatCard({ label, value }) {
  return (
    <div className={styles.card}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value ?? "—"}</span>
    </div>
  );
}

function StatsRow({ quote, profile, financials, loading }) {
  const dayLow = quote?.l ? `$${quote.l.toFixed(2)}` : null;
  const dayHigh = quote?.h ? `$${quote.h.toFixed(2)}` : null;

  const marketCap = profile?.marketCapitalization
    ? `$${(profile.marketCapitalization / 1000).toFixed(1)}B`
    : null;

  const peRatio = financials?.metric?.peNormalizedAnnual
    ? financials.metric.peNormalizedAnnual.toFixed(2)
    : null;

  return (
    <div className={styles.row}>
      <StatCard label="DAY LOW" value={loading ? null : dayLow} />
      <StatCard label="DAY HIGH" value={loading ? null : dayHigh} />
      <StatCard label="MARKET CAP" value={loading ? null : marketCap} />
      <StatCard label="P/E RATIO" value={loading ? null : peRatio} />
    </div>
  );
}

export default StatsRow;