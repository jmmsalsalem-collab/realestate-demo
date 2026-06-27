"use client";

import { useState } from "react";
import Link from "next/link";
import { Lock, Send, Sparkles } from "lucide-react";
import {
  properties,
  propertyFinancials,
  propertyStats,
  tenants,
} from "@/lib/data";
import {
  daysUntil,
  formatCurrency,
  formatPercent,
} from "@/lib/utils";
import { isAiActive } from "@/lib/settings";
import { useSettings } from "@/lib/use-settings";
import { cn } from "@/lib/utils";

// --- Precompute convincing answers from the real dataset -----------------

const occRanked = properties
  .map((p) => ({ name: p.name, ...propertyStats(p) }))
  .sort((a, b) => a.occupancyRate - b.occupancyRate)
  .slice(0, 3);

const overdue = tenants.filter((t) => t.balanceOwed > 0);
const overdueTotal = overdue.reduce((s, t) => s + t.balanceOwed, 0);

const expiring = tenants
  .map((t) => ({ ...t, days: daysUntil(t.leaseEnd) }))
  .filter((t) => t.days >= 0 && t.days <= 60)
  .sort((a, b) => a.days - b.days);

const noiQuarter = properties.reduce(
  (s, p) => s + propertyFinancials(p, 3).noi,
  0
);
const noiLastQuarter = Math.round(noiQuarter * 0.94);
const noiDeltaPct = ((noiQuarter - noiLastQuarter) / noiLastQuarter) * 100;

function renewalRisk(status: string): { label: string; tone: string } {
  if (status === "Notice Given")
    return { label: "High — notice given", tone: "text-red-600" };
  if (status === "Late")
    return { label: "Elevated — payment issues", tone: "text-amber-700" };
  return { label: "Low — good standing", tone: "text-emerald-700" };
}

interface Msg {
  role: "user" | "assistant";
  content: React.ReactNode;
}

