import { useNavigate, useLocation } from "react-router-dom";
import {
  LayoutGrid,
  TrendingUp,
  Briefcase,
  ArrowLeftRight,
  Eye,
} from "lucide-react";

import styles from "./Sidebar.module.css";

const navItems = [
  { label: "Dashboard", icon: LayoutGrid, path: "/dashboard" },
  { label: "Stocks", icon: TrendingUp, path: "/dashboard/stocks" },
  { label: "Portfolio", icon: Briefcase, path: "/dashboard/portfolio" },
  { label: "Trading", icon: ArrowLeftRight, path: "/dashboard/trading" },
  { label: "Watchlist", icon: Eye, path: "/dashboard/watchlist" },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarTop}>
        <div className={styles.brandBlock}>
          <h1 className={styles.brandName}>NexTrade</h1>
          <p className={styles.brandSub}>TERMINAL V2.0</p>
        </div>

        <ul className={styles.navList}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <li
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`${styles.navItem} ${
                  isActive ? styles.active : ""
                }`}
              >
                <Icon className={styles.navIcon} />
                <span>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.sidebarBottom}>
        <span className={styles.terminalTag}>
          TERMINAL V2.0
        </span>
      </div>
    </aside>
  );
}