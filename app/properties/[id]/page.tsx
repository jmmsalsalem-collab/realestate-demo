import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Building2, MapPin, User } from "lucide-react";
import {
  getProperty,
  maintenanceForProperty,
  properties,
  propertyFinancials,
  propertyStats,
} from "@/lib/data";
import { formatCurrency, formatDate, formatPercent } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { StatusBadge } from "@/components/status-badge";

export function generateStaticParams() {
  return properties.map((p) => ({ id: p.id }));
}

function tenantHref(propertyId: string, unit: string) {
  return `/tenants/${`${propertyId}-${unit}`
    .toLowerCase()
    .replace(/\s+/g, "-")}`;
}

export default function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const property = getProperty(params.id);
  if (!property) notFound();

  const stats = propertyStats(property);
  const fin = propertyFinancials(property);
  const tickets = maintenanceForProperty(property.id);

  return (
    <>
      <Link
        href="/properties"
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-charcoal"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Properties
      </Link>

      <PageHeader title={property.name}>
        <Badge variant="gold">{property.type}</Badge>
      </PageHeader>

      {/* Hero + summary */}
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div
          className="relative flex min-h-[220px] items-end overflow-hidden rounded-lg p-6"
          style={{ background: property.gradient }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="relative text-white">
            <p className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4" />
              {property.address}, {property.city}, {property.state}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
              <Building2 className="h-4 w-4" /> Built {property.yearBuilt}
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
              <User className="h-4 w-4" /> Manager: {property.manager}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { label: "Units", value: String(stats.unitsTotal) },
            {
              label: "Occupancy",
              value: formatPercent(stats.occupancyRate),
            },
            { label: "Occupied", value: String(stats.unitsOccupied) },
            { label: "Vacant", value: String(stats.unitsVacant) },
            {
              label: "Monthly Revenue",
              value: formatCurrency(stats.monthlyRevenue),
            },
            {
              label: "Vacancy Loss",
              value: formatCurrency(stats.vacancyLoss),
            },
          ].map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-border bg-card p-4"
            >
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                {m.label}
              </p>
              <p className="mt-1 font-serif text-xl text-charcoal">
                {m.value}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Units */}
      <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="border-b border-border px-6 py-4">
          <h2 className="font-serif text-lg text-charcoal">Unit Roster</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Tenant</th>
                <th className="px-4 py-3 font-medium">Lease</th>
                <th className="px-4 py-3 font-medium text-right">Rent</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {property.units.map((u) => (
                <tr key={u.number} className="hover:bg-secondary/40">
                  <td className="px-4 py-3 font-medium text-charcoal">
                    {u.number}
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">{u.unitType}</td>
                  <td className="px-4 py-3">
                    {u.occupied ? (
                      <Link
                        href={tenantHref(property.id, u.number)}
                        className="text-charcoal hover:text-gold-dark"
                      >
                        {u.tenantName}
                      </Link>
                    ) : (
                      <span className="text-muted-foreground">Vacant</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">
                    {u.occupied
                      ? `${formatDate(u.leaseStart!)} – ${formatDate(
                          u.leaseEnd!
                        )}`
                      : `Since ${formatDate(u.vacantSince!)}`}
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-charcoal">
                    {formatCurrency(u.rent)}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge
                      label={
                        u.occupied
                          ? u.tenantStatus!
                          : u.vacancyStatus ?? "Available"
                      }
                    />
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
          <h2 className="mb-4 font-serif text-lg text-charcoal">
            Monthly Financials
          </h2>
          <dl className="space-y-3 text-sm">
            <Row label="Gross Potential Rent" value={fin.grossRent} />
            <Row label="Vacancy Loss" value={-fin.vacancyLoss} muted />
            <Row label="Collected Rent" value={fin.collected} strong />
            <div className="my-2 border-t border-border" />
            <Row label="Maintenance" value={-fin.maintenance} muted />
            <Row label="Management Fee (8%)" value={-fin.managementFee} muted />
            <Row label="Insurance" value={-fin.insurance} muted />
            <Row label="Property Taxes" value={-fin.taxes} muted />
            <div className="my-2 border-t border-border" />
            <div className="flex items-center justify-between rounded-md bg-gold-light px-3 py-2.5">
              <span className="font-medium text-gold-dark">
                Net Operating Income
              </span>
              <span className="font-serif text-lg text-charcoal">
                {formatCurrency(fin.noi)}
              </span>
            </div>
          </dl>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 shadow-sm">
          <h2 className="mb-4 font-serif text-lg text-charcoal">
            Maintenance Requests
          </h2>
          {tickets.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No maintenance requests on record.
            </p>
          ) : (
            <ul className="space-y-3">
              {tickets.map((t) => (
                <li
                  key={t.id}
                  className="flex flex-wrap items-center gap-2 border-b border-border pb-3 text-sm last:border-0"
                >
                  <span className="font-mono text-xs text-muted-foreground">
                    {t.id}
                  </span>
                  <span className="flex-1 text-charcoal">{t.issue}</span>
                  <span className="text-xs text-muted-foreground">
                    {t.unit}
                  </span>
                  <StatusBadge label={t.priority} />
                  <StatusBadge label={t.status} />
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
  return (
    <div className="flex items-center justify-between">
      <span className={muted ? "text-muted-foreground" : "text-charcoal/80"}>
        {label}
      </span>
      <span
        className={
          strong
            ? "font-semibold text-charcoal"
            : value < 0
              ? "text-red-600"
              : "text-charcoal"
        }
      >
        {value < 0 ? `(${formatCurrency(Math.abs(value))})` : formatCurrency(value)}
      </span>
    </div>
  );
}
