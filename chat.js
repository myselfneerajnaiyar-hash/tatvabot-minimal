import OpenAI from "openai";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ reply: "Method not allowed" });
    }

    const userMessage =
      (req.body && req.body.message && String(req.body.message)) ||
      "Hello";

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are TatvaBot, a friendly and knowledgeable gardening assistant for Indian home gardeners.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
    });

    const reply = completion.choices[0].message.content;

    return res.status(200).json({ reply });
  } catch (error) {
    console.error("TatvaBot API error:", error);
    return res.status(500).json({
      reply: "Sorry — TatvaBot had trouble replying. Try again later.",
    });
  }
}
