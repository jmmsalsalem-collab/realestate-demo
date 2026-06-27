"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";

export function AskAiButton() {
  return (
    <Link
      href="/ai-assistant"
      aria-label="Ask the AI assistant"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-charcoal py-3 pl-4 pr-5 text-sm font-medium text-white shadow-xl transition-all hover:bg-charcoal-light"
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-charcoal">
        <Sparkles className="h-3.5 w-3.5" />
      </span>
      Ask AI
    </Link>
  );
}
