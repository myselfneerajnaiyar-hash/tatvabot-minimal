import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "No image URL provided" });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: "You are TatvaBot, an expert plant disease diagnostician."
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: "Analyze this plant image and identify visible problems. Be careful and do not guess." },
            { type: "input_image", image_url: imageUrl }
          ]
        }
      ]
    });

    const reply =
      response.output_text ||
      "I can see the plant image, but I need more details to give an accurate diagnosis.";

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("IMAGE ANALYZER CRASH:", err);
    return res.status(500).json({ error: "Image analysis failed" });
  }
}
