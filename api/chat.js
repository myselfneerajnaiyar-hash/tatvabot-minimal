// api/chat.js
module.exports = async (req, res) => {
  try {
    const userMessage =
      (req.query && req.query.message) ||
      (req.body && req.body.message) ||
      "";

    // 1) Lead capture – detect Indian-style mobile numbers
    const phoneMatch = userMessage.match(/(\+91[-\s]?)?\d{10}/);

    if (phoneMatch) {
      const phone = phoneMatch[0];

      // This goes into Vercel logs – you can later wire it to email/Sheet/etc.
      console.log("TatvaBot lead captured:", {
        phone,
        message: userMessage,
        source: "website-chat",
      });

      // IMPORTANT: return a normal 200 JSON with reply
      return res.status(200).json({
        reply: ✅ Thank you! We will contact you on WhatsApp at ${phone}.,
      });
    }

    // 2) Normal AI answer path (same behaviour as before)
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return res.status(500).json({
        error: "Missing OPENAI_API_KEY environment variable",
      });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Bearer ${apiKey},
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are TatvaBot, an expert in vermicompost, balcony/terrace gardening, and Tatvabhoomi products. Answer concisely, in friendly Indian English, and keep answers practical for home gardeners.",
          },
          {
            role: "user",
            content: userMessage || "Say hello to the user.",
          },
        ],
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("OpenAI API error:", response.status, text);
      return res.status(500).json({
        error: "OpenAI API error",
        status: response.status,
        details: text,
      });
    }

    const data = await response.json();

    const reply =
      data &&
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content
        ? data.choices[0].message.content.trim()
        : "Sorry, I couldn't generate a reply.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Server error in /api/chat:", err);
    return res.status(500).json({
      error: "Server error while talking to OpenAI",
      details: err.message,
    });
  }
};
