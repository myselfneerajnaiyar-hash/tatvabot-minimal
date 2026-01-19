import { GARDENER_ISSUES } from "../lib/gardener_issues.js";
import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { message, imageUrl, mode = "customer" } = req.body || {};

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const CUSTOMER_PROMPT = `
You are TatvaBot — an expert gardening assistant for Indian users.
Be friendly, clear, and practical.
Always respond in the same language as the user.
If the user writes in Hindi or Hinglish, reply in Hinglish.
If the user writes in English, reply in English.
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
- Jab image mile, plant ko visually analyse karo aur ek hi issue choose karo.
- Structured diagnostic report do.
`;

    const systemPrompt =
      mode === "gardener" ? GARDENER_PROMPT : CUSTOMER_PROMPT;

    const messages = [
      {
        role: "system",
        content: systemPrompt,
      },
    ];

    if (imageUrl) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: message || "Diagnose this plant" },
          {
            type: "image_url",
            image_url: { url: imageUrl },
          },
        ],
      });
    } else {
      messages.push({
        role: "user",
        content: message || "Hello",
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
      reply: "Something went wrong while diagnosing. Please try again.",
    });
  }
}
