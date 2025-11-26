// Simple Node serverless function for Vercel
// Uses global fetch and process.env.OPENAI_API_KEY

module.exports = async (req, res) => {
  try {
    const message =
      (req.query && req.query.message) ||
      (req.body && req.body.message) ||
      "no message received";

    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error("OPENAI_API_KEY is missing");
      return res.status(500).json({ error: "Server misconfigured." });
    }

    const openaiResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Bearer ${apiKey},
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: [
            {
              role: "system",
              content:
                "You are TatvaBot, a helpful assistant for Tatvabhoomi. You answer questions about vermicomposting, balcony gardening, terrace gardens, soil health, and small home gardens. Be clear, practical, and beginner-friendly. Keep answers under 200 words.",
            },
            { role: "user", content: message },
          ],
        }),
      }
    );

    if (!openaiResponse.ok) {
