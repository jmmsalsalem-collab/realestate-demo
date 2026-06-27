import type { Metadata } from "next";
import { Inter, Playfair_Display, Cairo } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n";
import { Sidebar } from "@/components/sidebar";
import { Topbar } from "@/components/topbar";
import { ThemeProvider } from "@/components/theme-provider";

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prestige Properties · Property Management CRM",
  description:
    "A bilingual (EN/AR) property-management CRM for the Kuwait market: properties, tenants, vacancies, financials, and maintenance.",
};

// Set dir/lang before hydration to avoid a flash of the wrong direction.
const noFlash = `(function(){try{var l=localStorage.getItem('crm-lang')||'en';document.documentElement.lang=l;document.documentElement.dir=l==='ar'?'rtl':'ltr';}catch(e){}})();`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${sans.variable} ${serif.variable} ${cairo.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        <script dangerouslySetInnerHTML={{ __html: noFlash }} />
        <I18nProvider>
          <ThemeProvider />
          <Sidebar />
          <div className="lg:ps-64">
            <Topbar />
            <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
              {children}
            </main>
          </div>
        </I18nProvider>
      </body>
    </html>
  );
}
