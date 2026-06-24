import { savePageView } from "../models/adminModel.js";

export const pageView = async (req, res, next) => {
  try {
    if (
      req.path.startsWith("/admin") ||
      req.path.startsWith("/api") ||
      req.path.includes(".")
    ) {
      return next();
    }

    await savePageView(req.path);

  } catch (err) {
    console.error("Page view error:", err);
  }

  next();
};