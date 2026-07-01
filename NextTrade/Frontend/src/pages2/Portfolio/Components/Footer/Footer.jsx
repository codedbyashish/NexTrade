import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const FOOTER_LINKS = {
  Company: [
    { label: "About Us", href: "" },
    { label: "Careers", href: "" },
    { label: "Press", href: "" },
  ],
  Resources: [
    { label: "Help Center", href: "" },
    { label: "API Docs", href: "" },
    { label: "Trading Rules", href: "" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "" },
    { label: "Terms of Service", href: "" },
    { label: "Disclosures", href: "" },
  ],
};

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.topRow}>
        <div className={styles.brandCol}>
          <h3 className={styles.brandName}>NexTrade</h3>
          <p className={styles.tagline}>
            The next generation trading terminal for institutional and
            retail investors. Experience unparalleled speed and precision.
          </p>
        </div>

        {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
          <div key={heading} className={styles.linkCol}>
            <h4 className={styles.colHeading}>{heading.toUpperCase()}</h4>
            <ul className={styles.linkList}>
              {links.map((link) => (
                <li key={link.label}>
                  <Link to={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className={styles.bottomRow}>
        <span className={styles.copyright}>
          © {year} NexTrade. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer;