import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { message, imageUrl } = req.body || {};

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `
You are TatvaBot — an expert AI Plant Doctor and Gardening Assistant 🌱, built for Indian conditions.

Rules:
- Be practical and concise.
- If an image is provided, analyze it visually.
- If unsure, ask 1–2 clarifying questions.
- Give actionable Indian gardening advice.
- Do NOT hallucinate diseases.
`;

    const messages = [
      { role: "system", content: systemPrompt }
    ];

    if (imageUrl) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: message || "Diagnose this plant" },
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
      temperature: 0.4,
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
      reply: "Something went wrong while thinking. Please try again."
    });
  }
}
