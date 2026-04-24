import multer from "multer";
import path from "path";
import fs from "fs";

const projectStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const slug = req.body.projectSlug;

    if (!slug) {
      return cb(new Error("Missing project slug"));
    }

    const dir = path.join(
      "public",
      "images",
      "uploads",
      "projects",
      slug
    );

    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    console.log("SAVING FILE:", file.originalname);
    cb(null, file.originalname);
  }
});

const landingStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join("public", "images", "landing");

    fs.mkdirSync(dir, { recursive: true });

    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const cleanName = file.originalname
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9.\-]/g, "");

    cb(null, cleanName);
  }
});

export const uploadProjectItem = multer({ storage: projectStorage }).single("image");

export const uploadLanding = multer({ storage: landingStorage }).fields([
  { name: "mainVideoVertical", maxCount: 1 },
  { name: "mainVideoHorizontal", maxCount: 1 },
  { name: "aboutImageSmall", maxCount: 1 },
  { name: "aboutImageLarge", maxCount: 1 },
  { name: "aboutVideo", maxCount: 1 }
]);