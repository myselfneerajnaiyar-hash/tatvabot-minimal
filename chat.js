import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const userMessage =
      req.query?.message ||
      req.body?.message ||
      "Hello";

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY missing");
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `
You are TatvaBot — India's most advanced AI Plant Doctor 🌱.

Rules:
- Be accurate and practical
- Never guess blindly
- Ask follow-up questions if unsure
- Keep language simple and friendly

Format responses as:
🌿 Diagnosis
🌦 Likely Causes
🌱 Treatment Steps
🔁 Follow-Up Questions
`;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.4,
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("TatvaBot API crash:", err.message);
    return res.status(500).json({
      reply: "TatvaBot backend error. Please try again.",
    });
  }
}
