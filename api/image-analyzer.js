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

    // Remove data URL prefix
    const base64Data = imageBase64.replace(
      /^data:image\/\w+;base64,/,
      ""
    );

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: "Analyze this plant image and diagnose possible disease." },
            {
              type: "input_image",
              image_base64: base64Data,
            },
          ],
        },
      ],
    });

    const output =
      response.output_text ||
      "Unable to analyze image. Please try another photo.";

    return res.status(200).json({ reply: output });

  } catch (err
