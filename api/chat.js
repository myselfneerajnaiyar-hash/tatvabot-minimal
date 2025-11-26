// Simple TatvaBot handler using OpenAI via fetch.
// This is written to NEVER crash with 500, even if something goes wrong.

module.exports = async (req, res) => {
  const message =
    (req.query && req.query.message) ||
    (req.body && req.body.message) ||
    "no message received";

  const apiKey = process.env.OPENAI_API_KEY;

  // Safety: if API key is missing, DON'T crash.
  if (!apiKey) {
    return res.status(200).json({
      reply:
        "TatvaBot config error: OPENAI_API_KEY is not set. Please add it in Vercel settings.",
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

    // If OpenAI returns an error, still don't crash.
    if (!response.ok) {
      console.error("OpenAI error:", data);
      return res.status(200).json({
        reply:
          "TatvaBot is having trouble talking to the AI right now. Please try again in a bit.",
      });
    }

    // New Responses API format: text is here:
    const replyText =
      data &&
      data.output &&
      data.output[0] &&
      data.output[0].content &&
      data.output[0].content[0] &&
      data.output[0].content[0].text;

    return res.status(200).json({
      reply: replyText || "TatvaBot could not read the AI reply.",
    });
  } catch (err) {
    console.error("TatvaBot server error:", err);
    return res.status(200).json({
      reply:
        "TatvaBot ran into an internal error. Please try again after some time.",
    });
  }
};
