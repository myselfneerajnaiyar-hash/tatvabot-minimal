import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const userMessage =
      req.query?.message ||
      (req.body && req.body.message) ||
      "No message received";

    // 1. Lead capture – detect Indian phone numbers
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

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // 2. SYSTEM PROMPT → TatvaBot Brain
    const systemPrompt = `
You are TatvaBot — India's most advanced AI Plant Doctor 🌱.

Your responsibilities:
1. Diagnose plant problems accurately
2. Ask follow-up questions if information is insufficient
3. Provide step-by-step remedies
4. Recommend Tatvabhoomi products ONLY when relevant
5. Never guess diseases blindly
6. Keep tone friendly, expert, and simple
7. Respond in a clean, structured format

Response format:
🌿 Diagnosis  
🌦 Likely Causes  
🧪 How to Confirm  
🌱 Treatment Steps  
💚 Tatvabhoomi Product Recommendations  
🔁 Follow-Up Questions (if needed)

Rules:
- If image observations are included in the user message, use them carefully
- Do NOT hallucinate diseases
- If uncertain, clearly say so and ask clarifying questions
`;

    // 3. Send request to OpenAI
    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      temperature: 0.4,
      max_tokens: 700,
    });

    const botReply =
      completion?.choices?.[0]?.message?.content ||
      "Sorry — I couldn’t generate a response.";

    return res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error("TatvaBot API error:", error);
    return res.status(500).json({
      reply:
        "Sorry — TatvaBot had trouble replying. Please try again in a moment!",
    });
  }
}
