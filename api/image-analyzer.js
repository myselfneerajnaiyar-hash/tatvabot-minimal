import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function analyzeImageSymptoms(imageUrl) {
  const messages = [
    {
      role: "system",
      content: "You are a horticulture vision engine. Your only job is to list visible plant symptoms from the image. Do NOT give advice. Do NOT guess diseases. Only describe what you can see."
    },
    {
      role: "user",
      content: [
        { type: "text", text: "List visible plant symptoms from this image." },
        { type: "image_url", image_url: { url: imageUrl } }
      ]
    }
  ];

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.2
  });

  const text = response.choices[0].message.content || "";

  // Convert to array of symptoms
  const symptoms = text
    .split("\n")
    .map(s => s.replace(/^[\-\*\d\.\s]+/, "").trim())
    .filter(Boolean);

  return symptoms;
}
