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
      return res.status(400).json({ error: "No imageUrl provided" });
    }

    const systemPrompt = `
You are TatvaBot — an expert AI Plant Doctor 🌱.

Rules:
- Carefully analyze ONLY what is visible in the image
- Do NOT guess if confidence is low
- If unsure, ask follow-up questions
- Keep response structured and simple

Output format:
🌿 Diagnosis  
🔍 Visible Symptoms  
🧠 Confidence Level (High / Medium / Low)  
🌱 Immediate Care Steps  
❓ Follow-up Questions (if needed)
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
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
      temperature: 0.3,
    });

    const reply = response.choices[0].message.content;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("Image Analyzer Error:", error);
    return res.status(500).json({
      error: "Image analysis failed",
    });
  }
}
