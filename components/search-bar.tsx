"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SearchBar({ className }: { className?: string }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    router.push(`/listings${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`flex w-full items-center gap-2 rounded-full border border-white/20 bg-white/95 p-2 shadow-xl backdrop-blur ${className ?? ""}`}
    >
      <Search className="ml-3 h-5 w-5 shrink-0 text-gold-dark" />
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by neighborhood, city, or property type…"
        className="flex-1 bg-transparent px-1 py-2 text-sm text-charcoal outline-none placeholder:text-charcoal/50"
      />
      <Button type="submit" variant="gold" className="rounded-full">
        Search
      </Button>
    </form>
  );
}
