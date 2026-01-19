import OpenAI from "openai";
import { analyzeImageSymptoms } from "./image-analyzer.js";

// ---- DEFICIENCY BRAIN (Batch 1) ----
const DEFICIENCIES = [
  {
    issue_id: "DEF_NITROGEN",
    issue_name: "Nitrogen Deficiency",
    visible_symptoms: ["yellowing of older leaves", "pale green color", "slow growth", "weak stems"],
    leaf_pattern_clues: "Yellowing starts from bottom leaves upward",
    root_cause: "Low nitrogen in soil",
    fix_steps: ["Add vermicompost – 2 handfuls per pot", "Apply liquid seaweed feed – 5 ml per litre"],
    why: "Nitrogen is essential for chlorophyll and leaf growth."
  },
  {
    issue_id: "DEF_POTASSIUM",
    issue_name: "Potassium Deficiency",
    visible_symptoms: ["brown leaf edges", "burnt margins", "weak flowering"],
    leaf_pattern_clues: "Leaf margins appear scorched",
    root_cause: "Low potassium in soil",
    fix_steps: ["Add potash-rich compost", "Use balanced NPK feed"],
    why: "Potassium regulates water balance and flowering."
  },
  {
    issue_id: "DEF_PHOSPHORUS",
    issue_name: "Phosphorus Deficiency",
    visible_symptoms: ["purple leaves", "poor root growth", "delayed flowering"],
    leaf_pattern_clues: "Leaves turn dark or purplish",
    root_cause: "Low phosphorus availability",
    fix_steps: ["Add bone meal", "Improve soil aeration"],
    why: "Phosphorus supports roots and flowering."
  },
  {
    issue_id: "DEF_IRON",
    issue_name: "Iron Deficiency",
    visible_symptoms: ["yellowing of young leaves", "green veins with yellow tissue"],
    leaf_pattern_clues: "Interveinal chlorosis on new leaves",
    root_cause: "High soil pH blocking iron uptake",
    fix_steps: ["Apply chelated iron", "Use acidic compost"],
    why: "Iron is required for chlorophyll formation."
  },
  {
    issue_id: "DEF_MAGNESIUM",
    issue_name: "Magnesium Deficiency",
    visible_symptoms: ["yellowing between veins", "leaf curling"],
    leaf_pattern_clues: "Green veins with yellow tissue on older leaves",
    root_cause: "Nutrient imbalance",
    fix_steps: ["Apply Epsom salt solution", "Add balanced compost"],
    why: "Magnesium is part of chlorophyll."
  }
];

// simple matcher
function matchDeficiencies(symptoms) {
  const s = symptoms.join(" ").toLowerCase();
  return DEFICIENCIES.filter(d =>
    d.visible_symptoms.some(v => s.includes(v.split(" ")[0]))
  ).slice(0, 3);
}

export default async function handler(req, res) {
  try {
    const { message, imageUrl, type, nursery } = req.body;

    // -----------------------------
    // PRODUCT MODE (unchanged)
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

    if (type && PRODUCT_TYPE_MAP[type] && nursery?.nursery_id) {
      const productTypeId = PRODUCT_TYPE_MAP[type];
      const nurseryId = nursery.nursery_id;
      const url = `https://tatvasutra.in/wp-json/tatvabot/v1/products?product_type_id=${productTypeId}&nursery_id=${nurseryId}`;

      try {
        const r = await fetch(url);
        const data = await r.json();
        return res.status(200).json({ mode: "products", products: data });
      } catch (e) {
        return res.status(500).json({ mode: "products", products: [] });
      }
    }

    // -----------------------------
    // DIAGNOSTIC AI MODE
    // -----------------------------
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

   let context = "";

if (imageUrl) {
  try {
    const symptoms = await analyzeImageSymptoms(imageUrl);
    const matches = matchDeficiencies(symptoms);

    context = `
Visible Symptoms:
${symptoms.map(s => "- " + s).join("\n")}

Possible Issues:
${matches.map(m => `
- ${m.issue_name}
  Cause: ${m.root_cause}
  Pattern: ${m.leaf_pattern_clues}
  Fix: ${m.fix_steps.join(" | ")}
  Why: ${m.why}
`).join("\n")}
`;
  } catch (err) {
    console.error("Image analysis failed:", err);
    // Fallback: behave like old TatvaBot
    context = "";
  }
}

    const systemPrompt = `
You are TatvaBot, a professional plant doctor.

If diagnostic context is provided:
- Do NOT invent new diseases.
- Use ONLY the provided issues.
- Explain clearly:
  1. Most likely issue
  2. Why it fits
  3. What to do (steps)
  4. Why that fix works
- If unsure, ask ONE clarifying question.
`;

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: ${context}\n\nUser Query: ${message || "Diagnose this plant"} }
    ];

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      temperature: 0.3
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
