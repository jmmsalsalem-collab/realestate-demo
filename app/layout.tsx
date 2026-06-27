import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
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

export const metadata: Metadata = {
  title: "Prestige Properties · Property Management CRM",
  description:
    "A professional property-management CRM: properties, tenants, vacancies, financials, and maintenance in one dashboard.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable}`}>
      <body className="bg-background font-sans antialiased">
        <ThemeProvider />
        <Sidebar />
        <div className="lg:pl-64">
          <main className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
