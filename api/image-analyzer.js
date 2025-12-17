import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "No image provided" });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are TatvaBot, a plant disease diagnosis assistant.
Analyze the plant image carefully.
Respond in this structure:
- Likely Issue
- Confidence (High / Medium / Low)
- Why this is likely
- Immediate actions
- When to seek expert help
          `
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this plant image" },
            {
              type: "image_url",
              image_url: { url: imageBase64 }
            }
          ]
        }
      ],
      temperature: 0.3
    });

    return res.status(200).json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    console.error("Image Analyzer Error:", err);
    return res.status(500).json({
      error: "Image analysis failed",
      details: err.message
    });
  }
}
