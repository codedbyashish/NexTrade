import styles from "./Footer.module.css";

const footerLinks = {
  company: ["About Us", "Careers", "Contact", "Press"],
  products: ["Stocks", "Mutual Funds", "F&O", "US Stocks"],
  resources: ["Help Center", "Pricing", "API Docs", "Market Status"],
  legal: ["Privacy", "Terms", "Compliance", "Disclaimer"],
};

function LinkColumn({ title, items }) {
  return (
    <div className={styles.linkColumn}>
      <h3 className={styles.columnTitle}>{title}</h3>

      <ul className={styles.linkList}>
        {items.map((item) => (
          <li key={item} className={styles.linkItem}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        
        <div className={styles.topGrid}>
          <div className={styles.brand}>
            <h2 className={styles.logo}>NexTrade</h2>

            <p className={styles.tagline}>
              Building the future of retail trading in India.
            </p>

            <div className={styles.socialRow}>
              <button className={styles.socialIcon}>𝕏</button>
              <button className={styles.socialIcon}>✉</button>
              <button className={styles.socialIcon}>🌐</button>
            </div>
          </div>

          <LinkColumn
            title="Company"
            items={footerLinks.company}
          />

          <LinkColumn
            title="Products"
            items={footerLinks.products}
          />

          <LinkColumn
            title="Resources"
            items={footerLinks.resources}
          />

          <LinkColumn
            title="Legal"
            items={footerLinks.legal}
          />
        </div>

        <hr className={styles.divider} />

        <div className={styles.bottomBar}>
          <p>
            © {new Date().getFullYear()} NexTrade. All rights reserved.
          </p>

          <div className={styles.bottomIcons}>
            <button className={styles.bottomIconBtn}>▶</button>
            <button className={styles.bottomIconBtn}>in</button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;