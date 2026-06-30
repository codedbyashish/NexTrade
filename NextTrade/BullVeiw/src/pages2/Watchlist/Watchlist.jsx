import React, { useState, useEffect } from "react";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "./Components/services/watchlistService";
import { getstocksprice } from "../../api/stockapi";
import WatchlistTable from "./Components/WatchlistTable/WatchlistTable";
import SymbolSearchInput from "./Components/SymbolSearchInput/SymbolSearchInput";
import InsightCards from "./Components/InsightCards/InsightCards";
import styles from "./Watchlist.module.css";
import Footer from "./Components/Footer/Footer";

function Watchlist() {
  const [symbols, setSymbols] = useState(getWatchlist());
  const [quotes, setQuotes] = useState({});

  useEffect(() => {
    let active = true;

    const fetchAll = async () => {
      const results = await Promise.all(
        symbols.map(async (sym) => {
          const data = await getstocksprice(sym);
          return [sym, data];
        })
      );
      if (active) setQuotes(Object.fromEntries(results));
    };

    fetchAll();
    const interval = setInterval(fetchAll, 15000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [symbols]);

  const handleAdd = (sym) => {
    const updated = addToWatchlist(sym);
    setSymbols(updated);
  };

  const handleRemove = (sym) => {
    const updated = removeFromWatchlist(sym);
    setSymbols(updated);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>My Watchlist</h1>
          <p className={styles.subtitle}>
            Monitoring {symbols.length} primary assets
          </p>
        </div>
        <SymbolSearchInput
          onAdd={handleAdd}
          existingSymbols={symbols}
        />
      </div>

      <div className={styles.section}>
  <InsightCards quotes={quotes} symbols={symbols} />
</div>

<div className={styles.section}>
  <WatchlistTable
    symbols={symbols}
    quotes={quotes}
    onRemove={handleRemove}
    onTrade={(sym) => console.log("Trade:", sym)}
  />
</div>
<Footer/>
    </div>
    
  );
}

export default Watchlist;