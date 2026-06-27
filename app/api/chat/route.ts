import { anthropic } from "@ai-sdk/anthropic";
import { convertToCoreMessages, streamText } from "ai";
import { listings } from "@/lib/data";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

const inventory = listings
  .map(
    (l) =>
      `- ${l.id} | ${l.address}, ${l.neighborhood} | ${l.type} | $${l.price.toLocaleString()} | ${l.beds}bd/${l.baths}ba | ${l.sqft.toLocaleString()} sqft | built ${l.yearBuilt} — ${l.blurb}`
  )
  .join("\n");

const SYSTEM_PROMPT = `You are Alex, an AI real estate advisor at Prestige Properties. Help buyers find the right home by asking about their budget, desired neighborhood, must-haves, family size, commute needs. Suggest properties from our listings, explain mortgage concepts, discuss neighborhoods, and help them prepare for offers. Be warm, knowledgeable, and help them feel confident.

Guidelines:
- Keep replies concise and conversational (this is a chat widget). Use short paragraphs and the occasional bullet list.
- When you recommend a home, reference it by its address and price from the inventory below, and explain *why* it fits what the buyer told you.
- If you don't yet know the buyer's budget, neighborhood preference, or must-haves, ask one or two focused questions before recommending.
- For mortgage questions, you can mention that the buyer can use the on-site Mortgage Calculator, and explain concepts plainly (down payment, principal & interest, PMI, property tax, insurance, DTI).
- Never invent listings that are not in the inventory. If nothing fits, say so and suggest the closest options or adjustments.
- These are fictional demonstration listings; do not promise legal or financial advice — encourage confirming details with a licensed agent and lender.

CURRENT INVENTORY:
${inventory}`;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: anthropic("claude-sonnet-4-6"),
    system: SYSTEM_PROMPT,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
