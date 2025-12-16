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
      return res.status(400).json({ error: "Image URL missing" });
    }

    const systemPrompt = `
You are TatvaBot — an expert AI Plant Doctor.

Rules:
- Carefully observe visible symptoms in the plant image
- DO NOT guess if confidence is low
- Mention uncertainty clearly
- Focus on common Indian garden plants
- Suggest organic, safe remedies
- If unclear, ask for follow-up info

Response format:
🌿 Diagnosis (with confidence %)
🔍 Visible Symptoms
🌦 Possible Causes
🌱 Immediate Actions
❓ Follow-up Questions (if needed)
`;

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: [
            { type: "input_text", text: "Analyze this plant image and diagnose the problem." },
            { type: "input_image", image_url: imageUrl },
          ],
        },
      ],
      temperature: 0.3,
    });

    const outputText =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text ||
      "Unable to analyze image clearly.";

    return res.status(200).json({ reply: outputText });
  } catch (err) {
    console.error("Image Analyzer Error:", err);
    return res.status(500).json({
      error: "Image analysis failed",
    });
  }
}
