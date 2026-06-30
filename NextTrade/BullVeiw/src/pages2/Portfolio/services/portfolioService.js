const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

export async function getPortfolio() {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Please login again");
  }

  let res;
  try {
    res = await fetch(`${API_BASE}/api/portfolio`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (err) {
    // Network-level failure (server down, CORS, no connection, etc.)
    throw new Error("Server not reachable");
  }

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to load portfolio");
  }

  return result;
}
