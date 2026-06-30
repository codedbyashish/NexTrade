import { useMemo } from "react";

function Sparkline({ quote }) {
  const points = useMemo(() => {
    if (!quote) return null;
    const { pc, o, l, h, c } = quote;
    if (!pc || !o || !c) return null;
    return [pc, o, l, h, c];
  }, [quote]);

  if (!points) return (
    <svg width="80" height="32" viewBox="0 0 80 32">
      <line x1="4" y1="16" x2="76" y2="16"
        stroke="var(--border-strong)" strokeWidth="1.5"
        strokeDasharray="4 3" strokeLinecap="round" />
    </svg>
  );

  const W = 80, H = 32, PAD = 3;
  const min = Math.min(...points);
  const max = Math.max(...points);
  const range = max - min || 1;

  const coords = points.map((price, i) => {
    const x = PAD + (i / (points.length - 1)) * (W - PAD * 2);
    const y = H - PAD - ((price - min) / range) * (H - PAD * 2);
    return `${x},${y}`;
  });

  const isPositive = points[points.length - 1] >= points[0];
  const color = isPositive ? "#22c55e" : "#ef4444";

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <polyline
        points={coords.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx={coords[coords.length - 1].split(",")[0]}
        cy={coords[coords.length - 1].split(",")[1]}
        r="2"
        fill={color}
      />
    </svg>
  );
}

export default Sparkline;