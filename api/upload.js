// /api/upload.js
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable Next/Vercel body parser for file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const form = new formidable.IncomingForm();

  return form.parse(req, async (err, fields, files) => {
    if (err || !files.file) {
      return res.status(400).json({ error: "No file received" });
    }

    try {
      const uploadRes = await cloudinary.uploader.upload(files.file.filepath, {
        folder: "tatvabot-uploads",
      });

      // ⭐ ONLY RETURN CLEAN URL — NOT FULL JSON
      return res.status(200).json({
        url: uploadRes.secure_url,
      });

    } catch (error) {
      return res.status(500).json({
        error: "Upload failed",
        details: String(error),
      });
    }
  });
}
