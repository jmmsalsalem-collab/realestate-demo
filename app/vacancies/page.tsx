"use client";

import Link from "next/link";
import { vacancies } from "@/lib/data";
import { daysSince, formatKD } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { tUnit, tVacancy } from "@/lib/labels";
import { PageHeader } from "@/components/page-header";
import { StatusBadge, statusTone } from "@/components/status-badge";
import { Button } from "@/components/ui/button";

export default function VacanciesPage() {
  const { t, lang } = useI18n();
  const lostRent = vacancies.reduce((s, v) => s + v.rent, 0);
  const avgDays = Math.round(
    vacancies.reduce((s, v) => s + daysSince(v.vacantSince), 0) / (vacancies.length || 1)
  );

  return (
    <>
      <PageHeader
        title={t("nav_vacancies")}
        subtitle={`${vacancies.length} ${t("vacantUnitsN")} · ${formatKD(lostRent)} ${t("potentialRent")}`}
      >
        <Button variant="gold" size="sm">{t("listUnit")}</Button>
      </PageHeader>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat label={t("vacantUnits")} value={String(vacancies.length)} />
        <Stat label={t("monthlyVacancyLoss")} value={formatKD(lostRent)} />
        <Stat label={t("avgDaysVacant")} value={`${avgDays} ${t("days")}`} />
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 text-start font-medium">{t("property")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("unit")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("type")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("askingRent")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("daysVacant")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("lastTenant")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("status")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("action")}</th>
              </tr>
            </thead>
            <tbody>
              {vacancies.map((v, i) => {
                const days = daysSince(v.vacantSince);
                return (
                  <tr key={`${v.propertyId}-${v.unit}`} className={`border-b border-border ${i % 2 ? "bg-secondary/40" : ""}`}>
                    <td className="px-4 py-3">
                      <Link href={`/properties/${v.propertyId}`} className="font-medium text-charcoal hover:text-gold-dark">
                        {v.propertyName[lang]}
                      </Link>
                      <p className="text-xs text-muted-foreground">{v.area[lang]}</p>
                    </td>
                    <td className="px-4 py-3 text-charcoal/80">{v.unit}</td>
                    <td className="px-4 py-3 text-charcoal/80">{tUnit(t, v.unitType)}</td>
                    <td className="px-4 py-3 text-end tnum font-medium text-charcoal">{formatKD(v.rent)}</td>
                    <td className={`px-4 py-3 text-end tnum font-medium ${days > 60 ? "text-red-600" : "text-charcoal/80"}`}>{days}</td>
                    <td className="px-4 py-3 text-charcoal/70">{v.lastTenant[lang]}</td>
                    <td className="px-4 py-3">
                      <StatusBadge label={tVacancy(t, v.vacancyStatus)} tone={statusTone(v.vacancyStatus)} />
                    </td>
                    <td className="px-4 py-3 text-end">
                      <Button variant="outline" size="sm">{t("listUnit")}</Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 font-serif text-2xl text-charcoal">{value}</p>
    </div>
  );
}
