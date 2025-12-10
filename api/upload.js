// api/upload.js  (Vercel / Next-style serverless)
import { v2 as cloudinary } from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

// configure from env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// disable default body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Only POST');
  }

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Form parse error', err);
      return res.status(500).json({ ok: false, error: err.message });
    }

    // field name is "file" from the front-end
    const file = files.file;
    if (!file) {
      return res.status(400).json({ ok: false, error: 'No file' });
    }

    // formidable v2 stores path at file.filepath
    const localPath = file.filepath || file.path;

    try {
      const result = await cloudinary.uploader.upload(localPath, {
        folder: 'tatvabot-uploads',
        use_filename: true,
        unique_filename: true,
      });

      // remove local temp file if exists
      try { fs.unlinkSync(localPath); } catch (e) { /* ignore */ }

      return res.status(200).json({ ok: true, url: result.secure_url, result });
    } catch (uploadErr) {
      console.error('Cloudinary upload error', uploadErr);
      return res.status(500).json({ ok: false, error: uploadErr.message });
    }
  });
}
