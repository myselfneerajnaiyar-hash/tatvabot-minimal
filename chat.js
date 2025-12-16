import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const userMessage =
      req.query.message ||
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

    // 2. SYSTEM PROMPT → Tatvabot's Superpower
    const systemPrompt = `
You are TatvaBot — India's most advanced AI Plant Doctor 🌱.
Your job:
1. Diagnose plant problems correctly  
2. Ask follow-up questions if needed  
3. Give step-by-step remedies  
4. Recommend Tatvabhoomi products naturally  
5. NEVER guess diseases blindly  
6. Always keep tone friendly, expert, simple  
7. Output clean, structured responses.

Response format:
🌿 Diagnosis  
🌦 Likely Causes  
🧪 How to Confirm  
🌱 Treatment Steps  
💚 Tatvabhoomi Product Recommendations  
🔁 Follow-Up Questions (if needed)

If user asks general plant-care questions, give clear guides.
If an image is provided, analyze visible plant symptoms carefully before concluding.

    // 3. Send request to OpenAI
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
    console.error("API error:", error);
    return res.status(500).json({
      reply:
        "Sorry, something went wrong on my side. Please try again in a moment!",
    });
  }
}
