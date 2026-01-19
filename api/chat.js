import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { message, imageUrl } = req.body || {};

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const DIAG_PROMPT = `
You are TatvaBot in Gardener / Internal Training Mode.

When an IMAGE is provided, you MUST:
1. Visually analyze the plant.
2. Choose EXACTLY ONE issue from this fixed list:

ISSUES (choose one only):
1. Nitrogen Deficiency
2. Potassium Deficiency
3. Iron Deficiency
4. Magnesium Deficiency
5. Overwatering Stress
6. Underwatering Stress
7. Root Rot
8. Fungal Leaf Disease
9. Pest Infestation
10. Sun Stress

3. Produce a structured diagnostic report in this exact format:

🌿 Plant Identification:
Plant Name: <common name>
Botanical Name: <if known, else "Unknown">
Confidence: <High / Medium / Low>

📌 Diagnosis Report (Image-Based)
🧠 Diagnosis Report (Image-Based)

Likely Issue: <one from the list>
Confidence: <Low / Medium / High>

🔍 Visible Symptoms:
- bullet points from the image

🌱 Root Cause:
- short explanation

🛠 Action Plan:
1. step
2. step
3. step
4. step

🧪 Treatment Mapping:
intent_key: <one of these only>
- liquid_fertilizer
- micronutrient_mix
- soil_conditioner
- plant_tonic
- fungicide
- neem_oil

application: <dosage & frequency>

RULES:
- Never invent diseases outside the list.
- If unsure, choose the closest match and set Confidence to Low.
- Be practical for Indian urban gardening.
- Do NOT be verbose outside the structure.
`;

    const messages = [
      {
        role: "system",
        content: imageUrl
          ? DIAG_PROMPT
          : `You are TatvaBot — an expert gardening assistant for Indian conditions. Be concise and practical.`
      }
    ];

    if (imageUrl) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: message || "Diagnose this plant" },
          {
            type: "image_url",
            image_url: { url: imageUrl }
          }
        ]
      });
    } else {
      messages.push({
        role: "user",
        content: message || "Hello"
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.3,
    });

    const reply =
      completion?.choices?.[0]?.message?.content ||
      "I could not generate a response. Please try again.";

    return res.status(200).json({
      mode: "ai",
      reply,
    });

  } catch (error) {
    console.error("TatvaBot error:", error);

    return res.status(500).json({
      mode: "ai",
      reply: "Something went wrong while diagnosing. Please try again."
    });
  }
}
