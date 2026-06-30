import React, { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import styles from "./StockCard.module.css";

function StockCard({
  logoUrl,
  logo, // fallback initials, agar logoUrl fail ho jaaye
  logoColor,
  name,
  price,
  change,
  changePercent,
  positive,
  onClick,
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <button className={styles.card} onClick={onClick} type="button">
      {logoUrl && !imgError ? (
        <div className={styles.logoImgBox}>
          <img
            src={logoUrl}
            alt={`${name} logo`}
            className={styles.logoImg}
            onError={() => setImgError(true)}
          />
        </div>
      ) : (
        <div
          className={styles.logo}
          style={{
            background: `linear-gradient(135deg, ${logoColor}, #0d9488)`,
          }}
        >
          {logo}
        </div>
      )}

      <p className={styles.name}>{name}</p>

      <p className={styles.price}>${price}</p>

      <div className={`${styles.badge} ${positive ? styles.positive : styles.negative}`}>
        {positive ? (
          <TrendingUp size={12} strokeWidth={2.5} />
        ) : (
          <TrendingDown size={12} strokeWidth={2.5} />
        )}
        {positive ? "+" : ""}
        {change} ({changePercent}%)
      </div>
    </button>
  );
}

export default StockCard;