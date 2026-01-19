import { GARDENER_ISSUES } from "../lib/gardener_issues.js";
import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { message, imageUrl, isGardener } = req.body || {};

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const CUSTOMER_PROMPT = `
You are TatvaBot — an expert gardening assistant for Indian users.
Be friendly, clear, and practical.
Respond in the same language as the user (English or Hindi/Hinglish).
Help home gardeners with simple, actionable advice.
`;

    const CUSTOMER_DIAG_PROMPT = `
You are TatvaBot — an expert gardening assistant for Indian home gardeners.

When an IMAGE is provided:
- Visually analyze the plant.
- Identify the MOST likely issue.
- Do NOT list many possibilities.
- Give ONE clear diagnosis.
- Explain in the user's language (English or Hinglish).
- Use this structure:

🌱 Problem:
(short, clear)

🔍 Why this is happening:
(simple explanation)

🛠 What to do (3 steps only):
1.
2.
3.

Tone: reassuring, friendly, practical.
`;

    const GARDENER_PROMPT = `
You are TatvaBot – a trainer for Indian gardeners (mali).

Allowed issues (choose only from this list):
${JSON.stringify(GARDENER_ISSUES, null, 2)}

Rules:
- Sirf upar wale issues me se hi choose karo.
- Hinglish me simple aur practical jawab do.
- Field-level guidance do, theory nahi.
- Nayi disease invent mat karo.
- Agar sure na ho, closest match lo aur confidence Low rakho.
- Structured diagnostic format follow karo.
`;

    const messages = [
      {
        role: "system",
        content: imageUrl
          ? (isGardener ? GARDENER_PROMPT : CUSTOMER_DIAG_PROMPT)
          : (isGardener ? GARDENER_PROMPT : CUSTOMER_PROMPT)
      }
    ];

    if (imageUrl) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: message || "Is plant me kya dikkat hai?" },
          {
            type: "image_url",
            image_url: { url: imageUrl }
          }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: message || "Hello"
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.3,
    });

    const reply =
      completion?.choices?.[0]?.message?.content ||
      "I could not generate a response. Please try again.";

    return res.status(200).json({
      mode: "ai",
      reply,
    });

  } catch (error) {
    console.error("TatvaBot error:", error);

    return res.status(500).json({
      mode: "ai",
      reply: "Something went wrong. Please try again."
    });
  }
}
