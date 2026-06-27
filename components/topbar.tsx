"use client";

import { useI18n } from "@/lib/i18n";
import { LanguageToggle } from "@/components/language-toggle";

export function Topbar() {
  const { t } = useI18n();
  return (
    <header className="sticky top-0 z-20 hidden h-16 items-center justify-between border-b border-border bg-background/90 px-8 backdrop-blur lg:flex">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
        {t("brandTagline")}
      </p>
      <LanguageToggle />
    </header>
  );
}
