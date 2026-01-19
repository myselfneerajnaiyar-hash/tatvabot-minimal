import { GARDENER_ISSUES } from "../lib/gardener_issues.js";
import OpenAI from "openai";

export default async function handler(req, res) {
  try {
    const { message, imageUrl, isGardener } = req.body || {};

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

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

You have a fixed medical handbook of plant issues:

${JSON.stringify(GARDENER_ISSUES, null, 2)}

Your job:
1. Image dekh kar plant ka naam identify karo agar possible ho.
   - Agar 100% sure na ho, likho: "Plant exact identify nahi ho raha, par yeh _ type ka lag raha hai."

2. Sirf upar diye gaye issues me se hi ek issue choose karo.
   - Nayi disease ya problem invent mat karo.
   - Sabse closest match lo.

3. Response hamesha doctor-style prescription jaisa ho:

Format exactly like this:

🌿 Plant: <Plant Name or Best Guess>

🩺 Problem:
<Selected Issue Name>

🔍 Lakshan (Symptoms):
- ...

🧠 Karan (Cause):
<Short cause>

💊 Treatment Plan:
- Step 1
- Step 2
- Step 3

📏 Dose:
<Exactly the dosage written in the issue>

⚠️ Galtiyan jo nahi karni:
- ...

⏳ Recovery Time:
<From issue>

📊 Confidence:
<High / Medium / Low>

Rules:
- Hinglish me likho (simple Hindi + English).
- Sirf handbook ka data use karo.
- Dose ya medicine khud se mat banao.
- Agar sure na ho, confidence Low rakho.
- Ye answer gardener field me directly use karega.
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
      reply: "Something went wrong. Please try again."
    });
  }
}
