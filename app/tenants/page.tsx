import Link from "next/link";
import { tenants } from "@/lib/data";
import { formatCurrency, formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";

export default function TenantsPage() {
  const current = tenants.filter((t) => t.status === "Current").length;
  const late = tenants.filter((t) => t.status === "Late").length;
  const notice = tenants.filter((t) => t.status === "Notice Given").length;

  return (
    <>
      <PageHeader
        title="Tenants"
        subtitle={`${tenants.length} active tenants`}
      />

      <div className="mb-6 grid grid-cols-3 gap-4">
        <Stat label="Current" value={current} tone="text-emerald-700" />
        <Stat label="Late" value={late} tone="text-red-600" />
        <Stat label="Notice Given" value={notice} tone="text-amber-700" />
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Tenant</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Lease Start</th>
                <th className="px-4 py-3 font-medium">Lease End</th>
                <th className="px-4 py-3 font-medium text-right">Rent</th>
                <th className="px-4 py-3 font-medium text-right">Balance</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {tenants.map((t) => (
                <tr key={t.id} className="hover:bg-secondary/40">
                  <td className="px-4 py-3">
                    <Link
                      href={`/tenants/${t.id}`}
                      className="font-medium text-charcoal hover:text-gold-dark"
                    >
                      {t.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">{t.unit}</td>
                  <td className="px-4 py-3 text-charcoal/80">
                    {t.propertyName}
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">
                    {formatDate(t.leaseStart)}
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">
                    {formatDate(t.leaseEnd)}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-charcoal">
                    {formatCurrency(t.rent)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-medium ${
                      t.balanceOwed > 0 ? "text-red-600" : "text-charcoal/50"
                    }`}
                  >
                    {t.balanceOwed > 0 ? formatCurrency(t.balanceOwed) : "—"}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge label={t.status} />
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

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-4">
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className={`mt-1 font-serif text-2xl ${tone}`}>{value}</p>
    </div>
  );
}
