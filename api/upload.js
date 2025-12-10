// api/upload.js
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Only POST allowed" });
    }

    const { imageData, folder } = req.body; // imageData = data URL (data:image/...)
    if (!imageData) return res.status(400).json({ error: "No imageData provided" });

    // Upload via Cloudinary from the data URL:
    const uploadResult = await cloudinary.uploader.upload(imageData, {
      folder: folder || "tatvabot-uploads",
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });

    return res.status(200).json({
      url: uploadResult.secure_url,
      public_id: uploadResult.public_id,
      raw: uploadResult,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return res.status(500).json({ error: "Upload failed", details: err.message });
  }
}
