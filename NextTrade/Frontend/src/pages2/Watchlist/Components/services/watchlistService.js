const KEY = "nextrade_watchlist";

const DEFAULT_SYMBOLS = ["AAPL", "MSFT", "TSLA", "GOOGL", "NVDA"];

export const getWatchlist = () => {
  try {
    const stored = localStorage.getItem(KEY);
    return stored ? JSON.parse(stored) : DEFAULT_SYMBOLS;
  } catch {
    return DEFAULT_SYMBOLS;
  }
};

export const addToWatchlist = (symbol) => {
  const list = getWatchlist();
  if (list.includes(symbol.toUpperCase())) return list;
  const updated = [...list, symbol.toUpperCase()];
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
};

export const removeFromWatchlist = (symbol) => {
  const list = getWatchlist();
  const updated = list.filter((s) => s !== symbol.toUpperCase());
  localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
};

export const isInWatchlist = (symbol) => {
  return getWatchlist().includes(symbol.toUpperCase());
};