"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart as RBarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { formatKD, formatKDCompact } from "@/lib/utils";

const AXIS = { fontSize: 11, fill: "hsl(var(--muted-foreground))" };
const GRID = "hsl(var(--border))";

function TooltipBox({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-border bg-card px-3 py-2 text-xs shadow-md">
      <p className="text-muted-foreground">{title}</p>
      <p className="font-serif text-sm text-charcoal">{value}</p>
    </div>
  );
}

// --- Revenue by month (bar) ----------------------------------------------

export function RevenueBarChart({
  data,
  labels,
  seriesLabel,
}: {
  data: number[];
  labels: string[];
  seriesLabel: string;
}) {
  const rows = data.map((v, i) => ({ name: labels[i], value: v }));
  return (
    <div dir="ltr" className="w-full">
      <ResponsiveContainer width="100%" height={260}>
        <RBarChart data={rows} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke={GRID} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={AXIS} />
          <YAxis
            tickFormatter={(v) => formatKDCompact(Number(v))}
            tickLine={false}
            axisLine={false}
            width={64}
            tick={AXIS}
          />
          <Tooltip
            cursor={{ fill: "hsl(var(--muted))" }}
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <TooltipBox
                  title={`${seriesLabel} · ${label}`}
                  value={formatKD(Number(payload[0].value))}
                />
              ) : null
            }
          />
          <Bar
            dataKey="value"
            fill="hsl(var(--gold))"
            radius={[4, 4, 0, 0]}
            maxBarSize={34}
          />
        </RBarChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Occupancy trend (area) ----------------------------------------------

export function OccupancyAreaChart({
  data,
  labels,
  seriesLabel,
}: {
  data: number[];
  labels: string[];
  seriesLabel: string;
}) {
  const rows = data.map((v, i) => ({ name: labels[i], value: v }));
  const min = Math.floor(Math.min(...data) - 3);
  const max = Math.min(100, Math.ceil(Math.max(...data) + 2));
  return (
    <div dir="ltr" className="w-full">
      <ResponsiveContainer width="100%" height={260}>
        <AreaChart data={rows} margin={{ top: 8, right: 8, left: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="occGold" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity={0.25} />
              <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke={GRID} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} tick={AXIS} />
          <YAxis
            domain={[min, max]}
            tickFormatter={(v) => `${v}%`}
            tickLine={false}
            axisLine={false}
            width={44}
            tick={AXIS}
          />
          <Tooltip
            content={({ active, payload, label }) =>
              active && payload?.length ? (
                <TooltipBox
                  title={`${seriesLabel} · ${label}`}
                  value={`${payload[0].value}%`}
                />
              ) : null
            }
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="hsl(var(--gold-dark))"
            strokeWidth={2.5}
            fill="url(#occGold)"
            dot={{ r: 2.5, fill: "hsl(var(--gold-dark))", strokeWidth: 0 }}
            activeDot={{ r: 4 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

// --- Revenue by property (donut + legend) --------------------------------

export function RevenueDonut({
  slices,
  centerLabel,
}: {
  slices: { name: string; value: number; color: string }[];
  centerLabel: string;
}) {
  const total = slices.reduce((s, x) => s + x.value, 0);
  return (
    <div className="flex flex-col items-center gap-6 sm:flex-row">
      <div dir="ltr" className="relative h-44 w-44 shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={slices}
              dataKey="value"
              nameKey="name"
              innerRadius={56}
              outerRadius={84}
              paddingAngle={1.5}
              stroke="none"
            >
              {slices.map((s) => (
                <Cell key={s.name} fill={s.color} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) =>
                active && payload?.length ? (
                  <TooltipBox
                    title={String(payload[0].name)}
                    value={formatKD(Number(payload[0].value))}
                  />
                ) : null
              }
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-serif text-lg text-charcoal">
            {formatKD(total)}
          </span>
          <span className="text-[0.65rem] text-muted-foreground">
            {centerLabel}
          </span>
        </div>
      </div>

      <ul className="grid w-full gap-2 text-sm">
        {slices.map((s) => (
          <li key={s.name} className="flex items-center gap-2">
            <span
              className="h-3 w-3 shrink-0 rounded-sm"
              style={{ background: s.color }}
            />
            <span className="flex-1 truncate text-charcoal/80">{s.name}</span>
            <span className="tnum text-charcoal">{formatKD(s.value)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
