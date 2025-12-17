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
- Never guess blindly
- If unsure, ask follow-up questions
- Give practical Indian gardening advice
- Keep answers simple and structured

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
          { type: "text", text: message || "Please diagnose this plant issue" },
          {
            type: "image_url",
            image_url: { url: imageBase64 }
          }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: message || "Hello"
      });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.4,
    });

    res.status(200).json({
      reply: response.choices[0].message.content,
    });

  } catch (error) {
    console.error("TatvaBot error:", error);
    res.status(500).json({
      reply: "TatvaBot hit an internal error. Please try again.",
    });
  }
}
