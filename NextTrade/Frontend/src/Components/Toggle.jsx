import React from "react";
import { Sun, Moon } from "lucide-react";
import useTheme from "../Context/ThemeContext";
import style from "./Header.module.css";

const ToggleTheme = () => {
  const { darkmode, toggleDarkmode } = useTheme();

  return (
    <div>
      <button
        type="button"
        onClick={toggleDarkmode}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "6px",
          borderRadius: "50%",
          transition: "background-color 0.15s ease",
        }}
      >
        {darkmode ? (
          <Sun size={20} color="var(--text-secondary)" />
        ) : (
          <Moon size={20} color="var(--text-secondary)" />
        )}
      </button>
    </div>
  );
};

export default ToggleTheme;