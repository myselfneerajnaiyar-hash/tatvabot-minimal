import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { message, imageBase64 } = req.body;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `
You are TatvaBot — an expert AI Plant Doctor 🌱.

Rules:
- - If an image is provided, you MUST analyze it visually before responding
- Do NOT ask for the image again if imageUrl is present
- Make a best-effort diagnosis based on visible symptoms
- Do not hallucinate diseases
- Ask follow-up questions if unsure
- Give practical Indian gardening advice

Format:
🌿 Diagnosis
🌦 Possible Causes
🌱 What To Do Now
🔁 Follow-up Questions
`;

    const messages = [
      { role: "system", content: systemPrompt }
    ];

    if (imageBase64) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: message || "Diagnose this plant" },
          {
            type: "image_url",
            image_url: { url: imageBase64 }
          }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: message
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.4
    });

    res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("TatvaBot error:", error);
    res.status(500).json({
      reply: "Image diagnosis failed. Please upload a clear photo and try again."
    });
  }
}
