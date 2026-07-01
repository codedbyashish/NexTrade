import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TrendingUp, TrendingDown } from "lucide-react";
import styles from "./Topmovers.module.css";
import { getstocksprice } from "../../api/stockapi";
import RecentTrades from "../Recenttrades/Recenttrades";


const symbols = ["AAPL", "MSFT", "TSLA", "AMZN", "GOOGL", "NVDA", "META", "NFLX"];

export default function TopMovers() {
  const [gainers, setGainers] = useState([]);
  const [losers, setLosers] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const results = await Promise.all(
          symbols.map((sym) => getstocksprice(sym))
        );

        const formatted = results
          .map((data, i) => {
            // Finnhub se invalid/empty data aaya to skip kar (data.c === 0 ya dp null)
            if (!data || data.c === 0 || data.dp === null) return null;

            return {
              symbol: symbols[i],
              logo: symbols[i].slice(0, 2).toUpperCase(),
              name: data?.name || symbols[i],
              price: data?.price ?? data?.c ?? 0,
              change: data?.change ?? data?.d ?? 0,
              changePercent: data?.changePercent ?? data?.dp ?? 0,
            };
          })
          .filter(Boolean); // null entries hata do

        const sorted = [...formatted].sort(
          (a, b) => b.changePercent - a.changePercent
        );

        setGainers(sorted.filter((s) => s.changePercent >= 0).slice(0, 5));
        setLosers(
          sorted
            .filter((s) => s.changePercent < 0)
            .sort((a, b) => a.changePercent - b.changePercent)
            .slice(0, 5)
        );
      } catch (err) {
        console.error("Stock fetch failed:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, []);

  const formatPrice = (price) =>
    Number(price).toLocaleString("en-US", { minimumFractionDigits: 2 });

  const formatChange = (pct) =>
    `${pct >= 0 ? "+" : ""}${Number(pct).toFixed(2)}%`;

  const goToStock = (symbol) => {
    navigate(`/dashboard/stocks?symbol=NASDAQ:${symbol}`);
  };

  const MoverCard = ({ title, data, positive }) => (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        {positive ? (
          <TrendingUp size={16} className={styles.iconUp} />
        ) : (
          <TrendingDown size={16} className={styles.iconDown} />
        )}
        <span className={positive ? styles.titleUp : styles.titleDown}>
          {title}
        </span>
      </div>

      <div className={styles.tableHeader}>
        <span className={styles.colCompany}>COMPANY</span>
        <span className={styles.colLtp}>LTP</span>
        <span className={styles.colChange}>CHANGE</span>
      </div>

      {loading ? (
        <div className={styles.loadingText}>Loading...</div>
      ) : data.length === 0 ? (
        <div className={styles.loadingText}>No data available</div>
      ) : (
        data.map((stock) => (
          <div
            key={stock.symbol}
            className={styles.row}
            onClick={() => goToStock(stock.symbol)}
            style={{ cursor: "pointer" }}
          >
            <div className={styles.companyCell}>
              <div className={styles.logoBox}>{stock.logo}</div>
              <span className={styles.companyName}>{stock.symbol}</span>
            </div>
            <span className={styles.ltp}>{formatPrice(stock.price)}</span>
            <span className={positive ? styles.changeUp : styles.changeDown}>
              {formatChange(stock.changePercent)}
            </span>
          </div>
        ))
      )}
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <MoverCard title="TOP GAINERS" data={gainers} positive={true} />
      <MoverCard title="TOP LOSERS" data={losers} positive={false} />
      <RecentTrades />
    </div>
  );
}