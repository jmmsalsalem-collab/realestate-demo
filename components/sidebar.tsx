"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Building2,
  DoorOpen,
  LayoutDashboard,
  Menu,
  Receipt,
  Settings,
  Sparkles,
  Users,
  Wrench,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/lib/i18n";
import { useSettings } from "@/lib/use-settings";
import { isAiActive } from "@/lib/settings";
import { LanguageToggle } from "@/components/language-toggle";

const NAV = [
  { href: "/", key: "nav_dashboard", icon: LayoutDashboard },
  { href: "/properties", key: "nav_properties", icon: Building2 },
  { href: "/tenants", key: "nav_tenants", icon: Users },
  { href: "/vacancies", key: "nav_vacancies", icon: DoorOpen },
  { href: "/financials", key: "nav_financials", icon: Receipt },
  { href: "/maintenance", key: "nav_maintenance", icon: Wrench },
  { href: "/ai-assistant", key: "nav_ai", icon: Sparkles, ai: true },
  { href: "/settings", key: "nav_settings", icon: Settings },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { t } = useI18n();
  const { settings } = useSettings();
  const aiActive = isAiActive(settings);

  return (
    <nav className="flex flex-col gap-0.5 px-3">
      {NAV.map((item) => {
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center gap-3 rounded-md py-2.5 ps-4 pe-3 text-sm transition-colors",
              active
                ? "bg-white/[0.06] text-white"
                : "text-white/55 hover:bg-white/[0.04] hover:text-white"
            )}
          >
            {active && (
              <span className="absolute inset-y-1.5 start-0 w-0.5 rounded-full bg-gold" />
            )}
            <Icon
              className={cn(
                "h-[18px] w-[18px] shrink-0",
                active ? "text-gold" : "text-white/45 group-hover:text-white"
              )}
            />
            <span className="flex-1">{t(item.key)}</span>
            {item.ai && (
              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full",
                  aiActive ? "bg-emerald-400" : "bg-white/25"
                )}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
  const { t } = useI18n();
  const { settings } = useSettings();
  return (
    <div className="flex items-center gap-3 px-6 py-6">
      {settings.logoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={settings.logoUrl}
          alt={settings.companyName}
          className="h-9 w-9 rounded-md object-cover"
        />
      ) : (
        <span className="flex h-9 w-9 items-center justify-center rounded-md bg-gold font-serif text-charcoal">
          {settings.companyName?.[0] ?? "P"}
        </span>
      )}
      <div className="leading-tight">
        <p className="font-serif text-sm text-white">
          {settings.companyName || "Prestige"}
        </p>
        <p className="text-[0.6rem] uppercase tracking-[0.3em] text-gold">
          {t("brandTagline")}
        </p>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 start-0 z-30 hidden w-64 flex-col bg-charcoal lg:flex">
        <Brand />
        <NavLinks />
        <div className="mt-auto px-6 py-5">
          <p className="text-[0.65rem] text-white/30">{t("demoEnv")}</p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between bg-charcoal px-4 lg:hidden">
        <Brand />
        <div className="flex items-center gap-3">
          <LanguageToggle dark />
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className="text-white"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 start-0 flex w-72 flex-col bg-charcoal">
            <div className="flex items-center justify-between pe-4">
              <Brand />
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-white"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <NavLinks onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}
