"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { properties, propertyStats } from "@/lib/data";
import { formatKD, formatPercent } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { tType } from "@/lib/labels";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";

export default function PropertiesPage() {
  const { t, lang } = useI18n();
  const Chevron = lang === "ar" ? ChevronLeft : ChevronRight;

  return (
    <>
      <PageHeader
        title={t("nav_properties")}
        subtitle={`${properties.length} ${t("propertiesSubtitleN")}`}
      />

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((p) => {
          const s = propertyStats(p);
          return (
            <Link
              key={p.id}
              href={`/properties/${p.id}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <div className="relative h-32" style={{ background: p.gradient }}>
                <Badge variant="gold" className="absolute start-3 top-3">
                  {tType(t, p.type)}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-lg font-semibold text-charcoal">
                  {p.name[lang]}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {p.block[lang]}, {p.area[lang]}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center text-sm">
                  <div>
                    <p className="font-serif text-lg text-charcoal">{s.unitsOccupied}</p>
                    <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">{t("occupied")}</p>
                  </div>
                  <div>
                    <p className="font-serif text-lg text-charcoal">{s.unitsVacant}</p>
                    <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">{t("vacant")}</p>
                  </div>
                  <div>
                    <p className="font-serif text-lg text-charcoal">{formatPercent(s.occupancyRate)}</p>
                    <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">{t("occ")}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="tnum text-lg text-charcoal">{formatKD(s.monthlyRevenue)}</p>
                    <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">{t("perMonthShort")}</p>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-gold-dark group-hover:underline">
                    {t("details")} <Chevron className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  {t("manager")}: {p.manager[lang]}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-start text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 text-start font-medium">{t("property")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("type")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("units")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("occupied")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("vacant")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("monthlyRevenue")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("manager")}</th>
              </tr>
            </thead>
            <tbody>
              {properties.map((p, i) => {
                const s = propertyStats(p);
                return (
                  <tr key={p.id} className={`border-b border-border ${i % 2 ? "bg-secondary/40" : ""}`}>
                    <td className="px-4 py-3">
                      <Link href={`/properties/${p.id}`} className="font-medium text-charcoal hover:text-gold-dark">
                        {p.name[lang]}
                      </Link>
                      <p className="text-xs text-muted-foreground">{p.area[lang]}</p>
                    </td>
                    <td className="px-4 py-3 text-charcoal/80">{tType(t, p.type)}</td>
                    <td className="px-4 py-3 text-end tnum">{s.unitsTotal}</td>
                    <td className="px-4 py-3 text-end tnum">{s.unitsOccupied}</td>
                    <td className="px-4 py-3 text-end tnum">{s.unitsVacant}</td>
                    <td className="px-4 py-3 text-end tnum font-medium text-charcoal">{formatKD(s.monthlyRevenue)}</td>
                    <td className="px-4 py-3 text-charcoal/80">{p.manager[lang]}</td>
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
