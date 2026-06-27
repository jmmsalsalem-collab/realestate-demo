import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Kuwaiti Dinar, whole units, "KD" symbol (Latin digits for clarity). */
export function formatKD(value: number): string {
  return `KD ${new Intl.NumberFormat("en-US").format(Math.round(value))}`;
}

/** Compact KD for chart axes, e.g. "KD 28k". */
export function formatKDCompact(value: number): string {
  return `KD ${new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)}`;
}

export function formatCompact(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat("en-US").format(value);
}

export function formatPercent(value: number, digits = 0): string {
  return `${value.toFixed(digits)}%`;
}

export function formatDate(iso: string, lang: "en" | "ar" = "en"): string {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString(lang === "ar" ? "ar-KW" : "en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/** Days between an ISO date and "today" (2026-06-27 reference). */
export function daysSince(iso: string, today = "2026-06-27"): number {
  const a = new Date(iso + "T00:00:00").getTime();
  const b = new Date(today + "T00:00:00").getTime();
  return Math.round((b - a) / 86_400_000);
}

export function daysUntil(iso: string, today = "2026-06-27"): number {
  return -daysSince(iso, today);
}

/** Convert a #rrggbb hex string to an "h s% l%" triple for CSS HSL vars. */
export function hexToHslParts(hex: string): string | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const int = parseInt(m[1], 16);
  const r = ((int >> 16) & 255) / 255;
  const g = ((int >> 8) & 255) / 255;
  const b = (int & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  const l = (max + min) / 2;
  const d = max - min;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  if (d !== 0) {
    switch (max) {
      case r:
        h = ((g - b) / d) % 6;
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      default:
        h = (r - g) / d + 4;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return `${Math.round(h)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%`;
}
