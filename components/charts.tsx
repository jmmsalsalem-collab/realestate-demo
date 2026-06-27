import { formatCompact, formatCurrency } from "@/lib/utils";

// --- Bar chart (revenue by month) ----------------------------------------

export function BarChart({
  data,
  labels,
}: {
  data: number[];
  labels: string[];
}) {
  const W = 720;
  const H = 240;
  const pad = { top: 16, right: 8, bottom: 28, left: 48 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;
  const max = Math.max(...data) * 1.1;
  const barW = (cw / data.length) * 0.6;
  const gap = (cw / data.length) * 0.4;

  const ticks = 4;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Revenue by month"
    >
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const y = pad.top + (ch / ticks) * i;
        const val = max - (max / ticks) * i;
        return (
          <g key={i}>
            <line
              x1={pad.left}
              x2={W - pad.right}
              y1={y}
              y2={y}
              stroke="hsl(var(--border))"
              strokeWidth={1}
            />
            <text
              x={pad.left - 8}
              y={y + 4}
              textAnchor="end"
              className="fill-muted-foreground"
              fontSize={10}
            >
              ${formatCompact(val)}
            </text>
          </g>
        );
      })}
      {data.map((v, i) => {
        const h = (v / max) * ch;
        const x = pad.left + (cw / data.length) * i + gap / 2;
        const y = pad.top + ch - h;
        return (
          <g key={i}>
            <rect
              x={x}
              y={y}
              width={barW}
              height={h}
              rx={3}
              fill="hsl(var(--gold))"
            />
            <text
              x={x + barW / 2}
              y={H - 10}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize={10}
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// --- Line chart (occupancy trend) ----------------------------------------

export function LineChart({
  data,
  labels,
}: {
  data: number[];
  labels: string[];
}) {
  const W = 720;
  const H = 240;
  const pad = { top: 16, right: 12, bottom: 28, left: 40 };
  const cw = W - pad.left - pad.right;
  const ch = H - pad.top - pad.bottom;
  const min = Math.min(...data) - 3;
  const max = Math.max(...data) + 2;
  const span = max - min || 1;

  const pt = (v: number, i: number) => {
    const x = pad.left + (cw / (data.length - 1)) * i;
    const y = pad.top + ch - ((v - min) / span) * ch;
    return [x, y] as const;
  };

  const line = data.map((v, i) => pt(v, i).join(",")).join(" ");
  const [, firstY] = pt(data[0], 0);
  const area = `${pad.left},${pad.top + ch} ${line} ${pad.left + cw},${
    pad.top + ch
  }`;
  void firstY;

  const ticks = 4;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Occupancy trend"
    >
      <defs>
        <linearGradient id="occFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity={0.28} />
          <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity={0} />
        </linearGradient>
      </defs>
      {Array.from({ length: ticks + 1 }).map((_, i) => {
        const y = pad.top + (ch / ticks) * i;
        const val = max - (span / ticks) * i;
        return (
          <g key={i}>
            <line
              x1={pad.left}
              x2={W - pad.right}
              y1={y}
              y2={y}
              stroke="hsl(var(--border))"
              strokeWidth={1}
            />
            <text
              x={pad.left - 8}
              y={y + 4}
              textAnchor="end"
              className="fill-muted-foreground"
              fontSize={10}
            >
              {Math.round(val)}%
            </text>
          </g>
        );
      })}
      <polygon points={area} fill="url(#occFill)" />
      <polyline
        points={line}
        fill="none"
        stroke="hsl(var(--gold-dark))"
        strokeWidth={2.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      {data.map((v, i) => {
        const [x, y] = pt(v, i);
        return (
          <g key={i}>
            <circle cx={x} cy={y} r={3} fill="hsl(var(--gold-dark))" />
            <text
              x={x}
              y={H - 10}
              textAnchor="middle"
              className="fill-muted-foreground"
              fontSize={10}
            >
              {labels[i]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// --- Donut chart (revenue by property) -----------------------------------

function polar(cx: number, cy: number, r: number, angle: number) {
  const a = ((angle - 90) * Math.PI) / 180;
  return [cx + r * Math.cos(a), cy + r * Math.sin(a)] as const;
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  rInner: number,
  start: number,
  end: number
) {
  const [sx, sy] = polar(cx, cy, r, end);
  const [ex, ey] = polar(cx, cy, r, start);
  const [isx, isy] = polar(cx, cy, rInner, end);
  const [iex, iey] = polar(cx, cy, rInner, start);
  const large = end - start > 180 ? 1 : 0;
  return [
    `M ${sx} ${sy}`,
    `A ${r} ${r} 0 ${large} 0 ${ex} ${ey}`,
    `L ${iex} ${iey}`,
    `A ${rInner} ${rInner} 0 ${large} 1 ${isx} ${isy}`,
    "Z",
  ].join(" ");
}

export function DonutChart({
  slices,
}: {
  slices: { name: string; value: number; color: string }[];
}) {
  const total = slices.reduce((s, x) => s + x.value, 0) || 1;
  const cx = 90;
  const cy = 90;
  const r = 84;
  const rInner = 52;
  let angle = 0;

  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
      <svg
        viewBox="0 0 180 180"
        className="h-44 w-44 shrink-0"
        role="img"
        aria-label="Revenue by property"
      >
        {slices.map((s) => {
          const sweep = (s.value / total) * 360;
          const path = arcPath(cx, cy, r, rInner, angle, angle + sweep);
          angle += sweep;
          return <path key={s.name} d={path} fill={s.color} />;
        })}
        <text
          x={cx}
          y={cy - 4}
          textAnchor="middle"
          className="fill-charcoal font-serif"
          fontSize={18}
        >
          ${formatCompact(total)}
        </text>
        <text
          x={cx}
          y={cy + 14}
          textAnchor="middle"
          className="fill-muted-foreground"
          fontSize={9}
        >
          / month
        </text>
      </svg>

      <ul className="grid w-full gap-2 text-sm">
        {slices.map((s) => (
          <li key={s.name} className="flex items-center gap-2">
            <span
              className="h-3 w-3 shrink-0 rounded-sm"
              style={{ background: s.color }}
            />
            <span className="flex-1 truncate text-charcoal/80">{s.name}</span>
            <span className="font-medium text-charcoal">
              {formatCurrency(s.value)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
