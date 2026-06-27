import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  FileText,
  Mail,
  MessageSquare,
  Phone,
  Smartphone,
} from "lucide-react";
import {
  getTenant,
  tenants,
  tenantCommLog,
  tenantDocs,
  tenantPayments,
} from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";

export function generateStaticParams() {
  return tenants.map((t) => ({ id: t.id }));
}

const CHANNEL_ICON = {
  Email: Mail,
  Phone: Phone,
  SMS: Smartphone,
  Portal: MessageSquare,
};

export default function TenantProfilePage({
  params,
}: {
  params: { id: string };
}) {
  const tenant = getTenant(params.id);
  if (!tenant) notFound();

  const payments = tenantPayments(tenant);
  const docs = tenantDocs(tenant);
  const comms = tenantCommLog(tenant);
  const paidYtd = payments
    .filter((p) => p.status !== "Outstanding")
    .reduce((s, p) => s + p.amount, 0);

  return (
    <>
      <Link
        href="/tenants"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-charcoal"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Tenants
      </Link>

      <PageHeader
        title={tenant.name}
        subtitle={`${tenant.propertyName} · Unit ${tenant.unit}`}
      >
        <StatusBadge label={tenant.status} />
      </PageHeader>

      {/* Summary */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: "Monthly Rent", value: formatCurrency(tenant.rent) },
          {
            label: "Balance Owed",
            value:
              tenant.balanceOwed > 0
                ? formatCurrency(tenant.balanceOwed)
                : "$0",
            danger: tenant.balanceOwed > 0,
          },
          { label: "Lease Start", value: formatDate(tenant.leaseStart) },
          { label: "Lease End", value: formatDate(tenant.leaseEnd) },
        ].map((m) => (
          <div
            key={m.label}
            className="rounded-lg border border-border bg-card p-4"
          >
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              {m.label}
            </p>
            <p
              className={`mt-1 font-serif text-xl ${
                m.danger ? "text-red-600" : "text-charcoal"
              }`}
            >
              {m.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* Payment history */}
        <div className="rounded-lg border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-6 py-4">
            <h2 className="font-serif text-lg text-charcoal">
              Payment History
            </h2>
            <span className="text-sm text-muted-foreground">
              {formatCurrency(paidYtd)} collected YTD
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="px-6 py-3 font-medium">Period</th>
                  <th className="px-6 py-3 font-medium">Date</th>
                  <th className="px-6 py-3 font-medium text-right">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {[...payments].reverse().map((p) => (
                  <tr key={p.month} className="hover:bg-secondary/40">
                    <td className="px-6 py-3 text-charcoal">{p.month}</td>
                    <td className="px-6 py-3 text-charcoal/70">
                      {formatDate(p.date)}
                    </td>
                    <td className="px-6 py-3 text-right font-medium text-charcoal">
                      {formatCurrency(p.amount)}
                    </td>
                    <td className="px-6 py-3">
                      <StatusBadge label={p.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Docs + comms */}
        <div className="space-y-6">
          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-serif text-lg text-charcoal">
              Lease Documents
            </h2>
            <ul className="space-y-2">
              {docs.map((d) => (
                <li
                  key={d.name}
                  className="flex items-center gap-3 rounded-md border border-border px-3 py-2.5 text-sm"
                >
                  <FileText className="h-4 w-4 shrink-0 text-gold-dark" />
                  <span className="flex-1 truncate text-charcoal/80">
                    {d.name}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(d.date)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-serif text-lg text-charcoal">
              Communication Log
            </h2>
            <ul className="space-y-4">
              {comms.map((c, i) => {
                const Icon = CHANNEL_ICON[c.channel];
                return (
                  <li key={i} className="flex gap-3">
                    <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-secondary text-gold-dark">
                      <Icon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-sm text-charcoal/90">{c.summary}</p>
                      <p className="text-xs text-muted-foreground">
                        {c.channel} · {formatDate(c.date)}
                      </p>
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
