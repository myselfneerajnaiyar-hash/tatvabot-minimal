const fetch = require("node-fetch");

module.exports = async (req, res) => {
  const message =
    (req.query && req.query.message) ||
    (req.body && req.body.message) ||
    "no message received";

  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return res.status(200).json({
      reply: "TatvaBot config error: OPENAI_API_KEY is not set.",
    });
  }

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: Bearer ${apiKey},
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: message,
      }),
    });

    const data = await response.json();

    return res.status(200).json({
      reply:
        data?.output?.[0]?.content?.[0]?.text ||
        "TatvaBot could not read the AI reply.",
    });
  } catch (err) {
    return res.status(200).json({
      reply: "TatvaBot internal error. Please try again.",
    });
  }
};
