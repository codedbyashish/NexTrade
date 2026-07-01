import React, { useMemo } from "react";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Newspaper,
  CalendarClock,
  ExternalLink,
} from "lucide-react";
import styles from "./PerformanceInsights.module.css";

const SIGNAL_CONFIG = {
  buy: {
    label: "Strong Buy Signal",
    Icon: TrendingUp,
    className: "signalBuy",
  },
  hold: {
    label: "Hold Signal",
    Icon: Minus,
    className: "signalHold",
  },
  sell: {
    label: "Strong Sell Signal",
    Icon: TrendingDown,
    className: "signalSell",
  },
};

function PerformanceInsights({
  ticker,
  profile,
  signal = "buy",
  signalDescription =
    "Moving averages (20, 50, 200) indicate a bullish trend consolidation above previous resistance levels.",
}) {
  const { label, Icon, className } =
    SIGNAL_CONFIG[signal] || SIGNAL_CONFIG.buy;

  const industryReportUrl = useMemo(() => {
    const query = profile?.finnhubIndustry || ticker || "stock market";
    return `https://www.marketwatch.com/search?q=${encodeURIComponent(query)}`;
  }, [profile, ticker]);

  const earningsUrl = useMemo(() => {
    if (!ticker) {
      return "https://www.nasdaq.com/market-activity/earnings";
    }

    return `https://www.nasdaq.com/market-activity/stocks/${ticker.toLowerCase()}/earnings`;
  }, [ticker]);

  const openLink = (url) => {
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Performance Insights</h2>

      <div className={styles.signalRow}>
        <div className={`${styles.signalIcon} ${styles[className]}`}>
          <Icon size={20} />
        </div>

        <div>
          <p className={styles.signalLabel}>{label}</p>
          <p className={styles.signalDesc}>{signalDescription}</p>
        </div>
      </div>

      <div className={styles.cardsGrid}>
        <button
          type="button"
          className={styles.linkCard}
          onClick={() => openLink(industryReportUrl)}
        >
          <div className={`${styles.cardArt} ${styles.artIndustry}`}>
            <Newspaper size={32} className={styles.cardArtIcon} />
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.cardTitle}>
              Latest Industry Report
            </span>

            <span className={styles.cardSubtitle}>
              {profile?.finnhubIndustry || "Sector outlook"}
              <ExternalLink
                size={12}
                className={styles.extIcon}
              />
            </span>
          </div>
        </button>

        <button
          type="button"
          className={styles.linkCard}
          onClick={() => openLink(earningsUrl)}
        >
          <div className={`${styles.cardArt} ${styles.artEarnings}`}>
            <CalendarClock
              size={32}
              className={styles.cardArtIcon}
            />
          </div>

          <div className={styles.cardFooter}>
            <span className={styles.cardTitle}>
              Upcoming Earnings
            </span>

            <span className={styles.cardSubtitle}>
              View earnings calendar
              <ExternalLink
                size={12}
                className={styles.extIcon}
              />
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default PerformanceInsights;