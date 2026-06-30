import React, { useState } from "react";
import { BarChart2, LayoutGrid, Rocket, Building2, ArrowRight, X } from "lucide-react";
import styles from "./InvestmentOptions.module.css";

const investmentOptions = [
  {
    id: 1,
    icon: BarChart2,
    title: "Stocks",
    description: "Invest in direct equity of India's top performing companies.",
    badge: { text: "Hot", type: "hot" },
    stats: [
      { label: "Listed companies", value: "5,000+" },
      { label: "Min investment", value: "₹1" },
      { label: "Avg returns", value: "~12% p.a." },
      { label: "Settlement", value: "T+1 day" },
    ],
    longDesc: "Buy and sell shares of India's top-listed companies on NSE & BSE with zero delivery brokerage.",
  },
  {
    id: 2,
    icon: LayoutGrid,
    title: "ETFs",
    description: "Low cost, high diversification index trackers for long-term safety.",
    badge: null,
    stats: [
      { label: "Available ETFs", value: "200+" },
      { label: "Expense ratio", value: "0.05–0.5%" },
      { label: "Min investment", value: "₹50" },
      { label: "Type", value: "Passive fund" },
    ],
    longDesc: "Exchange traded funds that mirror indices like Nifty 50 and Sensex — low cost with broad diversification.",
  },
  {
    id: 3,
    icon: Rocket,
    title: "IPOs",
    description: "Get early access to promising companies before they go public.",
    badge: { text: "New", type: "new" },
    stats: [
      { label: "Active IPOs", value: "3" },
      { label: "Application", value: "UPI / ASBA" },
      { label: "Min lot size", value: "₹14,000" },
      { label: "Allotment", value: "T+6 days" },
    ],
    longDesc: "Apply for IPOs directly through your account using UPI block mechanism. Track GMP and subscription status live.",
  },
  {
    id: 4,
    icon: Building2,
    title: "Bonds",
    description: "Fixed returns with lower risk. Government and Corporate bonds.",
    badge: null,
    stats: [
      { label: "Yield range", value: "7%–12%" },
      { label: "Min investment", value: "₹1,000" },
      { label: "Tenure", value: "1–30 years" },
      { label: "Safety", value: "High" },
    ],
    longDesc: "Invest in government securities and corporate bonds for stable, predictable income with lower risk than equities.",
  },
];

export default function InvestmentOptions() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <section className={styles.section}>
      
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <h2 className={styles.heading}>Investment options tailored for you.</h2>
          <p className={styles.subheading}>
            Diversify your portfolio across different asset classes with zero commission on most products.
          </p>
        </div>
        <button className={styles.viewAll}>
          View all products <ArrowRight size={14} />
        </button>
      </div>

    
      <div className={styles.grid}>
        {investmentOptions.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => setSelectedItem(item)}
            >
              {item.badge && (
                <span className={`${styles.badge} ${styles[`badge_${item.badge.type}`]}`}>
                  {item.badge.text}
                </span>
              )}
              <div className={styles.iconWrapper}>
                <Icon size={20} className={styles.icon} />
              </div>
              <h3 className={styles.cardTitle}>{item.title}</h3>
              <p className={styles.cardDesc}>{item.description}</p>
              <button className={styles.exploreBtn}>
                Explore <ArrowRight size={14} className={styles.exploreArrow} />
              </button>
            </div>
          );
        })}
      </div>

      
      {selectedItem && (
        <div className={styles.overlay} onClick={() => setSelectedItem(null)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={() => setSelectedItem(null)}>
              <X size={18} />
            </button>
            <div className={styles.modalIconWrapper}>
              <selectedItem.icon size={24} className={styles.icon} />
            </div>
            <h3 className={styles.modalTitle}>{selectedItem.title}</h3>
            <p className={styles.modalDesc}>{selectedItem.longDesc}</p>
            <div className={styles.statsGrid}>
              {selectedItem.stats.map((s, i) => (
                <div key={i} className={styles.statBox}>
                  <p className={styles.statLabel}>{s.label}</p>
                  <p className={styles.statValue}>{s.value}</p>
                </div>
              ))}
            </div>
            <button className={styles.ctaBtn}>
              Start investing <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}