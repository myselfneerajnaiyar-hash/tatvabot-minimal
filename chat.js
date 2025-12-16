export default async function handler(req, res) {
  try {
    return res.status(200).json({
      reply: "TatvaBot debug mode working ✅",
      hasKey: !!process.env.OPENAI_API_KEY,
    });
  } catch (e) {
    return res.status(500).json({ reply: "Debug failed" });
  }
}
