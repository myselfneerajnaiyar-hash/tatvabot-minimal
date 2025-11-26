module.exports = async function (req, res) {
  const message =
    (req.query && req.query.message) ||
    (req.body && req.body.message) ||
    "no message received";

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(500).json({
      error: "Missing OPENAI_API_KEY"
    });
  }

  try {
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
            content: "You are TatvaBot. Answer simply in 3–5 short sentences.",
          },
          { role: "user", content: message }
        ],
      }),
    });

    const data = await response.json();

    return res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No reply",
    });
  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      details: String(err),
    });
  }
};
