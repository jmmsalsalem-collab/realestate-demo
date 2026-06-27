"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export function AskAiButton() {
  const { t } = useI18n();
  return (
    <Link
      href="/ai-assistant"
      aria-label={t("askAi")}
      className="group fixed bottom-6 end-6 z-40 flex items-center gap-2 rounded-full bg-charcoal py-3 ps-4 pe-5 text-sm font-medium text-white shadow-xl transition-all hover:bg-charcoal-light"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-charcoal">
        <Sparkles className="h-3.5 w-3.5" />
      </span>
      {t("askAi")}
    </Link>
  );
}
