export const runtime = "nodejs";

export default async function handler(req, res) {
  try {
    const userMessage =
      req.body?.message ||
      req.query?.message ||
      "Hello";

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        reply: "OPENAI_API_KEY missing on server",
      });
    }

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Authorization": Bearer ${process.env.OPENAI_API_KEY},
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            {
              role: "system",
              content:
                "You are TatvaBot, an expert Indian plant doctor. Be concise, helpful, and structured.",
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
          temperature: 0.4,
        }),
      }
    );

    const data = await openaiResponse.json();

    if (!openaiResponse.ok) {
      console.error("OpenAI error:", data);
      return res.status(500).json({
        reply: "OpenAI API failed",
      });
    }

    return res.status(200).json({
      reply: data.choices[0].message.content,
    });
  } catch (err) {
    console.error("Server crash:", err);
    return res.status(500).json({
      reply: "Server crashed before responding",
    });
  }
}
