"use client";

import Link from "next/link";
import { tenants } from "@/lib/data";
import { formatKD, formatDate } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { tTenantStatus } from "@/lib/labels";
import { PageHeader } from "@/components/page-header";
import { StatusBadge, statusTone } from "@/components/status-badge";

export default function TenantsPage() {
  const { t, lang } = useI18n();
  const current = tenants.filter((x) => x.status === "Current").length;
  const late = tenants.filter((x) => x.status === "Late").length;
  const notice = tenants.filter((x) => x.status === "Notice Given").length;

  return (
    <>
      <PageHeader title={t("nav_tenants")} subtitle={`${tenants.length} ${t("activeTenants")}`} />

      <div className="mb-6 grid grid-cols-3 gap-4">
        <Stat label={t("tn_current")} value={current} tone="text-emerald-700" />
        <Stat label={t("tn_late")} value={late} tone="text-red-600" />
        <Stat label={t("tn_notice")} value={notice} tone="text-amber-700" />
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 text-start font-medium">{t("tenant")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("unit")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("property")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("leaseStart")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("leaseEnd")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("rent")}</th>
                <th className="px-4 py-3 text-end font-medium">{t("balance")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("status")}</th>
              </tr>
            </thead>
            <tbody>
              {tenants.map((x, i) => (
                <tr key={x.id} className={`border-b border-border ${i % 2 ? "bg-secondary/40" : ""}`}>
                  <td className="px-4 py-3">
                    <Link href={`/tenants/${x.id}`} className="font-medium text-charcoal hover:text-gold-dark">
                      {x.name[lang]}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">{x.unit}</td>
                  <td className="px-4 py-3 text-charcoal/80">{x.propertyName[lang]}</td>
                  <td className="px-4 py-3 text-charcoal/70">{formatDate(x.leaseStart, lang)}</td>
                  <td className="px-4 py-3 text-charcoal/70">{formatDate(x.leaseEnd, lang)}</td>
                  <td className="px-4 py-3 text-end tnum font-medium text-charcoal">{formatKD(x.rent)}</td>
                  <td className={`px-4 py-3 text-end tnum font-medium ${x.balanceOwed > 0 ? "text-red-600" : "text-charcoal/40"}`}>
                    {x.balanceOwed > 0 ? formatKD(x.balanceOwed) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge label={tTenantStatus(t, x.status)} tone={statusTone(x.status)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

function Stat({ label, value, tone }: { label: string; value: number; tone: string }) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className={`mt-1 font-serif text-2xl ${tone}`}>{value}</p>
    </div>
  );
}
