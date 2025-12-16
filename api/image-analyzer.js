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
      return res.status(400).json({ error: "No image URL provided" });
    }

    const systemPrompt = `
You are TatvaBot — an expert plant doctor 🌱.
Analyze the plant image carefully.

Rules:
- Do NOT guess if uncertain
- Mention visible symptoms only
- Give probable causes with confidence level
- Ask follow-up questions if required
- Keep output structured and simple

Response format:
🌿 Diagnosis
👀 Visible Symptoms
🧪 Probable Causes (with confidence)
🌱 Immediate Actions
🔁 Follow-up Questions
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
            { type: "input_text", text: "Analyze this plant image." },
            {
              type: "input_image",
              image_url: imageUrl,
            },
          ],
        },
      ],
    });

    const reply =
      response.output_text ||
      "I could not confidently analyze this image. Please try another photo.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Image Analyzer Error:", err);
    return res.status(500).json({ error: "Image analysis failed" });
  }
}
