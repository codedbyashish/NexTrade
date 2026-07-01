import { useState, useRef, useEffect } from "react";
import { Bell, Check } from "lucide-react";

import styles from "./DashboardHeader.module.css";

import ToggleTheme from "../../Components/Toggle";
import UserDropdown from "../DashboardHeader/Profile/Userdropdown";

const NOTIFICATIONS = [
  {
    id: 1,
    title: "Order executed",
    desc: "Your buy order for AAPL was filled at $189.42",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    title: "Price alert",
    desc: "TSLA crossed your target price of $250",
    time: "1h ago",
    unread: true,
  },
  {
    id: 3,
    title: "Statement ready",
    desc: "Your monthly account statement is available",
    time: "Yesterday",
    unread: false,
  },
];

export default function DashboardHeader({ title = "Dashboard" }) {
  const [notifOpen, setNotifOpen] = useState(false);
  const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const notifRef = useRef(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(e) {
      if (notifRef.current && !notifRef.current.contains(e.target)) {
        setNotifOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  return (
    <header className={styles.topbar}>
      <div className={styles.topbarLeft}>
        <span className={styles.companyName}>NexTrade</span>
        <span className={styles.titleDivider} />
        <span className={styles.brandTitle}>{title}</span>

        <div className={styles.tickerItem}>
          <span className={styles.tickerDot} />
          <span className={styles.tickerLabel}>S&amp;P 500</span>
          <span className={styles.tickerValue}>5,482.10</span>
          <span className={styles.tickerChange}>+0.38%</span>
        </div>
      </div>

      {/* Right Side */}
      <div className={styles.topbarRight}>
        {/* Notifications */}
        <div className={styles.menuWrapper} ref={notifRef}>
          <button
            className={styles.iconBtn}
            aria-label="Notifications"
            onClick={() => setNotifOpen((v) => !v)}
          >
            <Bell size={18} />
            {unreadCount > 0 && <span className={styles.badge} />}
          </button>

          {notifOpen && (
            <div className={`${styles.dropdown} ${styles.notifDropdown}`}>
              <div className={styles.dropdownHeader}>
                <span className={styles.dropdownTitle}>Notifications</span>
                {unreadCount > 0 && (
                  <button className={styles.markReadBtn} onClick={markAllRead}>
                    <Check size={12} />
                    Mark all as read
                  </button>
                )}
              </div>

              <div className={styles.notifList}>
                {notifications.length === 0 ? (
                  <div className={styles.emptyState}>You're all caught up</div>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className={`${styles.notifItem} ${
                        n.unread ? styles.notifItemUnread : ""
                      }`}
                    >
                      {n.unread && <span className={styles.notifDotIndicator} />}
                      <div className={styles.notifContent}>
                        <span className={styles.notifItemTitle}>{n.title}</span>
                        <span className={styles.notifItemDesc}>{n.desc}</span>
                        <span className={styles.notifItemTime}>{n.time}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <button className={styles.viewAllBtn}>View all notifications</button>
            </div>
          )}
        </div>

        <div className={styles.topbarDivider} />

        <ToggleTheme />

        <UserDropdown />
      </div>
    </header>
  );
}