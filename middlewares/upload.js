import multer from "multer";

const storage = multer.diskStorage({
  destination: "public/images",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

export const uploadLanding = multer({ storage }).fields([
  { name: "mainVideo", maxCount: 1 },
  { name: "aboutImageSmall", maxCount: 1 },
  { name: "aboutImageLarge", maxCount: 1 },
  { name: "aboutVideo", maxCount: 1 }
]);

export const uploadProjectItem = multer({ storage }).single("image");