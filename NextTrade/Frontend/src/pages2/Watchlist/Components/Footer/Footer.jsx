import React from "react";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.copy}>
        © 2024 <span className={styles.brand}>NexTrade</span> Financial Inc. All rights reserved.
      </p>
      <div className={styles.links}>
        <a href="#">Risk Disclosure</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Help Terminal</a>
      </div>
    </footer>
  );
}

export default Footer;