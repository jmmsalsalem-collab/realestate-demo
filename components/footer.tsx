import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-charcoal text-background">
      <div className="container grid gap-10 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex flex-col leading-none">
            <span className="font-serif text-2xl tracking-tight">Prestige</span>
            <span className="text-[0.65rem] uppercase tracking-[0.35em] text-gold">
              Properties
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-background/60">
            Curated luxury homes and intelligent guidance. Find your perfect
            home with the help of AI and a team that knows the market.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs uppercase tracking-wider text-gold">
            Explore
          </h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li>
              <Link href="/listings" className="hover:text-gold">
                All Listings
              </Link>
            </li>
            <li>
              <Link href="/calculator" className="hover:text-gold">
                Mortgage Calculator
              </Link>
            </li>
            <li>
              <Link href="/settings" className="hover:text-gold">
                Template Settings
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs uppercase tracking-wider text-gold">
            Contact
          </h4>
          <ul className="space-y-2 text-sm text-background/70">
            <li>210 Marina Bluffs Blvd, Suite 400</li>
            <li>(415) 555-0142</li>
            <li>hello@prestige.properties</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-background/10 py-6">
        <p className="container text-xs text-background/50">
          © {new Date().getFullYear()} Prestige Properties. A demonstration
          experience. All listings are fictional.
        </p>
      </div>
    </footer>
  );
}
