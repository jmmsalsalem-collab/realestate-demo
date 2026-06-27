"use client";

import { useMemo, useState } from "react";
import { properties, propertyFinancials } from "@/lib/data";
import { formatKD } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { tType } from "@/lib/labels";
import { PageHeader } from "@/components/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PERIODS = {
  month: { key: "thisMonth", months: 1 },
  quarter: { key: "thisQuarter", months: 3 },
  year: { key: "thisYear", months: 12 },
} as const;

type PeriodKey = keyof typeof PERIODS;

export default function FinancialsPage() {
  const { t, lang } = useI18n();
  const [period, setPeriod] = useState<PeriodKey>("month");
  const months = PERIODS[period].months;

  const rows = useMemo(
    () => properties.map((p) => ({ id: p.id, name: p.name[lang], type: p.type, ...propertyFinancials(p, months) })),
    [months, lang]
  );

  const totals = useMemo(
    () =>
      rows.reduce(
        (a, r) => ({
          grossRent: a.grossRent + r.grossRent,
          vacancyLoss: a.vacancyLoss + r.vacancyLoss,
          collected: a.collected + r.collected,
          maintenance: a.maintenance + r.maintenance,
          managementFee: a.managementFee + r.managementFee,
          insurance: a.insurance + r.insurance,
          taxes: a.taxes + r.taxes,
          operatingExpenses: a.operatingExpenses + r.operatingExpenses,
          noi: a.noi + r.noi,
        }),
        { grossRent: 0, vacancyLoss: 0, collected: 0, maintenance: 0, managementFee: 0, insurance: 0, taxes: 0, operatingExpenses: 0, noi: 0 }
      ),
    [rows]
  );

  const margin = totals.collected ? (totals.noi / totals.collected) * 100 : 0;

  return (
    <>
      <PageHeader title={t("nav_financials")} subtitle={t("financialsSubtitle")}>
        <Select value={period} onValueChange={(v) => setPeriod(v as PeriodKey)}>
          <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
          <SelectContent>
            {Object.entries(PERIODS).map(([key, p]) => (
              <SelectItem key={key} value={key}>{t(p.key)}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Summary label={t("collectedRent")} value={formatKD(totals.collected)} />
        <Summary label={t("vacancyLoss")} value={formatKD(totals.vacancyLoss)} tone="text-red-600" />
        <Summary label={t("operatingExpenses")} value={formatKD(totals.operatingExpenses)} tone="text-red-600" />
        <Summary label={t("netOperatingIncome")} value={formatKD(totals.noi)} tone="text-emerald-700" hint={`${margin.toFixed(1)}% ${t("noiMargin")}`} />
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg text-charcoal">{t("plByProperty")} · {t(PERIODS[period].key)}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 text-start font-medium">{t("property")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("grossRent")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("vacancyLoss")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("collected")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("maintShort")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("mgmtFeeShort")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("insurance")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("taxesShort")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("noiShort")}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={r.id} className={`border-b border-border ${i % 2 ? "bg-secondary/40" : ""}`}>
                  <td className="px-4 py-3">
                    <p className="font-medium text-charcoal">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{tType(t, r.type)}</p>
                  </td>
                  <td className="px-4 py-3 text-end tnum text-charcoal">{formatKD(r.grossRent)}</td>
                  <td className="px-4 py-3 text-end tnum text-red-600">({formatKD(r.vacancyLoss)})</td>
                  <td className="px-4 py-3 text-end tnum font-medium text-charcoal">{formatKD(r.collected)}</td>
                  <td className="px-4 py-3 text-end tnum text-charcoal/70">{formatKD(r.maintenance)}</td>
                  <td className="px-4 py-3 text-end tnum text-charcoal/70">{formatKD(r.managementFee)}</td>
                  <td className="px-4 py-3 text-end tnum text-charcoal/70">{formatKD(r.insurance)}</td>
                  <td className="px-4 py-3 text-end tnum text-charcoal/70">{formatKD(r.taxes)}</td>
                  <td className="px-4 py-3 text-end tnum font-semibold text-emerald-700">{formatKD(r.noi)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-border bg-secondary/60 font-medium text-charcoal">
                <td className="px-4 py-3">{t("portfolioTotal")}</td>
                <td className="px-4 py-3 text-end tnum">{formatKD(totals.grossRent)}</td>
                <td className="px-4 py-3 text-end tnum text-red-600">({formatKD(totals.vacancyLoss)})</td>
                <td className="px-4 py-3 text-end tnum">{formatKD(totals.collected)}</td>
                <td className="px-4 py-3 text-end tnum">{formatKD(totals.maintenance)}</td>
                <td className="px-4 py-3 text-end tnum">{formatKD(totals.managementFee)}</td>
                <td className="px-4 py-3 text-end tnum">{formatKD(totals.insurance)}</td>
                <td className="px-4 py-3 text-end tnum">{formatKD(totals.taxes)}</td>
                <td className="px-4 py-3 text-end tnum text-emerald-700">{formatKD(totals.noi)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}

function Summary({ label, value, tone = "text-charcoal", hint }: { label: string; value: string; tone?: string; hint?: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-2 font-serif text-2xl ${tone}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
