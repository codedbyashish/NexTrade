import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Dashboard.module.css";
import useTheme from "../context/ThemeContext";
import { getstocksprice, getCompanyProfile } from "../api/stockapi";
import StockCard from "../props/StockCard";
import StockChart from "../stockscahrts/StocksCharts";
import TopMovers from "../props/Marketcards/TopMovers ";

const symbols = ["AAPL", "MSFT", "TSLA", "AMZN"];

export default function Dashboard() {
  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { darkmode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const results = await Promise.all(
          symbols.map(async (symbol) => {
            const [quote, profile] = await Promise.all([
              getstocksprice(symbol),
              getCompanyProfile(symbol),
            ]);
            return { quote, profile };
          })
        );

        setStocks(
          results.map(({ quote, profile }, index) => {
            
            const price = Number(quote?.price ?? quote?.c ?? 0);
            const change = Number(quote?.change ?? quote?.d ?? 0);
            const changePercent = Number(
              quote?.changePercent ?? quote?.dp ?? 0
            );

            return {
              symbol: symbols[index],
              logoUrl: profile?.logo || null,
              logo: symbols[index].slice(0, 2),
              logoColor: "#2b3df0",
              name: profile?.name || symbols[index],
              price: price.toFixed(2),
              change: change.toFixed(2),
              changePercent: changePercent.toFixed(2),
              positive: change >= 0,
            };
          })
        );
      } catch (error) {
        console.error("Stock fetch failed:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStocks();
  }, []);

  return (
    <>
      <h2 className={styles.sectionTitle}>Most Traded Stocks</h2>
      <div className={styles.stockGrid}>
        {loading ? (
          <p>Loading stocks...</p>
        ) : (
          stocks.map((stock, index) => (
            <StockCard
              key={index}
              {...stock}
              onClick={() =>
                navigate(`/dashboard/stocks?symbol=NASDAQ:${stock.symbol}`)
              }
            />
          ))
        )}
      </div>
      <div className={styles.stockchart}>
        <div className={styles.chartHeader}>
          <div>
            <h2>Apple Inc. (AAPL)</h2>
            <p>Live Market Chart</p>
          </div>
        </div>
        <StockChart symbol="NASDAQ:AAPL" theme={darkmode ? "dark" : "light"} />
      </div>
      <TopMovers />
      <button
        className={styles.fab}
        aria-label="New Order"
        onClick={() => navigate("/dashboard/stocks")}
      >
        +
      </button>
    </>
  );
}