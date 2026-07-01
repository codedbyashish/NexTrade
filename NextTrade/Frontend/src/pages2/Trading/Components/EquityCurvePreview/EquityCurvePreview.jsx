import React from "react";
import { TrendingUp, ExternalLink } from "lucide-react";
import styles from "./EquityCurvePreview.module.css";

const TRADE_NEWS_URL = "https://ustr.gov/about-us/policy-offices/press-office/press-releases";

function EquityCurvePreview() {
  const handleNavigate = () => {
    window.open(TRADE_NEWS_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.card} onClick={handleNavigate} role="button" tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleNavigate()}
    >
      <div className={styles.badge}>
        <span className={styles.badgeDot} />
        Official Source
      </div>

      <div className={styles.iconWrap}>
        <TrendingUp className={styles.growIcon} strokeWidth={1.5} />
      </div>

      <div className={styles.content}>
        <p className={styles.title}>US Trade News</p>
        <p className={styles.subtitle}>USTR · Office of the US Trade Representative</p>
      </div>

      <div className={styles.footer}>
        <span className={styles.url}>ustr.gov</span>
        <div className={styles.navBtn}>
          Open <ExternalLink size={12} strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}

export default EquityCurvePreview;