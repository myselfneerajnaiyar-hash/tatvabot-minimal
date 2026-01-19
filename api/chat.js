export default async function handler(req, res) {
  try {
    const { message, imageUrl } = req.body || {};

    return res.status(200).json({
      mode: "debug",
      reply: `DEBUG OK\n\nMessage: ${message || "(none)"}\nImage: ${imageUrl || "(none)"}`
    });
  } catch (e) {
    return res.status(500).json({
      reply: "Server crashed: " + e.message
    });
  }
}
