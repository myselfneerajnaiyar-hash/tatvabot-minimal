/ api/chat.js
module.exports = async (req, res) => {
  // 1. Get user message
  const userMessage =
    (req.query && req.query.message) ||
    (req.body && req.body.message) ||
    "no message received";

  // 2. Try to detect an Indian phone number (with or without +91)
  // Examples that will match:
  //  - 9876543210
  //  - +91 9876543210
  //  - +919876543210
  const phoneMatch = userMessage.match(/(\+91[\s-]?)?\d{10}/);

  if (phoneMatch) {
    // For now we only log it – later we can send this to email/Google Sheet, etc.
    console.log("TatvaBot lead captured (phone):", phoneMatch[0]);
  }

  // 3. OpenAI key
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Missing OPENAI_API_KEY environment variable",
    });
  }

  try {
    // 4. Call OpenAI Chat Completions API
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
              "You are TatvaBot, a friendly gardening assistant for Tatvabhoomi. " +
              "You help Indian home gardeners with vermicompost, balcony/terrace gardening, " +
              "indoor plants, soil health, and how to use Tatvabhoomi products effectively. " +
              "Explain in simple, practical steps. Keep answers focused and not too long.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
      }),
    });

    // 5. Handle OpenAI error
    if (!response.ok) {
      const text = await response.text();
      return res.status(500).json({
        error: "OpenAI API error",
        status: response.status,
        details: text,
      });
    }

    // 6. Parse successful response
    const data = await response.json();

    let reply =
      data.choices &&
      data.choices[0] &&
      data.choices[0].message &&
      data.choices[0].message.content;

    if (!reply) {
      reply = "Sorry, I couldn't generate a reply this time. Please try again.";
    }

    // 7. If phone number was detected, append a small confirmation line
    if (phoneMatch) {
      reply +=
        `\n\n📱 Thank you! We've saved your number (${phoneMatch[0]}). ` +
        Someone from Tatvabhoomi will contact you on WhatsApp soon.;
    }

    // 8. Send reply back to your frontend
    return res.status(200).json({ reply });
  } catch (err) {
    // 9. Server-side error
    return res.status(500).json({
      error: "Server error while talking to OpenAI",
      details: err.message,
    });
  }
};
