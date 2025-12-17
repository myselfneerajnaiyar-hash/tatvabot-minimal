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
          content:
            "You are TatvaBot, an expert gardening and plant disease diagnosis assistant. Analyze plant images and give probable issues, confidence level, and next steps.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this plant image and diagnose possible problems." },
            {
              type: "image_url",
              image_url: {
                url: imageBase64,
              },
            },
          ],
        },
      ],
      temperature: 0.3,
    });

    const reply = response.choices[0].message.content;
    return res.status(200).json({ reply });

  } catch (error) {
    console.error("Image Analyzer Error:", error);
    return res.status(500).json({
      error: "Image analysis failed",
      details: error.message,
    });
  }
}
