import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Stockheader from "./Components/Stockheader";
import StatsRow from "./Components/Statsrow";
import StockChart from "./Components/StockChart";
import SymbolSearch from "./Components/TradeSimulator/SymbolSearch";
import useTheme from "../../Context/ThemeContext";
import TradeSimulator from "./Components/TradeSimulator/TradeSimulator";
import {
  getstocksprice,
  getCompanyProfile,
  getBasicFinancials,
} from "../../api/stockapi"
import styles from "./Stock.module.css";
import PerformanceInsights from "./Components/PerformanceInsights/PerformanceInsights";
import Footer from "./Components/Footer/Footer";

function Stocks() {
  const { darkmode } = useTheme();
  const [searchParams, setSearchParams] = useSearchParams();

 
  const urlSymbol = searchParams.get("symbol");
  const [symbol, setSymbolState] = useState(urlSymbol || "NASDAQ:META");

  const [currentPrice, setCurrentPrice] = useState(0);
  const [quote, setQuote] = useState(null);
  const [profile, setProfile] = useState(null);
  const [financials, setFinancials] = useState(null);
  const [priceLoading, setPriceLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  // jab URL ka symbol change ho (naya card click), state ko sync karo
  useEffect(() => {
    if (urlSymbol && urlSymbol !== symbol) {
      setSymbolState(urlSymbol);
    }
  }, [urlSymbol]);

  // jab SymbolSearch se manually symbol change ho, URL bhi update karo
  const setSymbol = (newSymbol) => {
    setSymbolState(newSymbol);
    setSearchParams({ symbol: newSymbol });
  };

  // "NASDAQ:META" -> "META" (Finnhub ko sirf ticker chahiye)
  const ticker = symbol.split(":").pop();

  // Live price + quote (har 10s) — Day Low/High isi quote se aata hai
  useEffect(() => {
    let active = true;
    setPriceLoading(true);

    const fetchPrice = async () => {
      try {
        const data = await getstocksprice(ticker);
        if (active && data) {
          setCurrentPrice(data.c);
          setQuote(data); // { c, d, dp, h, l, o, ... }
        }
      } catch (err) {
        console.error("Price fetch failed:", err);
      } finally {
        if (active) setPriceLoading(false);
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 10000);
    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [ticker]);

  // Profile + Financials — ticker change pe ek baar
  useEffect(() => {
    let active = true;
    setStatsLoading(true);

    const fetchStats = async () => {
      try {
        const [profileData, financialsData] = await Promise.all([
          getCompanyProfile(ticker),
          getBasicFinancials(ticker),
        ]);
        if (active) {
          setProfile(profileData);
          setFinancials(financialsData);
        }
      } catch (err) {
        console.error("Stats fetch failed:", err);
      } finally {
        if (active) setStatsLoading(false);
      }
    };

    fetchStats();
    return () => {
      active = false;
    };
  }, [ticker]);

  return (
    <div>
      <div className={styles.page}>
        <SymbolSearch onSelect={setSymbol} />

        <Stockheader
          symbol={ticker}
          profile={profile}
          quote={quote}
          change={quote?.d ?? 0}
          changePercent={quote?.dp ?? 0}
          loading={priceLoading || statsLoading}
        />

        <div className={styles.contentGrid}>
          <div className={styles.leftCol}>
            <div className={styles.chartCard}>
              <StockChart
                symbol={symbol}
                height={450}
                theme={darkmode ? "dark" : "light"}
              />
            </div>
            <div className={styles.statsCard}>
              <StatsRow
                quote={quote}
                profile={profile}
                financials={financials}
                loading={statsLoading}
              />
            </div>

            <PerformanceInsights ticker={ticker} profile={profile} />
          </div>

          <div className={styles.rightCol}>
            <div className={styles.tradeSticky}>
              <TradeSimulator symbol={symbol} currentPrice={currentPrice} />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Stocks;