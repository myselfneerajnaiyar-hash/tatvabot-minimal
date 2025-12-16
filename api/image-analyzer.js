export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "No image URL provided" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content:
            "You are TatvaBot, an expert AI plant doctor. Analyze plant images carefully. Do not guess. If confidence is low, ask follow-up questions.",
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: "Analyze this plant image and diagnose possible issues." },
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
      "I need more information to make a confident diagnosis.";

    return res.status(200).json({ reply: output });
  } catch (err) {
    console.error("Image Analyzer Error:", err);
    return res.status(500).json({
      error: "Image analysis failed",
    });
  }
}
