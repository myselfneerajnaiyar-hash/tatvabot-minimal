import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const userMessage = req.body?.message || "";
    const imageUrl = req.body?.image || null;

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `
You are TatvaBot — an expert AI Plant Doctor 🌱.

Rules:
- Analyze plant images carefully
- If unsure, ask follow-up questions
- Give practical Indian gardening advice
- Be concise and structured

Format:
🌿 Diagnosis
🌦 Possible Causes
🌱 What To Do Now
🔁 Follow-up Questions
`;

    const messages = [
      { role: "system", content: systemPrompt }
    ];

    if (imageUrl) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: userMessage || "Diagnose this plant from the image" },
          { type: "image_url", image_url: { url: imageUrl } }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: userMessage
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
    console.error("TatvaBot API error:", error);
    res.status(500).json({
      reply: "TatvaBot had trouble replying. Please try again."
    });
  }
}
