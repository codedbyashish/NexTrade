import React from "react";
import { usePortfolio } from "./hooks/usePortfolio";
import PortfolioSummary from "./Components/PortfolioSummary/PortfolioSummary";
import HoldingsTable from "./Components/HoldingsTable/HoldingsTable";
import AssetAllocation from "./Components/AssetAllocation/AssetAllocation";
import RecentActivity from "./Components/RecentActivity/RecentActivity";
import styles from "./Portfolio.module.css";
import Footer from "./Components/Footer/Footer";

function Portfolio() {
  const { data, loading, error } = usePortfolio();

  if (loading && !data) {
    return <div className={styles.loading}>Loading portfolio...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!data) {
    return <div className={styles.error}>No portfolio data found</div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <PortfolioSummary
          totalValue={data.totalPortfolioValue}
          cash={data.cash}
          totalPnL={data.totalPnL}
        />

        <div className={styles.bottomGrid}>
          <AssetAllocation holdings={data.holdings} />
          <RecentActivity transactions={data.transactions} />
        </div>

        <HoldingsTable holdings={data.holdings} />
      </div>

      <Footer />
    </div>
  );
}

export default Portfolio;