"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Smartphone,
} from "lucide-react";
import {
  getTenant,
  tenantCommLog,
  tenantDocs,
  tenantPayments,
} from "@/lib/data";
import { formatKD, formatDate } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { tChannel, tPayment, tTenantStatus } from "@/lib/labels";
import { PageHeader } from "@/components/page-header";
import { StatusBadge, statusTone } from "@/components/status-badge";

const CHANNEL_ICON = { Email: Mail, Phone: Phone, SMS: Smartphone, Portal: MessageSquare };

export default function TenantProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const { t, lang } = useI18n();
  const tenant = getTenant(params.id);
  if (!tenant) notFound();

  const payments = tenantPayments(tenant);
  const docs = tenantDocs(tenant);
  const comms = tenantCommLog(tenant);
  const paidYtd = payments.filter((p) => p.status !== "Outstanding").reduce((s, p) => s + p.amount, 0);
  const Back = lang === "ar" ? ArrowRight : ArrowLeft;

  return (
    <>
      <Link href="/tenants" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-charcoal">
        <Back className="h-4 w-4" /> {t("backToTenants")}
      </Link>

      <PageHeader
        title={tenant.name[lang]}
        subtitle={`${tenant.propertyName[lang]} · ${t("unit")} ${tenant.unit}`}
      >
        <StatusBadge label={tTenantStatus(t, tenant.status)} tone={statusTone(tenant.status)} />
      </PageHeader>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: t("monthlyRent"), value: formatKD(tenant.rent) },
          { label: t("balanceOwed"), value: tenant.balanceOwed > 0 ? formatKD(tenant.balanceOwed) : formatKD(0), danger: tenant.balanceOwed > 0 },
          { label: t("leaseStart"), value: formatDate(tenant.leaseStart, lang) },
          { label: t("leaseEnd"), value: formatDate(tenant.leaseEnd, lang) },
        ].map((m) => (
          <div key={m.label} className="rounded-lg border border-border bg-card p-4">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">{m.label}</p>
            <p className={`mt-1 font-serif text-xl ${m.danger ? "text-red-600" : "text-charcoal"}`}>{m.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="rounded-lg border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="text-lg text-charcoal">{t("paymentHistory")}</h2>
            <span className="text-sm text-muted-foreground">{formatKD(paidYtd)} {t("collectedYtd")}</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3 text-start font-medium">{t("period")}</th>
                  <th className="px-6 py-3 text-start font-medium">{t("date")}</th>
                  <th className="px-6 py-3 text-end font-medium">{t("amount")}</th>
                  <th className="px-6 py-3 text-start font-medium">{t("status")}</th>
                </tr>
              </thead>
              <tbody>
                {[...payments].reverse().map((p, i) => (
                  <tr key={p.month.en} className={`border-b border-border ${i % 2 ? "bg-secondary/40" : ""}`}>
                    <td className="px-6 py-3 text-charcoal">{p.month[lang]}</td>
                    <td className="px-6 py-3 text-charcoal/70">{formatDate(p.date, lang)}</td>
                    <td className="px-6 py-3 text-end tnum font-medium text-charcoal">{formatKD(p.amount)}</td>
                    <td className="px-6 py-3">
                      <StatusBadge label={tPayment(t, p.status)} tone={statusTone(p.status)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg text-charcoal">{t("leaseDocuments")}</h2>
            <ul className="space-y-2">
              {docs.map((d) => (
                <li key={d.name.en} className="flex items-center gap-3 rounded-md border border-border px-3 py-2.5 text-sm">
                  <FileText className="h-4 w-4 shrink-0 text-gold-dark" />
                  <span className="flex-1 truncate text-charcoal/80">{d.name[lang]}</span>
                  <span className="text-xs text-muted-foreground">{formatDate(d.date, lang)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 text-lg text-charcoal">{t("communicationLog")}</h2>
            <ul className="space-y-4">
              {comms.map((c, i) => {
                const Icon = CHANNEL_ICON[c.channel];
                return (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-gold-dark">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-sm text-charcoal/90">{c.summary[lang]}</p>
                      <p className="text-xs text-muted-foreground">{tChannel(t, c.channel)} · {formatDate(c.date, lang)}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
