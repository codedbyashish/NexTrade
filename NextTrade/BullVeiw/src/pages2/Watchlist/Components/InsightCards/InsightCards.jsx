import React, { useState, useEffect } from "react";
import styles from "./InsightCards.module.css";

function InsightCards({ quotes = {}, symbols = [] }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const et = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
      const day = et.getDay();
      const h = et.getHours();
      const m = et.getMinutes();
      const s = et.getSeconds();
      const total = h * 3600 + m * 60 + s;
      const open = 9 * 3600 + 30 * 60;
      const close = 16 * 3600;

      if (day === 0 || day === 6) { setTime("Closed (Weekend)"); return; }
      if (total >= open && total < close) {
        const rem = close - total;
        const rh = String(Math.floor(rem / 3600)).padStart(2, "0");
        const rm = String(Math.floor((rem % 3600) / 60)).padStart(2, "0");
        const rs = String(rem % 60).padStart(2, "0");
        setTime(`${rh}:${rm}:${rs}`);
      } else {
        setTime("Market Closed");
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const topMover = symbols
    .filter((s) => quotes[s])
    .sort((a, b) => Math.abs(quotes[b].dp) - Math.abs(quotes[a].dp))[0];

  const alert = topMover && Math.abs(quotes[topMover]?.dp) >= 1
    ? `${topMover} ${quotes[topMover].dp > 0 ? "▲" : "▼"} ${Math.abs(quotes[topMover].dp).toFixed(2)}%`
    : "No alerts";

  return (
    <div className={styles.row}>
      <div className={styles.card}>
        <p className={styles.label}>Top Mover</p>
        <p className={styles.value}>{topMover ?? "—"}</p>
      </div>
      <div className={styles.card}>
        <p className={styles.label}>Alert</p>
        <p className={styles.value}>{alert}</p>
      </div>
      <div className={styles.card}>
        <p className={styles.label}>Market Hours (ET)</p>
        <p className={styles.value}>{time || "—"}</p>
      </div>
    </div>
  );
}

export default InsightCards;