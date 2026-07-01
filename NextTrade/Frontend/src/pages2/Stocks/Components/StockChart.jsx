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
      allow_symbol_change: false, // 🔒 locked - sirf hamara state symbol decide karega
      hide_legend: false,
      details: true,
    });

    container.current.appendChild(script);
  }, [symbol, theme]);

  return (
    <div className={styles.chartWrapper} style={{ height: `${height}px` }}>
      <div
        key={`${symbol}-${theme}`}
        ref={container}
        className={styles.tradingviewContainer}
      />
    </div>
  );
}

export default memo(StockChart);