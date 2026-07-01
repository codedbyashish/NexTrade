// 🔁 Replace these with real API calls later:
// e.g. return fetch("/api/trade/buy", { method: "POST", body: JSON.stringify(...) }).then(r => r.json());

export async function buyStock({ symbol, price, quantity }) {
  return {
    symbol,
    buyPrice: price,
    quantity,
    timestamp: Date.now(),
  };
}

export async function sellStock({ symbol, price, quantity, position }) {
  const profit = (price - position.buyPrice) * quantity;
  return {
    symbol,
    sellPrice: price,
    quantity,
    profit,
    timestamp: Date.now(),
  };
}