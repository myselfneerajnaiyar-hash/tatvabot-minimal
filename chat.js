export default async function handler(req, res) {
  try {
    const userMessage =
      req.body?.message ||
      req.query?.message ||
      "Hello";

    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY missing");
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Bearer ${process.env.OPENAI_API_KEY},
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.4,
          messages: [
            {
              role: "system",
              content: `
You are TatvaBot — India's most advanced AI Plant Doctor 🌱.
Be accurate, practical, friendly, and structured.
Never guess blindly.
              `,
            },
            {
              role: "user",
              content: userMessage,
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);
      throw new Error("OpenAI request failed");
    }

    return res.status(200).json({
      reply: data.choices[0].message.content,
    });
  } catch (err) {
    console.error("TatvaBot crash:", err.message);
    return res.status(500).json({
      reply: "TatvaBot backend error. Please try again.",
    });
  }
}
