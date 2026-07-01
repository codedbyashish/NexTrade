import { useState, useRef, useEffect } from "react";
import {
  Pencil,
  Camera,
  Check,
  LogOut,
  CalendarDays,
} from "lucide-react";
import styles from "./Profile.module.css";

export default function AccountSettings() {
  const fileInputRef = useRef(null);

  const [image, setImage] = useState(null);
  const [editField, setEditField] = useState(null);
  const [savedField, setSavedField] = useState(null);

  // default user state
  const [user, setUser] = useState({
    name: "",
    email: "",
    mobile: "",
    createdAt: "",
    uid: "NT-7741-AB",
    plan: "PRO MEMBER",
  });

  // ✅ FIX: sync with localStorage (THIS FIXES MOBILE ISSUE)
  useEffect(() => {
    const storedUser = JSON.parse(
      localStorage.getItem("user") || "{}"
    );

    setUser((prev) => ({
      ...prev,
      ...storedUser,
    }));
  }, []);

  const initial = user?.name?.charAt(0).toUpperCase() || "?";

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "";

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleChange = (key, value) => {
    setUser((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSave = (key) => {
    const updatedUser = {
      ...JSON.parse(localStorage.getItem("user") || "{}"),
      ...user,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));

    setEditField(null);
    setSavedField(key);

    setTimeout(() => setSavedField(null), 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className={styles.page}>
      <div className={styles.headerRow}>
        <div>
          <h1 className={styles.title}>Account Settings</h1>
          <p className={styles.subtitle}>
            Manage your profile, security, and trading preferences
          </p>
        </div>
      </div>

      <div className={styles.card}>
        {/* PROFILE HEADER */}
        <div className={styles.profileRow}>
          <div
            className={styles.avatarWrapper}
            onClick={() => fileInputRef.current.click()}
          >
            {image ? (
              <img
                src={image}
                alt={user.name}
                className={styles.avatar}
              />
            ) : (
              <div className={styles.initials}>
                {initial}
              </div>
            )}

            <span className={styles.camIcon}>
              <Camera size={14} />
            </span>

            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleImageChange}
            />
          </div>

          <div className={styles.nameRow}>
            <h3>{user.name || "-"}</h3>

            <span className={styles.badge}>
              {user.plan}
            </span>

            <span className={styles.uid}>
              UID: {user.uid}
            </span>

            {memberSince && (
              <span className={styles.memberSince}>
                <CalendarDays size={12} />
                Member since {memberSince}
              </span>
            )}
          </div>
        </div>

        {/* EDIT FIELDS */}
        {["name", "email", "mobile"].map((key) => (
          <div className={styles.field} key={key}>
            <label>
              {key === "name"
                ? "Full Name"
                : key === "email"
                ? "Email Address"
                : "Mobile Number"}
            </label>

            <div className={styles.inputBox}>
              {editField === key ? (
                <input
                  className={styles.editInput}
                  value={user[key]}
                  autoFocus
                  onChange={(e) =>
                    handleChange(key, e.target.value)
                  }
                  onBlur={() => handleSave(key)}
                  onKeyDown={(e) =>
                    e.key === "Enter" &&
                    handleSave(key)
                  }
                />
              ) : (
                <span>
                  {user[key] || "-"}
                </span>
              )}

              {savedField === key ? (
                <span className={styles.savedTag}>
                  Saved ✓
                </span>
              ) : editField === key ? (
                <Check
                  size={14}
                  className={styles.iconBtn}
                  onClick={() =>
                    handleSave(key)
                  }
                />
              ) : (
                <Pencil
                  size={14}
                  className={styles.iconBtn}
                  onClick={() =>
                    setEditField(key)
                  }
                />
              )}
            </div>
          </div>
        ))}

        {/* LOGOUT */}
        <button
          className={styles.logoutBtn}
          onClick={handleLogout}
        >
          <LogOut size={15} />
          Logout
        </button>
      </div>
    </div>
  );
}