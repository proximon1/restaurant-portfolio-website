import express from 'express';
import { renderMain } from "../controllers/mainController.js";
import { renderContact } from "../controllers/contactController.js";
import { renderPrivacy } from "../controllers/privacyController.js";
import { renderExampleproject } from "../controllers/exampleprojectController.js";
import { renderProject } from "../controllers/projectController.js";
import { loginAdmin, renderLogin, renderAdminDashboard, logoutAdmin } from "../controllers/adminController.js";
import { requireAuth } from "../middlewares/auth.js";

const router = express.Router();
router.get("/", renderMain);
router.get("/contact", renderContact);
router.get("/privacy", renderPrivacy);
router.get("/exampleproject", renderExampleproject);
router.get("/projects/:slug", renderProject);

router.get("/admin/login", renderLogin);
router.get("/admin/logout", logoutAdmin);
router.get("/admin", requireAuth, renderAdminDashboard);
router.post("/admin/login", loginAdmin);


export default router;