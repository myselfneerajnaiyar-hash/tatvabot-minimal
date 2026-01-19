import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Disable body parsing
export const config = {
  api: {
    bodyParser: false,
    responseLimit: false,
  },
};

export default async function handler(req, res) {
  // CORS for PWA / mobile
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  const form = new formidable.IncomingForm({
    maxFileSize: 10 * 1024 * 1024, // 10 MB
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error:', err);
      return res.status(500).json({ ok: false, error: err.message });
    }

    const file = files.file;
    if (!file) {
      return res.status(400).json({ ok: false, error: 'No file received' });
    }

    try {
      const result = await cloudinary.uploader.upload(file.filepath || file.path, {
        folder: 'tatvabot-uploads',
      });

      return res.status(200).json({
        ok: true,
        url: result.secure_url,
        result,
      });
    } catch (e) {
      console.error('Cloudinary upload error:', e);
      return res.status(500).json({ ok: false, error: e.message });
    }
  });
}
