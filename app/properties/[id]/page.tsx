"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Building2, MapPin, User } from "lucide-react";
import {
  getProperty,
  maintenanceForProperty,
  propertyFinancials,
  propertyStats,
} from "@/lib/data";
import { formatKD, formatDate, formatPercent } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { tPriority, tTenantStatus, tTicket, tType, tUnit, tVacancy } from "@/lib/labels";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { StatusBadge, statusTone } from "@/components/status-badge";

function tenantHref(propertyId: string, unit: string) {
  return `/tenants/${`${propertyId}-${unit}`.toLowerCase().replace(/\s+/g, "-")}`;
}

export default function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { t, lang } = useI18n();
  const property = getProperty(params.id);
  if (!property) notFound();

  const stats = propertyStats(property);
  const fin = propertyFinancials(property);
  const tickets = maintenanceForProperty(property.id);
  const Back = lang === "ar" ? ArrowRight : ArrowLeft;

  return (
    <>
      <Link href="/properties" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-charcoal">
        <Back className="h-4 w-4" /> {t("backToProperties")}
      </Link>

      <PageHeader title={property.name[lang]}>
        <Badge variant="gold">{tType(t, property.type)}</Badge>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="relative flex min-h-[220px] items-end overflow-hidden rounded-lg p-6" style={{ background: property.gradient }}>
          <div className="relative text-white">
            <p className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              {property.block[lang]}, {property.area[lang]}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
              <Building2 className="h-4 w-4" /> {t("built")} {property.yearBuilt}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
              <User className="h-4 w-4" /> {t("manager")}: {property.manager[lang]}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: t("units"), value: String(stats.unitsTotal) },
            { label: t("occupancyRate"), value: formatPercent(stats.occupancyRate) },
            { label: t("occupied"), value: String(stats.unitsOccupied) },
            { label: t("vacant"), value: String(stats.unitsVacant) },
            { label: t("monthlyRevenue"), value: formatKD(stats.monthlyRevenue) },
            { label: t("vacancyLoss"), value: formatKD(stats.vacancyLoss) },
          ].map((m) => (
            <div key={m.label} className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{m.label}</p>
              <p className="mt-1 font-serif text-xl text-charcoal">{m.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Units */}
      <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="text-lg text-charcoal">{t("unitRoster")}</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 text-start font-medium">{t("unit")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("type")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("tenant")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("lease")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("rent")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("status")}</th>
              </tr>
            </thead>
            <tbody>
              {property.units.map((u, i) => (
                <tr key={u.number} className={`border-b border-border ${i % 2 ? "bg-secondary/40" : ""}`}>
                  <td className="px-4 py-3 font-medium text-charcoal">{u.number}</td>
                  <td className="px-4 py-3 text-charcoal/80">{tUnit(t, u.unitType)}</td>
                  <td className="px-4 py-3">
                    {u.occupied ? (
                      <Link href={tenantHref(property.id, u.number)} className="text-charcoal hover:text-gold-dark">
                        {u.tenantName![lang]}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">{t("vacant")}</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">
                    {u.occupied
                      ? `${formatDate(u.leaseStart!, lang)} – ${formatDate(u.leaseEnd!, lang)}`
                      : `${t("since")} ${formatDate(u.vacantSince!, lang)}`}
                  </td>
                  <td className="px-4 py-3 text-end tnum font-medium text-charcoal">{formatKD(u.rent)}</td>
                  <td className="px-4 py-3">
                    {u.occupied ? (
                      <StatusBadge label={tTenantStatus(t, u.tenantStatus!)} tone={statusTone(u.tenantStatus!)} />
                    ) : (
                      <StatusBadge label={tVacancy(t, u.vacancyStatus ?? "Available")} tone={statusTone(u.vacancyStatus ?? "Available")} />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Financials + maintenance */}
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg text-charcoal">{t("monthlyFinancials")}</h2>
          <dl className="space-y-3 text-sm">
            <Row label={t("grossPotentialRent")} value={fin.grossRent} />
            <Row label={t("vacancyLoss")} value={-fin.vacancyLoss} muted />
            <Row label={t("collectedRent")} value={fin.collected} strong />
            <div className="my-2 border-t border-border" />
            <Row label={t("maintenanceCost")} value={-fin.maintenance} muted />
            <Row label={t("managementFee")} value={-fin.managementFee} muted />
            <Row label={t("insurance")} value={-fin.insurance} muted />
            <Row label={t("propertyTaxes")} value={-fin.taxes} muted />
            <div className="my-2 border-t border-border" />
            <div className="flex items-center justify-between rounded-md bg-gold-light px-3 py-2.5">
              <span className="font-medium text-gold-dark">{t("netOperatingIncome")}</span>
              <span className="tnum text-lg text-charcoal">{formatKD(fin.noi)}</span>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 text-lg text-charcoal">{t("maintenanceRequests")}</h2>
          {tickets.length === 0 ? (
            <p className="text-sm text-muted-foreground">{t("noMaintenance")}</p>
          ) : (
            <ul className="space-y-3">
              {tickets.map((m) => (
                <li key={m.id} className="flex flex-wrap items-center gap-2 border-b border-border pb-3 text-sm last:border-0">
                  <span className="tnum text-xs text-muted-foreground">{m.id}</span>
                  <span className="flex-1 text-charcoal">{m.issue[lang]}</span>
                  <span className="text-xs text-muted-foreground">{m.unit}</span>
                  <StatusBadge label={tPriority(t, m.priority)} tone={statusTone(m.priority)} />
                  <StatusBadge label={tTicket(t, m.status)} tone={statusTone(m.status)} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}

function Row({
  label,
  value,
  muted,
  strong,
}: {
  label: string;
  value: number;
  muted?: boolean;
  strong?: boolean;
}) {
  const neg = value < 0;
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? "text-muted-foreground" : "text-charcoal/80"}>{label}</span>
      <span className={`tnum ${strong ? "font-semibold text-charcoal" : neg ? "text-red-600" : "text-charcoal"}`}>
        {neg ? `(${formatKD(Math.abs(value))})` : formatKD(value)}
      </span>
    </div>
  );
}
