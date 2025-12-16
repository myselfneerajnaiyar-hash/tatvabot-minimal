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

    console.log("Incoming body:", req.body);

    const userMessage =
      req.body?.message?.toString()?.trim() || "Hello";

    if (!process.env.OPENAI_API_KEY) {
      console.error("Missing OPENAI_API_KEY");
      return res.status(500).json({
        reply: "Server misconfiguration",
      });
    }

    const openaiResponse = await fetch(
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
Diagnose carefully. Never guess blindly.
Use simple, structured, friendly explanations.
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

    const data = await openaiResponse.json();
    console.log("OpenAI response:", data);

    if (!openaiResponse.ok) {
      throw new Error(data.error?.message || "OpenAI failed");
    }

    return res.status(200).json({
      reply: data.choices[0].message.content,
    });
  } catch (err) {
    console.error("TatvaBot backend crash:", err);
    return res.status(500).json({
      reply: "TatvaBot backend error. Please try again.",
    });
  }
}
