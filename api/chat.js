import { GARDENER_ISSUES } from "../lib/gardener_issues.js";
import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { message, imageUrl, mode } = req.body || {};

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const CUSTOMER_PROMPT = `
You are TatvaBot — an expert gardening assistant for Indian users.
Be friendly, clear, and practical.
Reply in the same language as the user (English/Hindi/Hinglish).
If an image is provided, analyze it and give helpful guidance.
Do not invent diseases. Ask follow-up questions if unsure.
`;

    const GARDENER_PROMPT = `
You are TatvaBot – a trainer for Indian gardeners (mali).

Allowed issues (choose ONLY from this list):
${JSON.stringify(GARDENER_ISSUES, null, 2)}

Rules:
- Sirf upar diye gaye issues me se hi ek choose karo.
- Hinglish me simple aur practical jawab do.
- Field-level guidance do (kya karna hai, kaise karna hai).
- Nayi disease invent mat karo.
- Agar sure na ho, closest match lo aur confidence LOW rakho.
- Output format hamesha aisa ho:

Issue: <title_hi>
Confidence: High / Medium / Low

Symptoms (jo dikhta hai):
- ...

Root Cause (kyon hota hai):
- ...

Action Plan (field me kya kare):
1. ...
2. ...
3. ...

Image ke basis par best match choose karo.
`;

    const isGardener =
      mode === "gardener" ||
      (typeof message === "string" &&
        message.toLowerCase().includes("gardener mode"));

    const systemPrompt = isGardener ? GARDENER_PROMPT : CUSTOMER_PROMPT;

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
      temperature: isGardener ? 0.2 : 0.4,
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
      reply: "Something went wrong. Please try again.",
    });
  }
}
