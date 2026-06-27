import Link from "next/link";
import {
  Building2,
  CircleDollarSign,
  DoorClosed,
  DoorOpen,
  Percent,
  TrendingUp,
  Wallet,
  Wrench,
} from "lucide-react";
import {
  MONTH_LABELS,
  occupancyTrend,
  portfolioKpis,
  revenueByMonth,
  revenueByProperty,
  maintenance,
} from "@/lib/data";
import { formatCompact, formatCurrency, formatPercent } from "@/lib/utils";
import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/page-header";
import { BarChart, DonutChart, LineChart } from "@/components/charts";
import { StatusBadge } from "@/components/status-badge";
import { AskAiButton } from "@/components/ask-ai-button";

export default function DashboardPage() {
  const k = portfolioKpis();
  const openTickets = maintenance
    .filter((m) => m.status !== "Resolved")
    .slice(0, 5);

  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Portfolio overview · June 2026"
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard
          label="Total Properties"
          value={String(k.totalProperties)}
          icon={Building2}
          hint={`${k.totalUnits} units total`}
        />
        <KpiCard
          label="Occupied Units"
          value={String(k.occupiedUnits)}
          icon={DoorClosed}
          tone="good"
          hint={`of ${k.totalUnits} units`}
        />
        <KpiCard
          label="Vacant Units"
          value={String(k.vacantUnits)}
          icon={DoorOpen}
          tone="warn"
          hint="Across portfolio"
        />
        <KpiCard
          label="Occupancy Rate"
          value={formatPercent(k.occupancyRate, 1)}
          icon={Percent}
          tone="good"
        />
        <KpiCard
          label="Monthly Revenue"
          value={formatCurrency(k.monthlyRevenue)}
          icon={CircleDollarSign}
          hint="Collected rent / month"
        />
        <KpiCard
          label="Outstanding Rent"
          value={formatCurrency(k.outstandingRent)}
          icon={Wallet}
          tone="danger"
          hint="Past-due balances"
        />
        <KpiCard
          label="Open Maintenance"
          value={String(k.openMaintenance)}
          icon={Wrench}
          tone="warn"
          hint="Unresolved tickets"
        />
        <KpiCard
          label="Annualized Revenue"
          value={`$${formatCompact(k.monthlyRevenue * 12)}`}
          icon={TrendingUp}
          hint="Run-rate estimate"
        />
      </div>

      {/* Charts */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-4 font-serif text-lg text-charcoal">
            Revenue by Month
          </h2>
          <BarChart data={revenueByMonth} labels={MONTH_LABELS} />
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg text-charcoal">
            Occupancy Trend
          </h2>
          <LineChart data={occupancyTrend} labels={MONTH_LABELS} />
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg text-charcoal">
            Revenue by Property
          </h2>
          <DonutChart slices={revenueByProperty} />
        </div>
      </div>

      {/* Recent maintenance */}
      <div className="mt-6 rounded-lg border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="font-serif text-lg text-charcoal">
            Recent Maintenance Requests
          </h2>
          <Link
            href="/maintenance"
            className="text-sm text-gold-dark hover:underline"
          >
            View all
          </Link>
        </div>
        <div className="divide-y divide-border">
          {openTickets.map((t) => (
            <div
              key={t.id}
              className="flex flex-wrap items-center gap-3 px-6 py-3 text-sm"
            >
              <span className="font-mono text-xs text-muted-foreground">
                {t.id}
              </span>
              <span className="flex-1 text-charcoal">{t.issue}</span>
              <span className="text-muted-foreground">
                {t.propertyName} · {t.unit}
              </span>
              <StatusBadge label={t.priority} />
              <StatusBadge label={t.status} />
            </div>
          ))}
        </div>
      </div>

      <AskAiButton />
    </>
  );
}
