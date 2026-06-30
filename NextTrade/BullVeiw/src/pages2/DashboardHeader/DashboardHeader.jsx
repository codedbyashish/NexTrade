import { Search, Bell, Settings } from "lucide-react";

import styles from "./DashboardHeader.module.css";

import ToggleTheme from "../../Components/Toggle";
import UserDropdown from "../DashboardHeader/Profile/Userdropdown";
import user from "./Profile/Userdropdown";

export default function DashboardHeader() {
  return (
    <header className={styles.topbar}>
      {/* Search */}
      <div className={styles.searchBar}>
        <Search size={16} className={styles.searchIcon} />

        <input
          type="text"
          placeholder="Search instruments..."
          className={styles.searchInput}
        />

      </div>

      {/* Right Side */}
      <div className={styles.topbarRight}>
        <button
          className={styles.iconBtn}
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>

        <button
          className={styles.iconBtn}
          aria-label="Settings"
        >
          <Settings size={18} />
        </button>

        <div className={styles.topbarDivider} />

        <ToggleTheme />

        <UserDropdown  />
      </div>
    </header>
  );
}