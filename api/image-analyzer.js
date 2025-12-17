export const runtime = "nodejs";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { imageUrl } = req.body || {};

    if (!imageUrl) {
      return res.status(400).json({ error: "imageUrl missing" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "OPENAI_API_KEY missing" });
    }

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Bearer ${process.env.OPENAI_API_KEY},
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          temperature: 0.2,
          messages: [
            {
              role: "system",
              content:
                "You are a plant disease expert. Analyze visible symptoms from the image description carefully. Do not guess if unsure.",
            },
            {
              role: "user",
              content: [
                { type: "text", text: "Analyze this plant image and list visible symptoms only." },
                {
                  type: "image_url",
                  image_url: { url: imageUrl },
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);
      return res.status(500).json({ error: "OpenAI image analysis failed" });
    }

    const analysis = data.choices[0].message.content;

    return res.status(200).json({
      raw: analysis,
    });
  } catch (err) {
    console.error("Image analyzer crash:", err);
    return res.status(500).json({ error: "Image analyzer crashed" });
  }
}
