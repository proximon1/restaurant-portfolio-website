import sharp from "sharp";
import fs from "fs";
import path from "path";

export async function convertImages(req, res, next) {
  try {
    if (req.file) {
      req.file.path = await convert(req.file.path);
    }

    if (req.files) {
      for (const key in req.files) {
        for (const file of req.files[key]) {
          file.path = await convert(file.path);
        }
      }
    }

    next();
  } catch (err) {
    console.error("Image conversion error:", err);
    res.status(500).send("Image processing failed");
  }
}

async function convert(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  if (ext === ".heic" || ext === ".heif") {
    console.log("HEIC detected → keeping original (frontend should convert)");

    return filePath;
  }

  return filePath;
}