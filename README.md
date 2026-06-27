# Prestige Properties — Property Management CRM

A professional, standalone **property-management CRM demo** built with **Next.js
14 (App Router)**, **Tailwind CSS**, and **shadcn/ui-style components**. Premium
look: white canvas, charcoal sidebar, gold accents. All data is fictional.

## Pages

1. **Dashboard** — KPIs (properties, occupied/vacant units, occupancy rate,
   monthly revenue, outstanding rent, open maintenance) plus charts: revenue by
   month (12-mo bar), occupancy trend (line), and revenue by property (donut).
2. **Properties** — card grid + table; click through to a detail page.
3. **Property Detail** — address, photo placeholder, full unit roster, monthly
   financials (gross rent → vacancy loss → OpEx → NOI), and maintenance.
4. **Tenants** — CRM table; click through to a profile with payment history,
   lease documents, and a communication log.
5. **Vacancies** — every vacant unit with asking rent, days vacant, last
   tenant, and listing status.
6. **Financials** — P&L by property and portfolio with month / quarter / year
   filters.
7. **Maintenance** — ticket queue with priority, assignment, and status.
8. **Settings** — white-label the company name, logo, address, accent color,
   and managers; plus an **AI Integration** section. Saved to `localStorage`.

## AI Assistant (demo state)

A **"Prestige AI Agent"** page and a floating **"Ask AI"** button showcase an
integrated assistant with a pre-populated, convincing example conversation
(occupancy ranking, overdue rent, expiring leases, NOI vs. last quarter — all
computed from the demo dataset).

This is a **visual demo only — no API calls are made.** In **Settings →
AI Integration**, entering an Anthropic API key and toggling *Enable AI
Assistant* flips the assistant's badge to a green **"Active"** state. The key is
stored only in the browser's `localStorage` and never leaves the device.

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:3000. No environment variables are required.

## Notes

All properties, tenants, financials, and tickets are fictional and for
demonstration purposes only.
