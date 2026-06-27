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
import { useSettings } from "@/lib/use-settings";
import { isAiActive } from "@/lib/settings";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/properties", label: "Properties", icon: Building2 },
  { href: "/tenants", label: "Tenants", icon: Users },
  { href: "/vacancies", label: "Vacancies", icon: DoorOpen },
  { href: "/financials", label: "Financials", icon: Receipt },
  { href: "/maintenance", label: "Maintenance", icon: Wrench },
  { href: "/ai-assistant", label: "AI Assistant", icon: Sparkles, ai: true },
  { href: "/settings", label: "Settings", icon: Settings },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { settings } = useSettings();
  const aiActive = isAiActive(settings);

  return (
    <nav className="flex flex-col gap-1 px-3">
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
              "group flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors",
              active
                ? "bg-white/10 text-white"
                : "text-white/60 hover:bg-white/5 hover:text-white"
            )}
          >
            <Icon
              className={cn(
                "h-[18px] w-[18px] shrink-0",
                active ? "text-gold" : "text-white/50 group-hover:text-gold"
              )}
            />
            <span className="flex-1">{item.label}</span>
            {item.ai && (
              <span
                className={cn(
                  "h-2 w-2 rounded-full",
                  aiActive ? "bg-emerald-400" : "bg-white/25"
                )}
                title={aiActive ? "Active" : "Inactive"}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}

function Brand() {
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
          Property CRM
        </p>
      </div>
    </div>
  );
}

export function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col bg-charcoal lg:flex">
        <Brand />
        <NavLinks />
        <div className="mt-auto px-6 py-5">
          <p className="text-[0.65rem] text-white/30">
            Demo environment · fictional data
          </p>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-charcoal px-4 lg:hidden">
        <Brand />
        <button
          onClick={() => setOpen(true)}
          aria-label="Open menu"
          className="text-white"
        >
          <Menu className="h-6 w-6" />
        </button>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 flex-col bg-charcoal">
            <div className="flex items-center justify-between pr-4">
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
