import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import styles from "./UserDropdown.module.css";

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  // ✅ get real logged-in user from localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  // fallback if not logged in
  const user = storedUser || {
    name: "Guest User",
    planLabel: "FREE MEMBER",
    initials: "GU",
  };

  // ✅ auto-generate initials if missing
  const getInitials = (name = "") =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const goTo = (path) => {
    setOpen(false);
    navigate(path);
  };

  const handleLogout = () => {
    setOpen(false);

    // ✅ clear login session properly
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className={styles.wrapper} ref={ref}>
      <button
        className={styles.chip}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {/* ✅ FIXED: dynamic initials */}
        <div className={styles.avatar}>
          {user.initials || getInitials(user.name)}
        </div>

        <span className={styles.name}>{user.name}</span>

        <ChevronDown
          size={16}
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
        />
      </button>

      {open && (
        <div className={styles.dropdown}>
          <div className={styles.dropHeader}>
            <div className={styles.dropAvatar}>
              {user.initials || getInitials(user.name)}
            </div>

            <div>
              <p className={styles.dropName}>{user.name}</p>
              <p className={styles.dropRole}>{user.planLabel}</p>
            </div>
          </div>

          <div className={styles.divider} />

          <button
            className={styles.item}
            onClick={() => goTo("/dashboard/profile")}
          >
            <User size={15} />
            Profile &amp; Settings
          </button>

          <div className={styles.divider} />

          <button
            className={`${styles.item} ${styles.itemDanger}`}
            onClick={handleLogout}
          >
            <LogOut size={15} />
            Log Out
          </button>
        </div>
      )}
    </div>
  );
}