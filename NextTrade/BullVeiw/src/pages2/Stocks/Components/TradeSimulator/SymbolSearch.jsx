import React, { useState } from "react";
import styles from "./SymbolSearch.module.css";

const POPULAR_SYMBOLS = [
  { label: "META", value: "NASDAQ:META" },
  { label: "AAPL", value: "NASDAQ:AAPL" },
  { label: "TSLA", value: "NASDAQ:TSLA" },
  { label: "RELIANCE", value: "NSE:RELIANCE" },
  { label: "TCS", value: "NSE:TCS" },
];

function SymbolSearch({ onSelect }) {
  const [query, setQuery] = useState("");

  const filtered = POPULAR_SYMBOLS.filter((s) =>
    s.label.toLowerCase().includes(query.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    // raw exchange-prefixed input bhi allow, e.g. "NSE:INFY"
    const value = query.includes(":") ? query.toUpperCase() : `NASDAQ:${query.toUpperCase()}`;
    onSelect(value);
    setQuery("");
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Search symbol (e.g. META, NSE:RELIANCE)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className={styles.searchBtn}>Go</button>
      </form>

      {query && filtered.length > 0 && (
        <div className={styles.dropdown}>
          {filtered.map((s) => (
            <button
              key={s.value}
              className={styles.option}
              onClick={() => {
                onSelect(s.value);
                setQuery("");
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SymbolSearch;