# Prestige Properties — AI Real Estate Demo

A standalone, professional demo of an AI-powered luxury real estate experience,
built with **Next.js 14 (App Router)**, **Tailwind CSS**, **shadcn/ui-style
components**, and the **Vercel AI SDK** with **Claude (`claude-sonnet-4-6`)**.

## Features

- **Landing page** — hero, tagline, search bar, and six featured residences.
- **Listings** — 12 curated listings with live filters (price, beds, type,
  neighborhood) and full-text search.
- **AI Property Advisor** — a floating chat widget powered by Claude. "Alex"
  asks about budget, neighborhood, must-haves, and recommends real homes from
  the inventory, explains mortgage concepts, and helps prepare offers.
- **Mortgage Calculator** — computes monthly principal & interest (full
  amortization), property tax, insurance, and PMI, with a visual breakdown.
- **Settings / Template Panel** — white-label the agency name, accent color,
  agent details, office address, phone, and featured neighborhoods. Persists to
  `localStorage` with a live preview.

The experience is fully responsive and uses a luxury palette: white, charcoal,
and gold accents, with a Playfair Display / Inter type pairing.

## Getting Started

```bash
npm install
cp .env.example .env.local   # then add your ANTHROPIC_API_KEY
npm run dev
```

Open http://localhost:3000.

## Environment Variables

| Variable            | Description                                            |
| ------------------- | ------------------------------------------------------ |
| `ANTHROPIC_API_KEY` | Anthropic API key used by the AI advisor chat route.   |

Get a key at https://console.anthropic.com. The chat route is at
`app/api/chat/route.ts` and uses `streamText` from the Vercel AI SDK.

## Notes

All listings, agents, and figures are fictional and for demonstration only.
