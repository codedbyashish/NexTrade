import React from "react";
import styles from "./Stockheader.module.css";

function StockHeader({ symbol, profile, quote, change, changePercent, loading }) {
  const isPositive = change >= 0;

  return (
    <div className={styles.header}>
      <div className={styles.identity}>
        <div className={styles.logoBox}>
          {profile?.logo ? (
            <img src={profile.logo} alt={`${symbol} logo`} className={styles.logoImg} />
          ) : (
            <div className={styles.logoPlaceholder} />
          )}
        </div>
        <div>
          <h1 className={styles.name}>
            {loading ? "Loading…" : profile?.name || symbol}
          </h1>
          <div className={styles.meta}>
            <span className={styles.ticker}>
              {profile?.exchange ? `${profile.exchange}: ` : ""}
              {symbol}
            </span>
            <span className={styles.dot}>•</span>
            <span className={styles.statusOpen}>MARKET OPEN</span>
          </div>
        </div>
      </div>

      <div className={styles.priceBlock}>
        {loading || !quote ? (
          <span className={styles.priceLoading}>—</span>
        ) : (
          <>
            <span className={styles.price}>${quote.c.toFixed(2)}</span>
            <span
              className={`${styles.changeBadge} ${
                isPositive ? styles.changeUp : styles.changeDown
              }`}
            >
              {isPositive ? "▲" : "▼"} {Math.abs(change).toFixed(2)} (
              {Math.abs(changePercent).toFixed(2)}%)
            </span>
          </>
        )}
      </div>
    </div>
  );
}

export default StockHeader;