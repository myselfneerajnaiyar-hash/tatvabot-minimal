import { GARDENER_ISSUES } from "../lib/gardener_issues.js";
import OpenAI from "openai";

function buildIssueIndex() {
  return Object.entries(GARDENER_ISSUES).map(([key, v]) => {
    return {
      id: key,
      name: v.name || key,
      signals: v.symptoms || [],
      cause: v.cause || "",
      recovery: v.recovery || ""
    };
  });
}

export default async function handler(req, res) {
  try {
    const { message, imageUrl, isGardener,sunData } = req.body || {};
    // 🌞 Sun / Direction training flow
if (sunData) {
  const { lux, direction, time, location } = sunData;

  let advice = `🌞 Balcony Sun Analysis\n\n`;

 if (lux == null) {
  const hour = new Date(time).getHours();

  let estimated = "low";
  if (direction && direction.includes("East") && hour >= 6 && hour <= 11) {
    estimated = "bright morning light";
  } else if (direction && direction.includes("South") && hour >= 10 && hour <= 15) {
    estimated = "strong direct light";
  } else if (direction && direction.includes("West") && hour >= 15) {
    estimated = "harsh evening light";
  }

  advice += `📏 Direct light sensor not available.\n`;
  advice += `Based on time + direction, this spot has *${estimated}*.\n\n`;
}
  } else if (lux < 500) {
    advice += `Low light (${lux} lux)\nThis spot is suitable only for shade plants like Snake Plant, ZZ Plant, Peace Lily.\n\n`;
  } else if (lux < 2000) {
    advice += `Medium light (${lux} lux)\nGood for indoor foliage plants like Money Plant, Areca Palm.\n\n`;
  } else {
    advice += `Bright light (${lux} lux)\nSuitable for flowering plants and vegetables.\n\n`;
  }

  if (direction) {
    advice += `🧭 Direction: ${direction}\n`;

    if (direction.includes("North")) {
      advice += `North-facing balconies get soft light – best for indoor plants.\n`;
    } else if (direction.includes("East")) {
      advice += `East-facing balconies get morning sun – ideal for most plants.\n`;
    } else if (direction.includes("South")) {
      advice += `South-facing balconies get strong sun – good for roses, vegetables, hibiscus.\n`;
    } else if (direction.includes("West")) {
      advice += `West-facing balconies get harsh evening sun – protect plants in summer.\n`;
    }
  }
advice += `\n🎓 Training Tip:\n`;
advice += `Repeat this test at 8am, 12pm, and 4pm.\n`;
advice += `You will learn how sun moves in your balcony.\n`;
advice += `A good gardener always knows his light.`;
  return res.json({
    reply: advice
  });
}

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const ISSUE_INDEX = buildIssueIndex();

    const CUSTOMER_PROMPT = `
You are TatvaBot — an expert gardening assistant for Indian users.
Be friendly, clear, and practical.
Respond in the same language as the user (English or Hindi/Hinglish).
Help home gardeners with simple, actionable advice.
`;

    const CUSTOMER_DIAG_PROMPT = `
You are TatvaBot — an expert gardening assistant for Indian home gardeners.

When an IMAGE is provided:
- Visually analyze the plant.
- Identify the MOST likely issue.
- Do NOT list many possibilities.
- Give ONE clear diagnosis.
- Explain in the user's language (English or Hinglish).
- Use this structure:

🌱 Problem:
(short, clear)

🔍 Why this is happening:
(simple explanation)

🛠 What to do (3 steps only):
1.
2.
3.

Tone: reassuring, friendly, practical.
`;

    const GARDENER_PROMPT = `
You are TatvaBot – a senior plant doctor and trainer for Indian gardeners (mali).

You have a fixed handbook of plant issues.
You may ONLY choose from this list:

${JSON.stringify(ISSUE_INDEX, null, 2)}

Rules:
- Naya issue invent mat karo.
- Sabse closest match choose karo.
- Agar exact match nahi milta, “closest match” lo.

When gardener mode is ON and an image is provided:

Always respond in Hinglish.

Follow this exact structure:

🌿 Plant:
- Agar exact plant identify ho jaye to naam batao.
- Agar sure nahi ho, likho:
  “Plant exact identify nahi ho raha, par yeh _ type ka lag raha hai (indoor/vegetable/flowering).”

🔍 Observation from Image:
- Jo dikhta hai usko objectively likho.

💭 Differential Reasoning (MANDATORY LOGIC STEP – NEVER SKIP):

- Tumhe hamesha kam se kam 2 possibilities compare karni hi hain.
- Agar image me yeh patterns dikhein:
  - Leaf edges brown / burnt
  - Yellowing between veins
  - Slow growth
  - Weak stems

  Toh tumhe comparison me at least ek nutrient deficiency
  (Nitrogen / Potassium / Magnesium / Iron) zaroor include karni hi hai.

- Is section me tumhe yeh teen cheezein likhni hi hongi:
  1. Ek environmental cause (Sun Stress / Heat / Overwatering)
  2. Ek nutrient-related cause
  3. Clear reasoning:
     “Yahan pattern _ hai, jo _ me hota hai,
      jabki _ me _ hota hai.
      Isliye _ zyada match karta hai.”

- Agar tum yeh logic nahi likhte, toh response galat maana jayega.

🩺 Final Diagnosis:
- Primary Issue:
- Alternate Possibility (low probability):

📊 Confidence:
- High / Medium / Low

💊 Treatment Plan:
- Action 1:
- Action 2:
- Action 3:

💉 Dose (agar applicable):
- Exact frequency + quantity

⚠️ Galtiyan jo nahi karni:
- 2 clear mistakes

🔁 Re-check:
- 1 line follow-up rule

Agar image unclear ho, clearly likho:
“Image thodi unclear hai, isliye diagnosis provisional hai.”

Har answer ek mini-training hona chahiye.
`;

    const messages = [
      {
        role: "system",
        content: isGardener
          ? GARDENER_PROMPT
          : imageUrl
            ? CUSTOMER_DIAG_PROMPT
            : CUSTOMER_PROMPT
      }
    ];

    if (imageUrl) {
      messages.push({
        role: "user",
        content: [
          { type: "text", text: message || "Is plant me kya dikkat hai?" },
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
      temperature: 0.25,
      max_tokens: 900,
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
      reply: "Something went wrong. Please try again."
    });
  }
}
