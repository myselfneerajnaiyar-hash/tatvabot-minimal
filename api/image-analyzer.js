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

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: "Analyze this plant image and diagnose possible disease. Be concise." },
            {
              type: "input_image",
              image_url: imageUrl
            }
          ]
        }
      ]
    });

    const output =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text ||
      "No analysis generated";

    return res.status(200).json({ reply: output });

  } catch (err) {
    console.error("IMAGE ANALYZER ERROR:", err);
    return res.status(500).json({
      error: "Image analysis failed",
      details: err.message
    });
  }
}
