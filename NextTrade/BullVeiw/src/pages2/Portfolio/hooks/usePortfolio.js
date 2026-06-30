import { useState, useEffect, useCallback } from "react";
import { getPortfolio } from "../services/portfolioService";

export function usePortfolio() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPortfolio = useCallback(async () => {
    try {
      setError("");
      const result = await getPortfolio();
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to load portfolio");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
    const interval = setInterval(fetchPortfolio, 10000);
    const handleUpdate = () => fetchPortfolio();
    window.addEventListener("portfolio-update", handleUpdate);

    return () => {
      clearInterval(interval);
      window.removeEventListener("portfolio-update", handleUpdate);
    };
  }, [fetchPortfolio]);

  return { data, loading, error };
}