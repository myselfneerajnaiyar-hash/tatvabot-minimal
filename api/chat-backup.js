// api/chat.js
module.exports = async (req, res) => {
  const userMessage =
    (req.query && req.query.message) ||
    (req.body && req.body.message) ||
    "no message received";
  // 🔹 Lead capture: detect Indian phone number and send to Formspree
  const phoneMatch = userMessage && userMessage.match(/(\+91[\s-]*)?\d{10}\b/);

  if (phoneMatch) {
    try {
      await fetch("https://formspree.io/f/xwpdkjaa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          phone: phoneMatch[0],
          message: userMessage,
          source: "TatvaBot on tatvasutra.in",
        }),
      });
    } catch (err) {
      console.error("Formspree lead error:", err);
      // we still continue to reply to user even if Formspree fails
    }

    return res.status(200).json({
      reply: `✅ Thank you! We’ve received your number (${phoneMatch[0]}). Our team will contact you shortly on WhatsApp.`,
    });
  }

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Missing OPENAI_API_KEY environment variable",
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 👇 THIS LINE IS CRITICAL
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content:
              "You are TatvaBot, an expert in vermicompost, balcony/terrace gardening, and Tatvabhoomi products. Answer clearly and practically for Indian home gardeners.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({
        error: "OpenAI API error",
        status: response.status,
        details: text,
      });
    }

    const data = await response.json();

    const reply =
      (data.choices &&
        data.choices[0] &&
        data.choices[0].message &&
        data.choices[0].message.content) ||
      "Sorry, I couldn't generate a reply.";

    return res.status(200).json({ reply });
  } catch (err) {
    return res.status(500).json({
      error: "Server error while talking to OpenAI",
      details: err.message,
    });
  }
};
