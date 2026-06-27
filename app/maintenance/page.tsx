"use client";

import { maintenance } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { tPriority, tTicket } from "@/lib/labels";
import { PageHeader } from "@/components/page-header";
import { StatusBadge, statusTone } from "@/components/status-badge";

export default function MaintenancePage() {
  const { t, lang } = useI18n();
  const open = maintenance.filter((m) => m.status === "Open").length;
  const inProgress = maintenance.filter((m) => m.status === "In Progress").length;
  const urgent = maintenance.filter((m) => m.priority === "Urgent" && m.status !== "Resolved").length;
  const resolved = maintenance.filter((m) => m.status === "Resolved").length;

  const ordered = [...maintenance].sort((a, b) => {
    const rank = (s: string) => (s === "Resolved" ? 1 : 0);
    if (rank(a.status) !== rank(b.status)) return rank(a.status) - rank(b.status);
    return b.opened.localeCompare(a.opened);
  });

  return (
    <>
      <PageHeader title={t("nav_maintenance")} subtitle={`${maintenance.length} ${t("requests")} · ${open + inProgress} ${t("openLabel")}`} />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label={t("mt_open")} value={open} tone="text-red-600" />
        <Stat label={t("mt_inprogress")} value={inProgress} tone="text-amber-700" />
        <Stat label={t("urgentLabel")} value={urgent} tone="text-red-600" />
        <Stat label={t("mt_resolved")} value={resolved} tone="text-emerald-700" />
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 text-start font-medium">{t("ticket")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("propertyUnit")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("tenant")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("issue")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("priority")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("assignedTo")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("status")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("opened")}</th>
                <th className="px-4 py-3 text-start font-medium">{t("resolved")}</th>
              </tr>
            </thead>
            <tbody>
              {ordered.map((m, i) => (
                <tr key={m.id} className={`border-b border-border ${i % 2 ? "bg-secondary/40" : ""}`}>
                  <td className="px-4 py-3 tnum text-xs text-muted-foreground">{m.id}</td>
                  <td className="px-4 py-3">
                    <p className="text-charcoal">{m.propertyName[lang]}</p>
                    <p className="text-xs text-muted-foreground">{m.unit}</p>
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">{m.tenant[lang]}</td>
                  <td className="px-4 py-3 max-w-xs text-charcoal/90">{m.issue[lang]}</td>
                  <td className="px-4 py-3"><StatusBadge label={tPriority(t, m.priority)} tone={statusTone(m.priority)} /></td>
                  <td className="px-4 py-3 text-charcoal/70">{m.assignedTo[lang]}</td>
                  <td className="px-4 py-3"><StatusBadge label={tTicket(t, m.status)} tone={statusTone(m.status)} /></td>
                  <td className="px-4 py-3 text-charcoal/70">{formatDate(m.opened, lang)}</td>
                  <td className="px-4 py-3 text-charcoal/70">{m.resolved ? formatDate(m.resolved, lang) : "—"}</td>
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
