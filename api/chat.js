import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { message = "", imageBase64 = null } = req.body || {};

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `
You are TatvaBot — an expert AI Plant Doctor 🌱.

Rules:
- Do not guess blindly
- Use image if provided
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
          { type: "text", text: message || "Diagnose this plant from the image" },
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
    console.error("TatvaBot API error:", error);
    res.status(500).json({
      reply: "TatvaBot had trouble replying. Please try again."
    });
  }
