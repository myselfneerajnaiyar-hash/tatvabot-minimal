import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { message, imageUrl, type, nursery } = req.body;

    // -----------------------------
    // PRODUCT MODE HANDLING
    // -----------------------------
    const PRODUCT_TYPE_MAP = {
      seed_germination: 7202,
      plant_tonic: 7201,
      micronutrient_mix: 7200,
      soil_conditioner: 7199,
      fungicide: 7198,
      organic_pest_control: 7197,
      neem_oil: 7196,
      root_growth_promoter: 7195,
      leaf_growth_booster: 7194,
      flower_booster: 7193,
      liquid_fertilizer: 7192,
      organic_fertilizer: 7191,
      potting_mix: 7190,
      cocopeat: 7189,
      vermicompost: 7188
    };

    // If UI has sent a product intent AND nursery is known
    if (type && PRODUCT_TYPE_MAP[type] && nursery?.nursery_id) {
      const productTypeId = PRODUCT_TYPE_MAP[type];
      const nurseryId = nursery.nursery_id;

      const url = `https://tatvasutra.in/wp-json/tatvabot/v1/products?product_type_id=${productTypeId}&nursery_id=${nurseryId}`;

      try {
        const r = await fetch(url);
        const data = await r.json();

        return res.status(200).json({
          mode: "products",
          products: data,
        });
      } catch (e) {
        console.error("Product fetch error:", e);
        return res.status(500).json({
          mode: "products",
          products: [],
          error: "Failed to fetch products"
        });
      }
    }

    // -----------------------------
    // AI MODE (existing behaviour)
    // -----------------------------
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const systemPrompt = `
You are TatvaBot — an expert AI Plant Doctor and Gardening Assistant 🌱, built for Indian conditions.

CORE BEHAVIOUR:
- If an image is provided, you MUST analyze it visually before responding.
- Do NOT ask for the image again if imageUrl is present.
- Make a best-effort diagnosis based only on visible symptoms.
- Do not hallucinate diseases.
- Ask follow-up questions if unsure.
- Give practical, local Indian gardening advice.
- Sound confident, clear, and helpful.

IMPORTANT:
TatvaBot has TWO responsibilities:
FOLLOW-UP INTENT HANDLING (VERY IMPORTANT):

If plants have already been suggested in the conversation and:

1) The user asks:
   - "how to grow them"
   - "how do I grow these"
   - "care instructions"
   - "how to take care"
   
   → Do NOT suggest plants again.
   → Do NOT ask which plant.
   → Give GENERAL CARE STEPS that apply to most of the suggested plants:
     - pot size
     - soil type
     - sunlight
     - watering
     - fertilising
   → Format as clear bullet points.

2) If the user mentions ONE specific plant name (e.g. "spider plant"):
   → Do NOT suggest plants again.
   → Do NOT show the plant list.
   → Give DETAILED CARE instructions ONLY for that plant.

1) Diagnose plant problems when the user shares an image or says their plant is unhealthy.
2) Suggest plants to grow when the user asks questions like:
   "What plants should I grow?"
   "Suggest plants for my location"
   "Best plants for my weather"
   "Plants for my balcony"
`;

    const messages = [
      { role: "system", content: systemPrompt }
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
        content: message
      });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.4
    });

    res.status(200).json({
      mode: "ai",
      reply: completion.choices[0].message.content
    });

  } catch (error) {
    console.error("TatvaBot error:", error);
    res.status(500).json({
      mode: "ai",
      reply: "Something went wrong. Please try again."
    });
  }
}
