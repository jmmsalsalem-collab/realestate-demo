import Link from "next/link";
import { ArrowRight, Award, Home, Sparkles } from "lucide-react";
import { featuredListings, listings } from "@/lib/data";
import { formatNumber } from "@/lib/utils";
import { SearchBar } from "@/components/search-bar";
import { PropertyCard } from "@/components/property-card";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  const totalValue = listings.reduce((sum, l) => sum + l.price, 0);

  return (
    <>
      {/* Hero */}
      <section
        className="relative flex min-h-[78vh] items-center"
        style={{
          background:
            "linear-gradient(135deg, #1b2a36 0%, #2f4858 45%, #6b5636 100%)",
        }}
      >
        <div className="absolute inset-0 hero-overlay" />
        <div className="container relative z-10 py-24">
          <div className="max-w-2xl animate-fade-up">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-black/20 px-4 py-1.5 text-xs uppercase tracking-[0.25em] text-gold">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered Real Estate
            </span>
            <h1 className="mt-6 font-serif text-5xl leading-tight text-white text-balance md:text-6xl">
              Find Your Perfect Home with AI
            </h1>
            <p className="mt-5 max-w-xl text-lg text-white/80">
              Prestige Properties pairs an exceptional collection of luxury
              homes with Alex, your personal AI advisor — so the right home
              finds you faster.
            </p>

            <div className="mt-8 max-w-xl">
              <SearchBar />
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <Button asChild variant="gold" size="lg">
                <Link href="/listings">
                  Explore Listings <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/40 text-white hover:bg-white hover:text-charcoal"
              >
                <Link href="/calculator">Estimate My Payment</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-card">
        <div className="container grid grid-cols-1 gap-8 py-10 sm:grid-cols-3">
          {[
            { icon: Home, label: "Curated Homes", value: `${listings.length}` },
            {
              icon: Award,
              label: "Portfolio Value",
              value: `$${formatNumber(Math.round(totalValue / 1_000_000))}M`,
            },
            {
              icon: Sparkles,
              label: "AI Advisor",
              value: "24 / 7",
            },
          ].map((stat) => (
            <div key={stat.label} className="flex items-center gap-4">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gold-light text-gold-dark">
                <stat.icon className="h-6 w-6" />
              </span>
              <div>
                <p className="font-serif text-2xl text-charcoal">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured listings */}
      <section className="container py-20">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold-dark">
              Handpicked
            </p>
            <h2 className="mt-2 font-serif text-4xl text-charcoal">
              Featured Residences
            </h2>
          </div>
          <Button asChild variant="link" className="hidden sm:inline-flex">
            <Link href="/listings">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {featuredListings.map((listing) => (
            <PropertyCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* AI advisor callout */}
      <section className="bg-charcoal text-background">
        <div className="container grid items-center gap-10 py-20 md:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-gold">
              Meet Alex
            </p>
            <h2 className="mt-3 font-serif text-4xl">
              Your AI property advisor, on call around the clock
            </h2>
            <p className="mt-4 max-w-md text-background/70">
              Tell Alex your budget, your must-haves, and where you dream of
              living. Get tailored home recommendations, plain-English mortgage
              guidance, neighborhood insights, and help preparing a confident
              offer.
            </p>
            <ul className="mt-6 space-y-3 text-sm text-background/80">
              {[
                "Personalized home matches from our live inventory",
                "Mortgage concepts explained without the jargon",
                "Neighborhood comparisons and offer strategy",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-gold">
              Tap the chat bubble in the corner to start the conversation.
            </p>
          </div>

          <div className="rounded-2xl border border-background/15 bg-background/5 p-8">
            <div className="space-y-4 text-sm">
              <div className="ml-auto max-w-[80%] rounded-lg rounded-br-none bg-gold px-4 py-3 text-charcoal">
                I have about $1.2M and want 3 bedrooms near the water.
              </div>
              <div className="max-w-[85%] rounded-lg rounded-bl-none bg-background/10 px-4 py-3 text-background/90">
                Wonderful — Cedar Cove Way at $1,290,000 gives you 3 beds, 2.5
                baths and an entertainer&apos;s yard. Want me to line up a few
                more and explain the monthly payment?
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
