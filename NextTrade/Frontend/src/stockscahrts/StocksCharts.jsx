import React, { useEffect, useRef, memo } from "react";
import styles from "./StockChart.module.css";

function StockChart({ symbol = "NSE:RELIANCE", height = 450, theme = "dark" }) {
  const container = useRef(null);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol,
      interval: "D",
      timezone: "Asia/Kolkata",
      theme,
      style: "1",
      locale: "in",
      enable_publishing: false,
      allow_symbol_change: true,
    });

    container.current.appendChild(script);

    return () => {
      if (container.current) {
        container.current.innerHTML = "";
      }
    };
  }, [symbol, theme]);

  return (
    <div className={styles.chartWrapper} style={{ height: `${height}px` }}>
      <div
        key={`${symbol}-${theme}`}
        ref={container}
        className={styles.tradingviewContainer}
        style={{ height: "100%", width: "100%" }}
      />
    </div>
  );
}

export default memo(StockChart);