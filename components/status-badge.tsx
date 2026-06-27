import { cn } from "@/lib/utils";

export type Tone = "green" | "amber" | "red" | "blue" | "gray" | "gold";

const TONE: Record<Tone, string> = {
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  amber: "bg-amber-50 text-amber-700 ring-amber-600/20",
  red: "bg-red-50 text-red-700 ring-red-600/20",
  blue: "bg-sky-50 text-sky-700 ring-sky-600/20",
  gray: "bg-secondary text-muted-foreground ring-charcoal/10",
  gold: "bg-gold-light text-gold-dark ring-gold/30",
};

// Map canonical (English) status/priority values to a tone.
const MAP: Record<string, Tone> = {
  Current: "green",
  Late: "red",
  "Notice Given": "amber",
  Vacated: "gray",
  Available: "green",
  Listed: "blue",
  Preparing: "amber",
  Open: "red",
  "In Progress": "amber",
  Resolved: "green",
  Low: "gray",
  Medium: "blue",
  High: "amber",
  Urgent: "red",
  Paid: "green",
  Outstanding: "red",
};

export function statusTone(canonical: string): Tone {
  return MAP[canonical] ?? "gray";
}

export function StatusBadge({
  label,
  tone = "gray",
  className,
}: {
  label: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset",
        TONE[tone],
        className
      )}
    >
      {label}
    </span>
  );
}
