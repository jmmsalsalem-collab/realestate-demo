"use client";

import { useI18n } from "@/lib/i18n";
import { cn } from "@/lib/utils";

export function LanguageToggle({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useI18n();

  const base = "px-2.5 py-1 text-xs font-medium transition-colors rounded-md";
  const activeCls = dark
    ? "bg-gold text-charcoal"
    : "bg-charcoal text-white";
  const idleCls = dark
    ? "text-white/60 hover:text-white"
    : "text-charcoal/50 hover:text-charcoal";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-lg p-0.5",
        dark ? "bg-white/10" : "bg-secondary"
      )}
      dir="ltr"
    >
      <button
        onClick={() => setLang("en")}
        className={cn(base, lang === "en" ? activeCls : idleCls)}
        aria-pressed={lang === "en"}
      >
        EN
      </button>
      <button
        onClick={() => setLang("ar")}
        className={cn(base, lang === "ar" ? activeCls : idleCls, "font-cairo")}
        aria-pressed={lang === "ar"}
        style={{ fontFamily: "var(--font-cairo), sans-serif" }}
      >
        عربي
      </button>
    </div>
  );
}
