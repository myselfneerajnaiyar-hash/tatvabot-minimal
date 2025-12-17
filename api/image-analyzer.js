import OpenAI from "openai";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const form = formidable();

    const [fields, files] = await form.parse(req);
    const imageFile = files.image?.[0];

    if (!imageFile) {
      return res.status(400).json({ error: "No image uploaded" });
    }

    const imageBuffer = fs.readFileSync(imageFile.filepath);

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: "Analyze this plant disease and suggest treatment." },
            {
              type: "input_image",
              image_base64: imageBuffer.toString("base64"),
            },
          ],
        },
      ],
    });

    res.status(200).json({
      reply: response.output_text,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Image analysis failed",
      details: err.message,
    });
  }
}
