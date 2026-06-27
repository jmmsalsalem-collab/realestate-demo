import { maintenance } from "@/lib/data";
import { formatDate } from "@/lib/utils";
import { PageHeader } from "@/components/page-header";
import { StatusBadge } from "@/components/status-badge";

export default function MaintenancePage() {
  const open = maintenance.filter((m) => m.status === "Open").length;
  const inProgress = maintenance.filter(
    (m) => m.status === "In Progress"
  ).length;
  const urgent = maintenance.filter(
    (m) => m.priority === "Urgent" && m.status !== "Resolved"
  ).length;
  const resolved = maintenance.filter((m) => m.status === "Resolved").length;

  // Open/in-progress first, then by recency.
  const ordered = [...maintenance].sort((a, b) => {
    const rank = (s: string) => (s === "Resolved" ? 1 : 0);
    if (rank(a.status) !== rank(b.status)) return rank(a.status) - rank(b.status);
    return b.opened.localeCompare(a.opened);
  });

  return (
    <>
      <PageHeader
        title="Maintenance"
        subtitle={`${maintenance.length} requests · ${
          open + inProgress
        } open`}
      />

      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Stat label="Open" value={open} tone="text-red-600" />
        <Stat label="In Progress" value={inProgress} tone="text-amber-700" />
        <Stat label="Urgent" value={urgent} tone="text-red-600" />
        <Stat label="Resolved" value={resolved} tone="text-emerald-700" />
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-4 py-3 font-medium">Ticket</th>
                <th className="px-4 py-3 font-medium">Property / Unit</th>
                <th className="px-4 py-3 font-medium">Tenant</th>
                <th className="px-4 py-3 font-medium">Issue</th>
                <th className="px-4 py-3 font-medium">Priority</th>
                <th className="px-4 py-3 font-medium">Assigned To</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Opened</th>
                <th className="px-4 py-3 font-medium">Resolved</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {ordered.map((m) => (
                <tr key={m.id} className="hover:bg-secondary/40">
                  <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                    {m.id}
                  </td>
                  <td className="px-4 py-3">
                    <p className="text-charcoal">{m.propertyName}</p>
                    <p className="text-xs text-muted-foreground">{m.unit}</p>
                  </td>
                  <td className="px-4 py-3 text-charcoal/80">{m.tenant}</td>
                  <td className="px-4 py-3 max-w-xs text-charcoal/90">
                    {m.issue}
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge label={m.priority} />
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">{m.assignedTo}</td>
                  <td className="px-4 py-3">
                    <StatusBadge label={m.status} />
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">
                    {formatDate(m.opened)}
                  </td>
                  <td className="px-4 py-3 text-charcoal/70">
                    {m.resolved ? formatDate(m.resolved) : "—"}
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
