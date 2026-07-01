const API_BASE = import.meta.env.VITE_API_URL || "https://nextrade-backend-8bec.onrender.com";

async function authFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login again");
  }

  let res;
  try {
    res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...(options.headers || {}),
      },
    });
  } catch (err) {
    // Network-level failure (server down, CORS, no connection, etc.)
    throw new Error("Server not reachable");
  }

  const result = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(result.message || "Request failed");
  }

  return result;
}

export async function getTradingActivity() {
  return authFetch(`${API_BASE}/api/trade/activity`);
}

export async function closePosition(symbol) {
  return authFetch(`${API_BASE}/api/trade/positions/${symbol}/close`, {
    method: "POST",
  });
}

// Your backend has separate /buy and /sell endpoints rather than one generic
// "create trade" route, so this routes to whichever one matches `type`.
export async function addTrade({ symbol, type, qty, price }) {
  const endpoint = type === "SELL" ? "sell" : "buy";

  return authFetch(`${API_BASE}/api/trade/${endpoint}`, {
    method: "POST",
    body: JSON.stringify({ symbol, quantity: qty }),
  });
}
