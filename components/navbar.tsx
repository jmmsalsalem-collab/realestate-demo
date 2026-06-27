"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/listings", label: "Listings" },
  { href: "/calculator", label: "Mortgage Calculator" },
  { href: "/settings", label: "Settings" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/70 bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-xl tracking-tight text-charcoal">
            Prestige
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold-dark">
            Properties
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm uppercase tracking-wider transition-colors hover:text-gold-dark",
                pathname === link.href
                  ? "text-gold-dark"
                  : "text-charcoal/70"
              )}
            >
              {link.label}
            </Link>
          ))}
          <Button asChild variant="gold" size="sm">
            <Link href="/listings">Browse Homes</Link>
          </Button>
        </nav>

        <button
          className="md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="container flex flex-col gap-1 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  "rounded-md px-3 py-3 text-sm uppercase tracking-wider",
                  pathname === link.href
                    ? "bg-secondary text-gold-dark"
                    : "text-charcoal/80"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
