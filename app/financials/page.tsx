"use client";

import { useMemo, useState } from "react";
import { properties, propertyFinancials } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PERIODS = {
  month: { label: "This Month", months: 1 },
  quarter: { label: "This Quarter", months: 3 },
  year: { label: "This Year", months: 12 },
} as const;

type PeriodKey = keyof typeof PERIODS;

export default function FinancialsPage() {
  const [period, setPeriod] = useState<PeriodKey>("month");
  const months = PERIODS[period].months;

  const rows = useMemo(
    () =>
      properties.map((p) => ({
        id: p.id,
        name: p.name,
        type: p.type,
        ...propertyFinancials(p, months),
      })),
    [months]
  );

  const totals = useMemo(
    () =>
      rows.reduce(
        (acc, r) => ({
          grossRent: acc.grossRent + r.grossRent,
          vacancyLoss: acc.vacancyLoss + r.vacancyLoss,
          collected: acc.collected + r.collected,
          maintenance: acc.maintenance + r.maintenance,
          managementFee: acc.managementFee + r.managementFee,
          insurance: acc.insurance + r.insurance,
          taxes: acc.taxes + r.taxes,
          operatingExpenses: acc.operatingExpenses + r.operatingExpenses,
          noi: acc.noi + r.noi,
        }),
        {
          grossRent: 0,
          vacancyLoss: 0,
          collected: 0,
          maintenance: 0,
          managementFee: 0,
          insurance: 0,
          taxes: 0,
          operatingExpenses: 0,
          noi: 0,
        }
      ),
    [rows]
  );

  const margin = totals.collected
    ? (totals.noi / totals.collected) * 100
    : 0;

  return (
    <>
      <PageHeader
        title="Financials"
        subtitle="Profit & loss by property and portfolio"
      >
        <Select value={period} onValueChange={(v) => setPeriod(v as PeriodKey)}>
          <SelectTrigger className="w-44">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(PERIODS).map(([key, p]) => (
              <SelectItem key={key} value={key}>
                {p.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </PageHeader>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <Summary label="Collected Rent" value={formatCurrency(totals.collected)} />
        <Summary
          label="Vacancy Loss"
          value={formatCurrency(totals.vacancyLoss)}
          tone="text-red-600"
        />
        <Summary
          label="Operating Expenses"
          value={formatCurrency(totals.operatingExpenses)}
          tone="text-red-600"
        />
        <Summary
          label="Net Operating Income"
          value={formatCurrency(totals.noi)}
          tone="text-emerald-700"
          hint={`${margin.toFixed(1)}% NOI margin`}
        />
      </div>

      {/* P&L table */}
      <div className="mt-6 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-serif text-lg text-charcoal">
            P&amp;L by Property · {PERIODS[period].label}
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium text-right">Gross Rent</th>
                <th className="px-4 py-3 font-medium text-right">
                  Vacancy Loss
                </th>
                <th className="px-4 py-3 font-medium text-right">Collected</th>
                <th className="px-4 py-3 font-medium text-right">Maint.</th>
                <th className="px-4 py-3 font-medium text-right">Mgmt Fee</th>
                <th className="px-4 py-3 font-medium text-right">Insurance</th>
                <th className="px-4 py-3 font-medium text-right">Taxes</th>
                <th className="px-4 py-3 font-medium text-right">NOI</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((r) => (
                <tr key={r.id} className="hover:bg-secondary/40">
                  <td className="px-4 py-3">
                    <p className="font-medium text-charcoal">{r.name}</p>
                    <p className="text-xs text-muted-foreground">{r.type}</p>
                  </td>
                  <td className="px-4 py-3 text-right text-charcoal">
                    {formatCurrency(r.grossRent)}
                  </td>
                  <td className="px-4 py-3 text-right text-red-600">
                    ({formatCurrency(r.vacancyLoss)})
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-charcoal">
                    {formatCurrency(r.collected)}
                  </td>
                  <td className="px-4 py-3 text-right text-charcoal/70">
                    {formatCurrency(r.maintenance)}
                  </td>
                  <td className="px-4 py-3 text-right text-charcoal/70">
                    {formatCurrency(r.managementFee)}
                  </td>
                  <td className="px-4 py-3 text-right text-charcoal/70">
                    {formatCurrency(r.insurance)}
                  </td>
                  <td className="px-4 py-3 text-right text-charcoal/70">
                    {formatCurrency(r.taxes)}
                  </td>
                  <td className="px-4 py-3 text-right font-semibold text-emerald-700">
                    {formatCurrency(r.noi)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-border bg-secondary/40 font-medium text-charcoal">
                <td className="px-4 py-3">Portfolio Total</td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(totals.grossRent)}
                </td>
                <td className="px-4 py-3 text-right text-red-600">
                  ({formatCurrency(totals.vacancyLoss)})
                </td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(totals.collected)}
                </td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(totals.maintenance)}
                </td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(totals.managementFee)}
                </td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(totals.insurance)}
                </td>
                <td className="px-4 py-3 text-right">
                  {formatCurrency(totals.taxes)}
                </td>
                <td className="px-4 py-3 text-right text-emerald-700">
                  {formatCurrency(totals.noi)}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}

function Summary({
  label,
  value,
  tone = "text-charcoal",
  hint,
}: {
  label: string;
  value: string;
  tone?: string;
  hint?: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className={`mt-2 font-serif text-2xl ${tone}`}>{value}</p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}