const DEMO: Msg[] = [
  {
    role: "user",
    content: "Which properties have the lowest occupancy rate?",
  },
  {
    role: "assistant",
    content: (
      <div className="space-y-2">
        <p>
          Here are the three properties with the lowest occupancy right now:
        </p>
        <ol className="space-y-1.5">
          {occRanked.map((p, i) => (
            <li key={p.name} className="flex items-baseline gap-2">
              <span className="font-semibold text-gold-dark">{i + 1}.</span>
              <span className="flex-1">
                <span className="font-medium">{p.name}</span> —{" "}
                {formatPercent(p.occupancyRate)} occupancy ({p.unitsVacant} of{" "}
                {p.unitsTotal} units vacant)
              </span>
            </li>
          ))}
        </ol>
        <p className="text-charcoal/70">
          {occRanked[0].name} is the priority — I&apos;d recommend prioritizing
          turnover and re-listing there to recover the lost rent.
        </p>
      </div>
    ),
  },
  {
    role: "user",
    content: "How much rent is overdue across all properties?",
  },
  {
    role: "assistant",
    content: (
      <div className="space-y-2">
        <p>
          Total outstanding rent across the portfolio is{" "}
          <span className="font-semibold text-red-600">
            {formatCurrency(overdueTotal)}
          </span>{" "}
          from {overdue.length} tenants:
        </p>
        <ul className="space-y-1">
          {overdue.map((t) => (
            <li key={t.id} className="flex justify-between gap-3">
              <span>
                {t.name}{" "}
                <span className="text-charcoal/60">
                  ({t.propertyName} · {t.unit})
                </span>
              </span>
              <span className="font-medium text-red-600">
                {formatCurrency(t.balanceOwed)}
              </span>
            </li>
          ))}
        </ul>
        <p className="text-charcoal/70">
          {overdue[0]?.name} carries the largest balance. Want me to draft
          reminder notices for these accounts?
        </p>
      </div>
    ),
  },
  {
    role: "user",
    content: "Which leases are expiring in the next 60 days?",
  },
  {
    role: "assistant",
    content: (
      <div className="space-y-2">
        <p>
          {expiring.length} leases are expiring within 60 days. Ranked by
          renewal risk:
        </p>
        <ul className="space-y-1.5">
          {expiring.map((t) => {
            const risk = renewalRisk(t.status);
            return (
              <li key={t.id} className="flex flex-wrap items-baseline gap-x-2">
                <span className="font-medium">{t.name}</span>
                <span className="text-charcoal/60">
                  {t.propertyName} · {t.unit}
                </span>
                <span className="text-charcoal/70">· {t.days} days</span>
                <span className={cn("text-xs", risk.tone)}>
                  · {risk.label}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="text-charcoal/70">
          I&apos;d start renewal conversations with the good-standing tenants
          first and prepare turnover plans for the high-risk units.
        </p>
      </div>
    ),
  },
  {
    role: "user",
    content: "What's our NOI compared to last quarter?",
  },
  {
    role: "assistant",
    content: (
      <div className="space-y-2">
        <p>Net Operating Income, quarter over quarter:</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-md border border-border bg-secondary/40 p-3">
            <p className="text-xs uppercase tracking-wide text-muted-foreground">
              Last Quarter
            </p>
            <p className="font-serif text-xl text-charcoal">
              {formatCurrency(noiLastQuarter)}
            </p>
          </div>
          <div className="rounded-md border border-gold/40 bg-gold-light p-3">
            <p className="text-xs uppercase tracking-wide text-gold-dark">
              This Quarter
            </p>
            <p className="font-serif text-xl text-charcoal">
              {formatCurrency(noiQuarter)}
            </p>
          </div>
        </div>
        <p className="text-charcoal/70">
          That&apos;s an increase of{" "}
          <span className="font-semibold text-emerald-700">
            +{noiDeltaPct.toFixed(1)}%
          </span>
          , driven mainly by reduced vacancy loss and stable operating
          expenses across the residential portfolio.
        </p>
      </div>
    ),
  },
];

export default function AiAssistantPage() {
  const { settings, hydrated } = useSettings();
  const active = hydrated && isAiActive(settings);

  const [messages, setMessages] = useState<Msg[]>(DEMO);
  const [input, setInput] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input.trim() },
      {
        role: "assistant",
        content: active ? (
          <p>
            This is a demonstration build, so I&apos;m showing sample answers
            rather than calling the live model. With a connected key, I&apos;d
            analyze your live portfolio data to answer that.
          </p>
        ) : (
          <p>
            Connect your Anthropic API key in{" "}
            <Link href="/settings" className="text-gold-dark underline">
              Settings
            </Link>{" "}
            to activate live responses.
          </p>
        ),
      },
    ]);
    setInput("");
  }

  return (
    <div className="mx-auto max-w-3xl">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal text-gold">
            <Sparkles className="h-6 w-6" />
          </span>
          <div>
            <h1 className="font-serif text-2xl text-charcoal">
              Prestige AI Agent
            </h1>
            <p className="text-sm text-muted-foreground">
              Portfolio intelligence for your team
            </p>
          </div>
        </div>
        {active ? (
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Active · {settings.aiModel}
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
            <Lock className="h-3.5 w-3.5" />
            Add API Key to Activate
          </span>
        )}
      </div>

      {/* Chat */}
      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="space-y-5 p-5 sm:p-6">
          {messages.map((m, i) => (
            <div
              key={i}
              className={cn(
                "flex",
                m.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {m.role === "assistant" && (
                <span className="mr-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-charcoal text-gold">
                  <Sparkles className="h-4 w-4" />
                </span>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  m.role === "user"
                    ? "rounded-br-sm bg-charcoal text-white"
                    : "rounded-bl-sm bg-secondary text-charcoal"
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
        </div>

        {/* Composer */}
        <form
          onSubmit={onSubmit}
          className="flex items-center gap-2 border-t border-border p-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about your portfolio..."
            className="flex-1 rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button
            type="submit"
            className="flex h-10 w-10 items-center justify-center rounded-md bg-gold text-charcoal transition-colors hover:bg-gold-dark hover:text-white"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {/* Banner */}
      {!active && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-gold/40 bg-gold-light px-4 py-3 text-sm text-charcoal">
          <Lock className="h-4 w-4 shrink-0 text-gold-dark" />
          <span>
            Connect your API key in{" "}
            <Link href="/settings" className="font-medium text-gold-dark underline">
              Settings
            </Link>{" "}
            to activate live responses.
          </span>
        </div>
      )}
    </div>
  );
}
