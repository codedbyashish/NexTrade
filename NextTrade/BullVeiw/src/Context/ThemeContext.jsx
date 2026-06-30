
import React from "react";
import { useContext, useState, createContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkmode, setDarkmode] = useState(false);
  const toggleDarkmode = () => setDarkmode((prev) => !prev);
  return (
    <ThemeContext.Provider value={{ darkmode, toggleDarkmode }}>
      {children}
    </ThemeContext.Provider>
  );
};

const useTheme = () => useContext(ThemeContext);

export default useTheme;
