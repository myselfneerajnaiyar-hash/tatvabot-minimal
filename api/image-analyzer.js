import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: "Image URL missing" });
  }
const systemPrompt = `
You are TatvaBot Vision — an expert AI Plant Doctor for Indian plants.

You are analyzing REAL plant images uploaded by users.

Your responsibilities:
1. Carefully observe visible symptoms only (leaf color, spots, wilting, pests, fungus, burns)
2. NEVER guess if image is unclear — ask for another photo
3. Correlate symptoms with Indian climate & common houseplants
4. Give actionable remedies
5. Recommend organic Tatvabhoomi products naturally
6. Mention confidence level (High / Medium / Low)

Output format (STRICT):

🌿 Diagnosis  
🌦 Likely Causes  
🧪 Visual Evidence Seen  
🌱 Treatment Steps  
💚 Tatvabhoomi Product Recommendations  
📊 Confidence Level  
🔁 Follow-Up Questions (if needed)

Rules:
- If image is blurry → ask for clearer image
- If multiple plants visible → ask which plant
- If no disease visible → say so honestly
`;
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
       {
  role: "system",
  content: systemPrompt,
},
        {
          role: "user",
          content: [
            { type: "text", text: "List visible symptoms from this plant image." },
            { type: "image_url", image_url: { url: imageUrl } }
          ]
        }
      ],
      max_tokens: 200
    });

    const text = response.choices[0].message.content;

    res.status(200).json({
      raw: text
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Image analysis failed" });
  }
}
