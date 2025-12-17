import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { imageUrl, imageBase64 } = req.body;

    if (!imageUrl && !imageBase64) {
      return res.status(400).json({ error: "No image provided" });
    }

    const imageContent = imageUrl
      ? { type: "image_url", image_url: { url: imageUrl } }
      : { type: "image_url", image_url: { url: imageBase64 } };

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this plant image and diagnose the issue." },
            imageContent
          ]
        }
      ],
      max_tokens: 300
    });

    res.status(200).json({
      reply: response.choices[0].message.content
    });

  } catch (err) {
    console.error("Image Analyzer Error:", err);
    res.status(500).json({
      error: "Image analysis failed",
      details: err.message
    });
  }
}
