import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl missing" });
    }

    const systemPrompt = `
You are TatvaBot — an expert AI Plant Doctor 🌱.

Rules:
- Analyze ONLY what is visible in the image
- If confidence < 70%, say "Uncertain diagnosis"
- NEVER guess diseases
- Ask follow-up questions when needed
- Keep advice safe for home gardeners in India

Response format:
🌿 Diagnosis
📊 Confidence %
🔍 Visual Symptoms Seen
🌱 Likely Causes
🧪 How to Confirm
🛠 Immediate Care Steps
🔁 Follow-up Questions
`;

    const response = await client.responses.create({
      model: "gpt-4o-mini",
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: "Analyze this plant image" },
            {
              type: "input_image",
              image_url: imageUrl,
            },
          ],
        },
      ],
      temperature: 0.3,
    });

    const output =
      response.output_text ||
      "Image received, but explanation could not be generated.";

    return res.status(200).json({ reply: output });
  } catch (err) {
    console.error("IMAGE ANALYZER ERROR:", err);

    // Graceful fallback (VERY IMPORTANT)
    if (err.status === 429) {
      return res.status(200).json({
        reply:
          "⚠️ Image received, but analysis is temporarily unavailable due to high usage.\n\nPlease describe the symptoms in text for now (yellowing, spots, pests, wilting).",
      });
    }

    return res.status(500).json({
      error: "Image analysis failed",
      details: err.message,
    });
  }
}
