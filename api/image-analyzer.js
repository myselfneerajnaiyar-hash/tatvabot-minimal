import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { imageUrl } = req.body;

    if (!imageUrl) {
      return res.status(400).json({ error: "Image URL missing" });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `
You are TatvaBot — an expert AI Plant Doctor 🌱.

Rules:
- Analyze ONLY what is visible in the image
- Do NOT guess if unsure
- Clearly mention confidence level
- Ask follow-up questions if needed

Response format:
🌿 Diagnosis
📉 Confidence Level (High / Medium / Low)
🧪 Visible Symptoms
🌱 Recommended Actions
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
        { type: "input_text", text: "Analyze this plant image and diagnose any visible issues." },
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
  "I could see the image, but need a clearer photo or more details.";

return res.status(200).json({ reply });
  } catch (err) {
    console.error("Image Analyzer Error:", err);
    return res.status(500).json({
      error: "Image analysis failed",
    });
  }
}
