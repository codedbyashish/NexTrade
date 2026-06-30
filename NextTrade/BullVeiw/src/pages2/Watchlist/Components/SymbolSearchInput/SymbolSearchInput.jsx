import React, { useState } from "react";
import { searchSymbols } from "../../../../api/stockapi";
import styles from "./SymbolSearch.module.css";

function SymbolSearchInput({ onAdd, existingSymbols = [] }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const debounceRef = React.useRef(null);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);

    clearTimeout(debounceRef.current);
    if (!val.trim()) { setResults([]); return; }

    debounceRef.current = setTimeout(async () => {
      setLoading(true);
      const data = await searchSymbols(val);
      const filtered = data
        .filter(
          (r) =>
            r.type === "Common Stock" &&
            !existingSymbols.includes(r.symbol) &&
            !r.symbol.includes(".")
        )
        .slice(0, 8);
      setResults(filtered);
      setLoading(false);
    }, 400);
  };

  const handleSelect = (sym) => {
    onAdd(sym);
    setQuery("");
    setResults([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    // manually typed symbol — strip exchange prefix if any
    const sym = query.includes(":")
      ? query.split(":").pop().toUpperCase()
      : query.toUpperCase();
    handleSelect(sym);
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          placeholder="Search symbol e.g. AAPL"
          value={query}
          onChange={handleChange}
        />
        <button type="submit" className={styles.searchBtn}>+ Add</button>
      </form>

      {(loading || results.length > 0) && (
        <div className={styles.dropdown}>
          {loading && (
            <div className={styles.option} style={{ color: "var(--text-muted)" }}>
              Searching...
            </div>
          )}
          {!loading && results.map((r) => (
            <button
              key={r.symbol}
              className={styles.option}
              onClick={() => handleSelect(r.symbol)}
            >
              <span style={{ fontWeight: 700 }}>{r.symbol}</span>
              <span style={{ fontSize: 12, color: "var(--text-muted)", marginLeft: 8 }}>
                {r.description}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SymbolSearchInput;