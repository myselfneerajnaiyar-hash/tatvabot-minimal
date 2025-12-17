import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { imageBase64 } = req.body;

    if (!imageBase64) {
      return res.status(400).json({ error: "No image provided" });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: "Diagnose this plant disease and suggest treatment." },
            {
              type: "input_image",
              image_base64: imageBase64.replace(/^data:image\/\w+;base64,/, "")
            }
          ]
        }
      ]
    });

    return res.status(200).json({
      reply: response.output_text
    });

  } catch (err) {
    console.error("Image analyzer error:", err);
    return res.status(500).json({
      error: "Image analysis failed",
      details: err.message
    });
  }
}
