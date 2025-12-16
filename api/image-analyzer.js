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

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
You are TatvaBot — an expert plant doctor.
Analyze the plant image carefully.
Do NOT guess if unsure.
Return structured output:

🌿 Diagnosis  
🌦 Possible Causes  
🧪 Confidence Level (High / Medium / Low)  
🌱 Immediate Actions  
🔁 Follow-up Questions
`
            },
            {
              type: "input_image",
              image_url: imageUrl
            }
          ]
        }
      ]
    });

    const reply =
      response.output_text ||
      "I need more information to analyze this plant accurately.";

    return res.status(200).json({ reply });

  } catch (err) {
    console.error("Image Analyzer Error:", err);
    return res.status(500).json({
      error: "Image analysis failed"
    });
  }
}
