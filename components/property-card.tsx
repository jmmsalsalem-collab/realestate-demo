import { Bath, BedDouble, Ruler } from "lucide-react";
import type { Listing } from "@/lib/data";
import { formatNumber, formatPrice } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PropertyCard({ listing }: { listing: Listing }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
      <div
        className="relative h-56 w-full"
        style={{ background: listing.gradient }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/35 to-transparent" />
        <div className="absolute left-4 top-4 flex gap-2">
          <Badge variant="gold">{listing.type}</Badge>
        </div>
        <div className="absolute bottom-4 left-4">
          <p className="font-serif text-2xl text-white drop-shadow">
            {formatPrice(listing.price)}
          </p>
        </div>
        <span className="absolute right-4 top-4 text-xs uppercase tracking-widest text-white/80">
          {listing.id}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-serif text-lg leading-snug text-charcoal">
          {listing.address}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground">
          {listing.neighborhood}
        </p>

        <p className="mt-3 line-clamp-2 text-sm text-charcoal/70">
          {listing.blurb}
        </p>

        <div className="mt-5 grid grid-cols-3 gap-2 border-t border-border pt-4 text-sm text-charcoal">
          <span className="flex items-center gap-1.5">
            <BedDouble className="h-4 w-4 text-gold-dark" />
            {listing.beds} bd
          </span>
          <span className="flex items-center gap-1.5">
            <Bath className="h-4 w-4 text-gold-dark" />
            {listing.baths} ba
          </span>
          <span className="flex items-center gap-1.5">
            <Ruler className="h-4 w-4 text-gold-dark" />
            {formatNumber(listing.sqft)}
          </span>
        </div>

        <Button variant="outline" size="sm" className="mt-5 w-full">
          Schedule Tour
        </Button>
      </div>
    </article>
  );
}
