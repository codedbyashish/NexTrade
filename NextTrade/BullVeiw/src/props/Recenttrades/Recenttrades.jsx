import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock } from "lucide-react";
import styles from "./trade.module.css";
import { getstocksprice } from "../../api/stockapi";

export default function RecentTrades() {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrades = async () => {
      try {
        const symbols = ["AAPL", "MSFT", "TSLA", "AMZN"];

        const tradeData = await Promise.all(
          symbols.map(async (symbol) => {
            const stock = await getstocksprice(symbol);

            return {
              symbol,
              side: Math.random() > 0.5 ? "BUY" : "SELL",
              time: new Date().toLocaleTimeString(),
              qty: Math.floor(Math.random() * 50) + 1,
              price: stock?.c || 0,
            };
          })
        );

        setTrades(tradeData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrades();
  }, []);

  const goToStock = (symbol) => {
    navigate(`/dashboard/stocks?symbol=NASDAQ:${symbol}`);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <Clock size={16} className={styles.iconNeutral} />
        <span className={styles.titleNeutral}>RECENT TRADES</span>
      </div>

      <div className={styles.container}>
        {loading ? (
          <p>Loading...</p>
        ) : (
          trades.map((trade, index) => (
            <div
              key={index}
              className={styles.row}
              onClick={() => goToStock(trade.symbol)}
              style={{ cursor: "pointer" }}
            >
              <div className={styles.leftCol}>
                <div className={styles.symbol}>{trade.symbol}</div>
                <div className={styles.time}>{trade.time}</div>
              </div>

              <div className={styles.rightCol}>
                <div
                  className={
                    trade.side === "BUY" ? styles.badgeBuy : styles.badgeSell
                  }
                >
                  {trade.side}
                </div>

                <div className={styles.qtyPrice}>
                  {trade.qty} @ ${trade.price.toFixed(2)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}