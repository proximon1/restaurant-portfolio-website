import express from 'express';
import { renderMain } from "../controllers/mainController.js";
import { renderContact } from "../controllers/contactController.js";
import { renderPrivacy } from "../controllers/privacyController.js";
import { renderExampleproject } from "../controllers/exampleprojectController.js";
import { renderProject } from "../controllers/projectController.js";
import { loginAdmin, renderLogin, renderAdminDashboard, logoutAdmin, renderAdminProjects, renderAdminStatistics, renderAdminLanding } from "../controllers/adminController.js";
import { requireAuth } from "../middlewares/auth.js";
import { adminLayout } from "../middlewares/adminLayout.js";

const router = express.Router();

router.use("/admin", adminLayout);

router.get("/", renderMain);
router.get("/contact", renderContact);
router.get("/privacy", renderPrivacy);
router.get("/exampleproject", renderExampleproject);
router.get("/projects/:slug", renderProject);

router.get("/admin/login", renderLogin);
router.get("/admin/logout", logoutAdmin);
router.get("/admin", requireAuth, renderAdminDashboard);
router.get("/admin/landing", requireAuth, renderAdminLanding);
router.get("/admin/statistics", requireAuth, renderAdminStatistics);
router.get("/admin/projects", requireAuth, renderAdminProjects)
router.post("/admin/login", loginAdmin);

export default router;