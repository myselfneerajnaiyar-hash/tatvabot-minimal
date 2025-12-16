import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl is required" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `
You are TatvaBot — an expert plant disease analyst.
Rules:
- Do NOT guess confidently if unsure
- If image is unclear, say so
- Provide structured diagnosis
- Focus only on what is visible in the image

Output format:
🌿 Diagnosis
🔍 Visual Observations
🌱 Possible Causes
🧪 What to Confirm
💊 Treatment
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this plant image and diagnose the issue." },
            {
              type: "image_url",
              image_url: { url: imageUrl },
            },
          ],
        },
      ],
      temperature: 0.3,
    });

    const reply = response.choices[0].message.content;

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Image Analyzer Error:", err);
    return res.status(500).json({
      error: "Image analysis failed",
      details: err.message,
    });
  }
}
