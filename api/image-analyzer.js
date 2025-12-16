import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL missing" });
  }

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: 
            "You are a plant-care assistant. " +
            "Your job is to list ONLY visible symptoms in a plant image. " +
            "Do NOT guess causes, diseases, or treatments. " +
            "If uncertain, say 'uncertain'."
        },
        {
          role: "user",
          content: [
            { type: "text", text: "List visible symptoms from this plant image." },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }
      ],
      max_tokens: 200
    });

    const text = response.choices[0].message.content;

    res.status(200).json({
      raw: text
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image analysis failed" });
  }
}
