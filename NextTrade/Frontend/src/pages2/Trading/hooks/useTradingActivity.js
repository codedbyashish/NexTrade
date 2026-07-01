import { useState, useEffect, useCallback } from "react";
import { getTradingActivity } from "../services/tradingActivityService";

export function useTradingActivity() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      setError("");
      const result = await getTradingActivity();
      setData(result);
    } catch (err) {
      setError(err.message || "Failed to load trading activity");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}