import React from "react";
import { useTradingActivity } from "./hooks/useTradingActivity";
import { closePosition } from "./services/tradingActivityService";
import TradingHeader from "./Components/TradingHeader/TradingHeader";
import ActivePositions from "./Components/ActivePositions/ActivePositions";
import OrderHistory from "./Components/OrderHistory/OrderHistory";
import ExecutionAnalytics from "./Components/ExecutionAnalytics/ExecutionAnalytics";
import SmartAlerts from "./Components/SmartAlerts/SmartAlerts";
import EquityCurvePreview from "./Components/EquityCurvePreview/EquityCurvePreview";
import Footer from "./Components/Footer/Footer";
import styles from "./Trading.module.css";

function Trading() {
  const { data, loading, error, refetch } = useTradingActivity();

  const handleClose = async (symbol) => {
    await closePosition(symbol);
    refetch();
  };

  const handleExport = () => {
    console.log("Export CSV - TODO: real export logic future me");
  };

  const handleNewTrade = () => {
    console.log("New Trade clicked - TODO: open trade modal ya navigate");
  };

  if (loading && !data) {
    return <div className={styles.loading}>Loading trading activity...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!data) {
    return <div className={styles.error}>No trading activity found</div>;
  }

  const analytics = data.analytics || {};

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <TradingHeader onExport={handleExport} onNewTrade={handleNewTrade} />

        <div className={styles.grid}>
          <div className={styles.leftCol}>
            <ActivePositions
              positions={data.activePositions || []}
              onClose={handleClose}
            />
            <OrderHistory orders={data.orderHistory || []} />
          </div>

          <div className={styles.rightCol}>
            <ExecutionAnalytics
              winRate={analytics.winRate ?? 0}
              targetWinRate={analytics.targetWinRate ?? 0}
              avgHoldHours={analytics.avgHoldHours ?? 0}
            />
            <SmartAlerts alerts={data.alerts || []} />
            <EquityCurvePreview />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Trading;