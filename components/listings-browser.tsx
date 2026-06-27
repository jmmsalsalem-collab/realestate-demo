"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal } from "lucide-react";
import {
  listings,
  NEIGHBORHOODS,
  PROPERTY_TYPES,
  getPriceRange,
} from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ANY = "any";
const [MIN_PRICE, MAX_PRICE] = getPriceRange();

export function ListingsBrowser() {
  const searchParams = useSearchParams();
  const query = (searchParams.get("q") ?? "").toLowerCase();

  const [price, setPrice] = useState<[number, number]>([MIN_PRICE, MAX_PRICE]);
  const [beds, setBeds] = useState<string>(ANY);
  const [type, setType] = useState<string>(ANY);
  const [neighborhood, setNeighborhood] = useState<string>(ANY);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      if (l.price < price[0] || l.price > price[1]) return false;
      if (beds !== ANY && l.beds < Number(beds)) return false;
      if (type !== ANY && l.type !== type) return false;
      if (neighborhood !== ANY && l.neighborhood !== neighborhood) return false;
      if (query) {
        const haystack =
          `${l.address} ${l.city} ${l.neighborhood} ${l.type}`.toLowerCase();
        if (!haystack.includes(query)) return false;
      }
      return true;
    });
  }, [price, beds, type, neighborhood, query]);

  function reset() {
    setPrice([MIN_PRICE, MAX_PRICE]);
    setBeds(ANY);
    setType(ANY);
    setNeighborhood(ANY);
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.3em] text-gold-dark">
          The Collection
        </p>
        <h1 className="mt-2 font-serif text-4xl text-charcoal">
          Available Homes
        </h1>
        {query && (
          <p className="mt-2 text-sm text-muted-foreground">
            Showing results for &ldquo;{query}&rdquo;
          </p>
        )}
      </div>

      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        {/* Filters */}
        <aside className="h-fit rounded-lg border border-border bg-card p-6 lg:sticky lg:top-28">
          <div className="mb-5 flex items-center gap-2 text-charcoal">
            <SlidersHorizontal className="h-4 w-4 text-gold-dark" />
            <h2 className="font-serif text-lg">Filters</h2>
          </div>

          <div className="space-y-6">
            <div>
              <Label>Price Range</Label>
              <Slider
                className="mt-4"
                min={MIN_PRICE}
                max={MAX_PRICE}
                step={5000}
                value={price}
                onValueChange={(v) => setPrice(v as [number, number])}
              />
              <div className="mt-2 flex justify-between text-xs text-muted-foreground">
                <span>{formatPrice(price[0])}</span>
                <span>{formatPrice(price[1])}</span>
              </div>
            </div>

            <div>
              <Label>Bedrooms</Label>
              <Select value={beds} onValueChange={setBeds}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Any</SelectItem>
                  <SelectItem value="2">2+</SelectItem>
                  <SelectItem value="3">3+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Property Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Any</SelectItem>
                  {PROPERTY_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Neighborhood</Label>
              <Select value={neighborhood} onValueChange={setNeighborhood}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ANY}>Any</SelectItem>
                  {NEIGHBORHOODS.map((n) => (
                    <SelectItem key={n} value={n}>
                      {n}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={reset}
              className="w-full"
            >
              Reset Filters
            </Button>
          </div>
        </aside>

        {/* Results */}
        <div>
          <p className="mb-5 text-sm text-muted-foreground">
            {filtered.length}{" "}
            {filtered.length === 1 ? "home" : "homes"} available
          </p>
          {filtered.length > 0 ? (
            <div className="grid gap-7 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((listing) => (
                <PropertyCard key={listing.id} listing={listing} />
              ))}
            </div>
          ) : (
            <div className="rounded-lg border border-dashed border-border bg-card p-12 text-center">
              <p className="font-serif text-xl text-charcoal">
                No homes match your filters
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                Try widening your price range or clearing a filter.
              </p>
              <Button variant="gold" className="mt-6" onClick={reset}>
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
