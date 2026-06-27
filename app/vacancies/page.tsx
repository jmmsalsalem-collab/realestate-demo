import Link from "next/link";
import { vacancies } from "@/lib/data";
import { daysSince, formatCurrency } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";

export default function VacanciesPage() {
  const lostRent = vacancies.reduce((s, v) => s + v.rent, 0);
  const avgDays = Math.round(
    vacancies.reduce((s, v) => s + daysSince(v.vacantSince), 0) /
      (vacancies.length || 1)
  );

  return (
    <>
      <PageHeader
        title="Vacancies"
        subtitle={`${vacancies.length} vacant units · ${formatCurrency(
          lostRent
        )}/mo potential rent`}
      >
        <Button variant="gold" size="sm">
          List Unit
        </Button>
      </PageHeader>

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Stat label="Vacant Units" value={String(vacancies.length)} />
        <Stat label="Monthly Vacancy Loss" value={formatCurrency(lostRent)} />
        <Stat label="Avg. Days Vacant" value={`${avgDays} days`} />
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Unit</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium text-right">
                  Asking Rent
                </th>
                <th className="px-4 py-3 font-medium text-right">
                  Days Vacant
                </th>
                <th className="px-4 py-3 font-medium">Last Tenant</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {vacancies.map((v) => {
                const days = daysSince(v.vacantSince);
                return (
                  <tr
                    key={`${v.propertyId}-${v.unit}`}
                    className="hover:bg-secondary/40"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/properties/${v.propertyId}`}
                        className="font-medium text-charcoal hover:text-gold-dark"
                      >
                        {v.propertyName}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {v.city}, {v.state}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-charcoal/80">{v.unit}</td>
                    <td className="px-4 py-3 text-charcoal/80">
                      {v.unitType}
                    </td>
                    <td className="px-4 py-3 text-right font-medium text-charcoal">
                      {formatCurrency(v.rent)}
                    </td>
                    <td
                      className={`px-4 py-3 text-right font-medium ${
                        days > 60 ? "text-red-600" : "text-charcoal/80"
                      }`}
                    >
                      {days}
                    </td>
                    <td className="px-4 py-3 text-charcoal/70">
                      {v.lastTenant}
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge label={v.vacancyStatus} />
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="outline" size="sm">
                        List Unit
                      </Button>
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
      <p className="text-xs uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-serif text-2xl text-charcoal">{value}</p>
    </div>
  );
}
