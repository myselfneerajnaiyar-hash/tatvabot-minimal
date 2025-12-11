// api/upload.js (Vercel / Next style serverless function)
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// disable default body parsing (Next/Vercel)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Only POST');

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).send('parse error: ' + err.message);
    const file = files.file;
    if (!file) return res.status(400).send('no file');

    try {
      const result = await cloudinary.uploader.upload(file.filepath || file.path, {
        folder: 'tatvabot-uploads',
      });
      return res.json({ ok: true, url: result.secure_url, result });
    } catch (e) {
      console.error('upload error', e);
      return res.status(500).json({ ok: false, error: e.message });
    }
  });
}
