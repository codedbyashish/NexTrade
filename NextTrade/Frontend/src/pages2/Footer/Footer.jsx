import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span className={styles.dot}></span>
        <span>TERMINAL CONNECTED</span>

        <span className={styles.separator}>|</span>

        <span>
          MARKET STATUS: <span className={styles.green}>OPEN</span>
        </span>

        <span className={styles.separator}>|</span>

        <span>PING: 12MS</span>
      </div>

      <div className={styles.right}>
        <span>© 2026 NEXTRADE FINANCIAL INC.</span>

        <span className={styles.separator}>|</span>

        <span className={styles.green}>PREMIUM TERMINAL</span>
      </div>
    </footer>
  );
}