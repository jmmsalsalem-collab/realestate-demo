"use client";

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
  maintenance,
  occupancyTrend,
  portfolioKpis,
  revenueByMonth,
  revenueByProperty,
} from "@/lib/data";
import { formatKD, formatPercent } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { tPriority, tTicket } from "@/lib/labels";
import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/page-header";
import {
  OccupancyAreaChart,
  RevenueBarChart,
  RevenueDonut,
} from "@/components/charts";
import { StatusBadge, statusTone } from "@/components/status-badge";
import { AskAiButton } from "@/components/ask-ai-button";

export default function DashboardPage() {
  const { t, lang } = useI18n();
  const k = portfolioKpis();
  const months = MONTH_LABELS.map((m) => m[lang]);
  const openTickets = maintenance
    .filter((m) => m.status !== "Resolved")
    .slice(0, 5);

  return (
    <>
      <PageHeader
        title={t("nav_dashboard")}
        subtitle={t("dashboardSubtitle")}
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <KpiCard label={t("totalProperties")} value={String(k.totalProperties)} icon={Building2} hint={`${k.totalUnits} ${t("unitsTotalHint")}`} />
        <KpiCard label={t("occupiedUnits")} value={String(k.occupiedUnits)} icon={DoorClosed} hint={`${t("of")} ${k.totalUnits}`} />
        <KpiCard label={t("vacantUnits")} value={String(k.vacantUnits)} icon={DoorOpen} hint={t("acrossPortfolio")} />
        <KpiCard label={t("occupancyRate")} value={formatPercent(k.occupancyRate, 1)} icon={Percent} />
        <KpiCard label={t("monthlyRevenue")} value={formatKD(k.monthlyRevenue)} icon={CircleDollarSign} hint={t("collectedPerMonth")} />
        <KpiCard label={t("outstandingRent")} value={formatKD(k.outstandingRent)} icon={Wallet} hint={t("pastDueBalances")} />
        <KpiCard label={t("openMaintenance")} value={String(k.openMaintenance)} icon={Wrench} hint={t("unresolvedTickets")} />
        <KpiCard label={t("annualizedRevenue")} value={formatKD(k.monthlyRevenue * 12)} icon={TrendingUp} hint={t("runRate")} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg text-charcoal">{t("revenueByMonth")}</h2>
          <RevenueBarChart data={revenueByMonth} labels={months} seriesLabel={t("monthlyRevenue")} />
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg text-charcoal">{t("occupancyTrend")}</h2>
          <OccupancyAreaChart data={occupancyTrend} labels={months} seriesLabel={t("occupancyRate")} />
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg text-charcoal">{t("revenueByProperty")}</h2>
          <RevenueDonut
            slices={revenueByProperty.map((s) => ({ name: s.name[lang], value: s.value, color: s.color }))}
            centerLabel={lang === "ar" ? "شهرياً" : "monthly"}
          />
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-border bg-card shadow-sm">
        <div className="flex items-center justify-between border-b border-border px-6 py-4">
          <h2 className="text-lg text-charcoal">{t("recentMaintenance")}</h2>
          <Link href="/maintenance" className="text-sm text-gold-dark hover:underline">
            {t("viewAll")}
          </Link>
        </div>
        <div className="divide-y divide-border">
          {openTickets.map((m) => (
            <div key={m.id} className="flex flex-wrap items-center gap-3 px-6 py-3 text-sm">
              <span className="tnum text-xs text-muted-foreground">{m.id}</span>
              <span className="flex-1 text-charcoal">{m.issue[lang]}</span>
              <span className="text-muted-foreground">
                {m.propertyName[lang]} · {m.unit}
              </span>
              <StatusBadge label={tPriority(t, m.priority)} tone={statusTone(m.priority)} />
              <StatusBadge label={tTicket(t, m.status)} tone={statusTone(m.status)} />
            </div>
          ))}
        </div>
      </div>

      <AskAiButton />
    </>
  );
}
