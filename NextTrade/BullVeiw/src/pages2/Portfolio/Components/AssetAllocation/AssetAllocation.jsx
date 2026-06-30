import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";     
import { formatCurrency } from "../../utils/formatCurrency";
import styles from "./AssetAllocation.module.css";

const COLORS = ["#10b981", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6"];

function AssetAllocation({ holdings }) {
  const chartData =
    holdings?.map((h) => ({
      name: h.symbol,
      value: (h.currentPrice ?? h.avgBuyPrice ?? 0) * h.quantity,
    })) || [];

  const totalValue = chartData.reduce((sum, d) => sum + d.value, 0);

  return (
    <div className={styles.card}>
      <h3 className={styles.heading}>Asset Allocation</h3>

      {chartData.length > 0 ? (
        <div className={styles.content}>
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className={styles.list}>
            {chartData.map((entry, index) => {
              const percentage =
                totalValue > 0 ? ((entry.value / totalValue) * 100).toFixed(0) : 0;

              return (
                <div key={entry.name} className={styles.item}>
                  <div className={styles.itemLeft}>
                    <span
                      className={styles.dot}
                      style={{ background: COLORS[index % COLORS.length] }}
                    />
                    <span className={styles.symbolBadge}>{entry.name}</span>
                  </div>
                  <span className={styles.percentage}>{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className={styles.emptyText}>No assets allocated yet.</p>
      )}
    </div>
  );
}

export default AssetAllocation;