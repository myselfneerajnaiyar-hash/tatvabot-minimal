import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
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
- Analyze ONLY visible symptoms in the image
- If diagnosis is uncertain, say so clearly
- Do NOT hallucinate diseases
- Use simple, structured language

Response format:
🌿 Diagnosis  
🧠 Confidence Level (High / Medium / Low)  
🔍 Visible Symptoms  
🌱 Possible Causes  
🧪 What to Check Next  
💚 Immediate Care Steps
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
