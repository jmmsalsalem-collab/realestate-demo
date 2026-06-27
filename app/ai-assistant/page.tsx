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
import { daysUntil, formatKD, formatPercent, cn } from "@/lib/utils";
import { isAiActive } from "@/lib/settings";
import { useSettings } from "@/lib/use-settings";
import { useI18n } from "@/lib/i18n";

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

const noiQuarter = properties.reduce((s, p) => s + propertyFinancials(p, 3).noi, 0);
const noiLastQuarter = Math.round(noiQuarter * 0.94);
const noiDeltaPct = ((noiQuarter - noiLastQuarter) / noiLastQuarter) * 100;

interface ChatMsg {
  role: "user" | "assistant";
  text: string;
}

export default function AiAssistantPage() {
  const { t, lang } = useI18n();
  const { settings, hydrated } = useSettings();
  const active = hydrated && isAiActive(settings);
  const [convo, setConvo] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  function risk(status: string) {
    if (status === "Notice Given") return { label: t("risk_high"), tone: "text-red-600" };
    if (status === "Late") return { label: t("risk_elevated"), tone: "text-amber-700" };
    return { label: t("risk_low"), tone: "text-emerald-700" };
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q || loading) return;
    const next: ChatMsg[] = [...convo, { role: "user", text: q }];
    setConvo(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: settings.aiModel,
          messages: next.map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      const data = await res.json();
      const text = res.ok && data.text ? data.text : t("aiError");
      setConvo((c) => [...c, { role: "assistant", text }]);
    } catch {
      setConvo((c) => [...c, { role: "assistant", text: t("aiError") }]);
    } finally {
      setLoading(false);
    }
  }

  const demo: { role: "user" | "assistant"; node: React.ReactNode }[] = [
    { role: "user", node: t("q_occupancy") },
    {
      role: "assistant",
      node: (
        <div className="space-y-2">
          <p>{t("a_occ_intro")}</p>
          <ol className="space-y-1.5">
            {occRanked.map((p, i) => (
              <li key={p.name.en} className="flex items-baseline gap-2">
                <span className="font-semibold text-gold-dark">{i + 1}.</span>
                <span className="flex-1">
                  <span className="font-medium">{p.name[lang]}</span> — {formatPercent(p.occupancyRate)} ({p.unitsVacant} {t("a_occ_unitsVacant")})
                </span>
              </li>
            ))}
          </ol>
          <p className="text-charcoal/70">
            <span className="font-medium">{occRanked[0].name[lang]}</span> {t("a_occ_outro")}
          </p>
        </div>
      ),
    },
    { role: "user", node: t("q_overdue") },
    {
      role: "assistant",
      node: (
        <div className="space-y-2">
          <p>
            {t("a_overdue_intro1")} <span className="font-semibold text-red-600">{formatKD(overdueTotal)}</span> {t("a_overdue_intro2")} {overdue.length} {t("a_overdue_tenants")}
          </p>
          <ul className="space-y-1">
            {overdue.map((tn) => (
              <li key={tn.id} className="flex justify-between gap-3">
                <span>{tn.name[lang]} <span className="text-charcoal/60">({tn.propertyName[lang]} · {tn.unit})</span></span>
                <span className="tnum text-red-600">{formatKD(tn.balanceOwed)}</span>
              </li>
            ))}
          </ul>
          <p className="text-charcoal/70"><span className="font-medium">{overdue[0]?.name[lang]}</span> {t("a_overdue_outro")}</p>
        </div>
      ),
    },
    { role: "user", node: t("q_expiring") },
    {
      role: "assistant",
      node: (
        <div className="space-y-2">
          <p>{expiring.length} {t("a_exp_intro1")}</p>
          <ul className="space-y-1.5">
            {expiring.map((tn) => {
              const r = risk(tn.status);
              return (
                <li key={tn.id} className="flex flex-wrap items-baseline gap-x-2">
                  <span className="font-medium">{tn.name[lang]}</span>
                  <span className="text-charcoal/60">{tn.propertyName[lang]} · {tn.unit}</span>
                  <span className="text-charcoal/70">· {tn.days} {t("days")}</span>
                  <span className={cn("text-xs", r.tone)}>· {r.label}</span>
                </li>
              );
            })}
          </ul>
          <p className="text-charcoal/70">{t("a_exp_outro")}</p>
        </div>
      ),
    },
    { role: "user", node: t("q_noi") },
    {
      role: "assistant",
      node: (
        <div className="space-y-2">
          <p>{t("a_noi_intro")}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-md border border-border bg-secondary/50 p-3">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{t("lastQuarter")}</p>
              <p className="font-serif text-xl text-charcoal">{formatKD(noiLastQuarter)}</p>
            </div>
            <div className="rounded-md border border-gold/40 bg-gold-light p-3">
              <p className="text-xs uppercase tracking-wide text-gold-dark">{t("thisQuarter")}</p>
              <p className="font-serif text-xl text-charcoal">{formatKD(noiQuarter)}</p>
            </div>
          </div>
          <p className="text-charcoal/70">{t("a_noi_outro1")} <span className="font-semibold text-emerald-700">+{noiDeltaPct.toFixed(1)}%</span>{t("a_noi_outro2")}</p>
        </div>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-charcoal text-gold">
            <Sparkles className="h-6 w-6" />
          </span>
          <div>
            <h1 className="text-2xl text-charcoal">{t("aiAgent")}</h1>
            <p className="text-sm text-muted-foreground">{t("aiSubtitle")}</p>
          </div>
        </div>
        {active ? (
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-emerald-50 px-3 py-1.5 text-sm font-medium text-emerald-700 ring-1 ring-inset ring-emerald-600/20">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {t("active")} · {settings.aiModel}
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 self-start rounded-full bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 ring-1 ring-inset ring-amber-600/20">
            <Lock className="h-3.5 w-3.5" />
            {t("addApiKey")}
          </span>
        )}
      </div>

      <div className="rounded-xl border border-border bg-card shadow-sm">
        <div className="space-y-5 p-5 sm:p-6">
          {demo.map((m, i) => (
            <Bubble key={`d${i}`} role={m.role}>{m.node}</Bubble>
          ))}
          {convo.map((m, i) => (
            <Bubble key={`c${i}`} role={m.role}>
              <span className="whitespace-pre-wrap">{m.text}</span>
            </Bubble>
          ))}
          {loading && (
            <Bubble role="assistant">
              <span className="inline-flex gap-1">
                <span className="h-2 w-2 animate-bounce rounded-full bg-gold-dark [animation-delay:-0.3s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gold-dark [animation-delay:-0.15s]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-gold-dark" />
              </span>
            </Bubble>
          )}
        </div>

        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border p-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={t("askPortfolio")}
            className="flex-1 rounded-md border border-input bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <button type="submit" disabled={loading} className="flex h-10 w-10 items-center justify-center rounded-md bg-gold text-charcoal transition-colors hover:bg-gold-dark hover:text-white disabled:opacity-50" aria-label={t("askAi")}>
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>

      {!active && (
        <div className="mt-4 flex items-center gap-3 rounded-lg border border-gold/40 bg-gold-light px-4 py-3 text-sm text-charcoal">
          <Lock className="h-4 w-4 shrink-0 text-gold-dark" />
          <span>
            {t("connectBannerPre")}{" "}
            <Link href="/settings" className="font-medium text-gold-dark underline">{t("nav_settings")}</Link>{" "}
            {t("connectBannerPost")}
          </span>
        </div>
      )}
    </div>
  );
}

function Bubble({ role, children }: { role: "user" | "assistant"; children: React.ReactNode }) {
  return (
    <div className={cn("flex", role === "user" ? "justify-end" : "justify-start")}>
      {role === "assistant" && (
        <span className="me-3 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-charcoal text-gold">
          <Sparkles className="h-4 w-4" />
        </span>
      )}
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
          role === "user" ? "rounded-br-sm bg-charcoal text-white" : "rounded-bl-sm bg-secondary text-charcoal"
        )}
      >
        {children}
      </div>
    </div>
  );
}
