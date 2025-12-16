import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL missing" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: "Analyze this plant image. Identify visible symptoms, likely issues, and next steps. If unsure, ask follow-up questions." },
            { type: "input_image", image_url: imageUrl }
          ]
        }
      ]
    });

    const outputText =
      response.output_text ||
      "I can see the plant, but need more details to be certain.";

    return res.status(200).json({ reply: outputText });

  } catch (err) {
    console.error("IMAGE ANALYZER CRASH:", err);
    return res.status(500).json({
      error: "Image analysis failed",
      details: err.message,
    });
  }
}
