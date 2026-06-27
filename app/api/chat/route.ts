import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  maintenance,
  portfolioKpis,
  properties,
  propertyStats,
  tenants,
} from "@/lib/data";
import { daysUntil } from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// gemini-1.5-flash is retired on the free Generative Language API; the free
// tier now serves the 2.x flash models. gemini-2.5-flash is the default.
const DEFAULT_MODEL = "gemini-2.5-flash";
const ALLOWED_MODELS = new Set([
  "gemini-2.5-flash",
  "gemini-2.5-pro",
  "gemini-2.0-flash",
  "gemini-flash-latest",
]);

function buildContext(): string {
  const k = portfolioKpis();
  const propLines = properties
    .map((p) => {
      const s = propertyStats(p);
      return `- ${p.name.en} (${p.area.en}, ${p.type}): ${s.unitsOccupied}/${s.unitsTotal} occupied, ${Math.round(
        s.occupancyRate
      )}% occupancy, KD ${s.monthlyRevenue}/mo collected, manager ${p.manager.en}`;
    })
    .join("\n");

  const overdue = tenants
    .filter((t) => t.balanceOwed > 0)
    .map((t) => `- ${t.name.en} (${t.propertyName.en}, ${t.unit}): KD ${t.balanceOwed} overdue, status ${t.status}`)
    .join("\n");

  const expiring = tenants
    .map((t) => ({ ...t, days: daysUntil(t.leaseEnd) }))
    .filter((t) => t.days >= 0 && t.days <= 60)
    .sort((a, b) => a.days - b.days)
    .map((t) => `- ${t.name.en} (${t.propertyName.en}, ${t.unit}): lease ends in ${t.days} days, status ${t.status}`)
    .join("\n");

  const openTickets = maintenance
    .filter((m) => m.status !== "Resolved")
    .map((m) => `- ${m.id} ${m.propertyName.en}/${m.unit}: ${m.issue.en} [${m.priority}, ${m.status}]`)
    .join("\n");

  return `PORTFOLIO SNAPSHOT (reference date 2026-06-27, currency Kuwaiti Dinar "KD"):
Totals: ${k.totalProperties} properties, ${k.totalUnits} units, ${k.occupiedUnits} occupied, ${k.vacantUnits} vacant, ${Math.round(
    k.occupancyRate
  )}% occupancy, KD ${k.monthlyRevenue}/month collected, KD ${k.outstandingRent} outstanding rent, ${k.openMaintenance} open maintenance tickets.

PROPERTIES:
${propLines}

OVERDUE TENANTS:
${overdue || "- none"}

LEASES EXPIRING WITHIN 60 DAYS:
${expiring || "- none"}

OPEN MAINTENANCE:
${openTickets || "- none"}`;
}

const SYSTEM = `You are the AI portfolio assistant for "Prestige Properties", a real estate management firm in Kuwait. You help the team with occupancy, rent collection, leases, financials, and maintenance.

Rules:
- All monetary values are in Kuwaiti Dinar; format them as "KD <amount>".
- Answer ONLY from the portfolio snapshot below. If something isn't in the data, say you don't have that information.
- Reply in the SAME language as the user's question (English or Arabic).
- Be concise and professional. Use short lists where helpful.

${buildContext()}`;

export async function POST(req: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "missing_key", message: "GEMINI_API_KEY is not configured." },
      { status: 400 }
    );
  }

  let messages: { role: string; content: string }[] = [];
  let model = DEFAULT_MODEL;
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages : [];
    if (typeof body?.model === "string" && ALLOWED_MODELS.has(body.model)) {
      model = body.model;
    }
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const contents = messages
    .filter((m) => typeof m.content === "string" && m.content.trim())
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  if (contents.length === 0 || contents[0].role !== "user") {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const gemini = genAI.getGenerativeModel({
      model,
      systemInstruction: SYSTEM,
    });
    const result = await gemini.generateContent({ contents });
    return Response.json({ text: result.response.text() });
  } catch (e) {
    return Response.json(
      { error: "gemini_error", message: e instanceof Error ? e.message : String(e) },
      { status: 502 }
    );
  }
}
