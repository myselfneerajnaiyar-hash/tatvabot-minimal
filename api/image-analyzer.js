import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "No image URL provided" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are TatvaBot Vision — an expert plant disease detector.
Rules:
- Only describe what is visible
- Do not guess if unclear
- Mention confidence level
Return format:
🌿 Visible Symptoms
🧠 Possible Issues
📊 Confidence (%)
❓ What to check next
`,
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Analyze this plant image." },
            {
              type: "image_url",
              image_url: { url: imageUrl },
            },
          ],
        },
      ],
    });

    res.status(200).json({
      analysis: response.choices[0].message.content,
    });
  } catch (err) {
    console.error("Image analyzer error:", err);
    res.status(500).json({ error: "Image analysis failed" });
  }
}
