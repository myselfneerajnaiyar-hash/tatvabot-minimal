// api/upload.js  (Vercel / Next-style serverless handler)
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';

// configure cloudinary from env (set in Vercel / env)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// disable default body parsing for Next/Vercel
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Only POST allowed' });
  }

  // parse multipart form with formidable
  const form = new formidable.IncomingForm();
  try {
    const parsed = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) return reject(err);
        resolve({ fields, files });
      });
    });

    const file = parsed.files?.file || parsed.files?.image; // check common keys
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // formidable-local file path
    const path = file.filepath || file.path || file.file; // different versions
    // Upload with upload_stream for less memory use (we'll pass path for simplicity)
    const result = await cloudinary.uploader.upload(path, {
      folder: 'tatvabot-uploads',
      use_filename: true,
      unique_filename: true,
      overwrite: false,
    });

    // Return only the URL to the client
    return res.status(200).json({ url: result.secure_url || result.url });
  } catch (err) {
    console.error('Upload handler error:', err);
    return res.status(500).json({ error: 'Upload failed', details: err.message || String(err) });
  }
}
