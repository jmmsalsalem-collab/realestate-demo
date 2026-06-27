import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { properties, propertyStats } from "@/lib/data";
import { formatCurrency, formatPercent } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";

export default function PropertiesPage() {
  return (
    <>
      <PageHeader
        title="Properties"
        subtitle={`${properties.length} properties under management`}
      />

      {/* Card grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((p) => {
          const s = propertyStats(p);
          return (
            <Link
              key={p.id}
              href={`/properties/${p.id}`}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className="relative h-32"
                style={{ background: p.gradient }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <Badge variant="gold" className="absolute left-3 top-3">
                  {p.type}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <h3 className="font-serif text-lg text-charcoal">{p.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {p.address}, {p.city}, {p.state}
                </p>

                <div className="mt-4 grid grid-cols-3 gap-2 border-t border-border pt-4 text-center text-sm">
                  <div>
                    <p className="font-serif text-lg text-charcoal">
                      {s.unitsOccupied}
                    </p>
                    <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                      Occupied
                    </p>
                  </div>
                  <div>
                    <p className="font-serif text-lg text-charcoal">
                      {s.unitsVacant}
                    </p>
                    <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                      Vacant
                    </p>
                  </div>
                  <div>
                    <p className="font-serif text-lg text-charcoal">
                      {formatPercent(s.occupancyRate)}
                    </p>
                    <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                      Occ.
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="font-serif text-lg text-charcoal">
                      {formatCurrency(s.monthlyRevenue)}
                    </p>
                    <p className="text-[0.65rem] uppercase tracking-wide text-muted-foreground">
                      Monthly Revenue
                    </p>
                  </div>
                  <span className="flex items-center gap-1 text-sm text-gold-dark group-hover:underline">
                    Details <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
                <p className="mt-3 text-xs text-muted-foreground">
                  Manager: {p.manager}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Full table */}
      <div className="mt-8 overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Property</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium text-right">Units</th>
                <th className="px-4 py-3 font-medium text-right">Occupied</th>
                <th className="px-4 py-3 font-medium text-right">Vacant</th>
                <th className="px-4 py-3 font-medium text-right">
                  Monthly Revenue
                </th>
                <th className="px-4 py-3 font-medium">Manager</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {properties.map((p) => {
                const s = propertyStats(p);
                return (
                  <tr
                    key={p.id}
                    className="transition-colors hover:bg-secondary/40"
                  >
                    <td className="px-4 py-3">
                      <Link
                        href={`/properties/${p.id}`}
                        className="font-medium text-charcoal hover:text-gold-dark"
                      >
                        {p.name}
                      </Link>
                      <p className="text-xs text-muted-foreground">
                        {p.city}, {p.state}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-charcoal/80">{p.type}</td>
                    <td className="px-4 py-3 text-right">{s.unitsTotal}</td>
                    <td className="px-4 py-3 text-right">{s.unitsOccupied}</td>
                    <td className="px-4 py-3 text-right">{s.unitsVacant}</td>
                    <td className="px-4 py-3 text-right font-medium text-charcoal">
                      {formatCurrency(s.monthlyRevenue)}
                    </td>
                    <td className="px-4 py-3 text-charcoal/80">{p.manager}</td>
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
