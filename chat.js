import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const userMessage =
      req.query.message ||
      (req.body && req.body.message) ||
      "No message received";

    // Lead capture – Indian phone numbers
    const phoneMatch = userMessage.match(/(\+91[\s-]?)?([6-9]\d{9})/);
    if (phoneMatch) {
      try {
        await fetch("https://formspree.io/f/xmpdkjaa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            phone: phoneMatch[0],
            source: "TatvaBot Lead Capture",
          }),
        });
      } catch (e) {
        console.error("Formspree error:", e);
      }
    }

    // OpenAI client
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // SYSTEM PROMPT
    const systemPrompt = `
You are TatvaBot — India's most advanced AI Plant Doctor 🌱.

Your responsibilities:
1. Diagnose plant problems carefully
2. Ask follow-up questions when uncertain
3. Provide step-by-step treatment guidance
4. Recommend Tatvabhoomi products naturally
5. Never guess diseases blindly
6. Maintain a friendly, expert tone
7. Give clean, structured responses

Response format:
🌿 Diagnosis
🌦 Likely Causes
🧪 How to Confirm
🌱 Treatment Steps
💚 Tatvabhoomi Product Recommendations
🔁 Follow-Up Questions

If the user provides only an image, infer visible symptoms.
If information is insufficient, ask clarifying questions.
`;

    // OpenAI call
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.4,
    });

    const botReply = completion.choices[0].message.content;

    return res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error("TatvaBot API error:", error);
    return res.status(500).json({
      reply:
        "Sorry — TatvaBot had trouble replying. Please try again in a moment.",
    });
  }
}
