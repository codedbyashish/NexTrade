import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle2, TrendingUp } from "lucide-react";
import styles from "./SIPSection.module.css";
import Tree from '../assets/Treee.png'

const Sip = () => {
  const navigate = useNavigate();

  const features = [
    "Zero Commission Direct Plans",
    "Flexible SIP dates & Easy Pause",
    "Smart Tax-Saver Suggestions",
    "Auto-debit on your chosen date",
  ];

  return (
    <div className={styles.mainbox}>
      <section className={styles.section}>

        <div className={styles.left}>
          <h1 className={styles.heading}>
            Build wealth,{" "}
            <span className={styles.highlight}>SIP by <br /> SIP.</span>
          </h1>

          <p className={styles.subtext}>
            Set up automatic monthly investments in over 5,000+ mutual funds.
            Commission-free direct plans to save you lakhs in the long run.
          </p>

          <ul className={styles.featureList}>
            {features.map((f, i) => (
              <li key={i} className={styles.featureItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                {f}
              </li>
            ))}
          </ul>

          <button className={styles.ctaBtn} onClick={() => navigate("/login")}>
            Start your first SIP
          </button>
        </div>

        <div className={styles.right}>
          <img src={Tree} alt="Plant growing on coins" className={styles.treeImg} />

          <div className={styles.projectionCard}>
            <div className={styles.projectionIcon}>
              <TrendingUp size={16} className={styles.trendIcon} />
            </div>
            <div className={styles.projectionText}>
              <p className={styles.projectionLabel}>PROJECTION</p>
              <p className={styles.projectionValue}>+12.4% Annualized</p>
              <p className={styles.projectionQuote}>
                "Compounding is the 8th wonder of the world."
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Sip