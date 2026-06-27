import { Suspense } from "react";
import { ListingsBrowser } from "@/components/listings-browser";

export default function ListingsPage() {
  return (
    <Suspense
      fallback={
        <div className="container py-24 text-center text-muted-foreground">
          Loading homes…
        </div>
      }
    >
      <ListingsBrowser />
    </Suspense>
  );
}
