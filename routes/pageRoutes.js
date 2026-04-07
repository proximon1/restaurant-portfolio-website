import express from 'express';
import { renderMain } from "../controllers/mainController.js";
import { renderContact } from "../controllers/contactController.js";
import { renderPrivacy } from "../controllers/privacyController.js";
import { renderExampleproject } from "../controllers/exampleprojectController.js";
import { renderProject } from "../controllers/projectController.js";
import { deleteProjectItem, updateProjectItem, createProjectItem, deleteProject, updateProject, loginAdmin, renderLogin, renderAdminDashboard, logoutAdmin, renderAdminProjects, renderAdminStatistics, renderAdminLanding , renderAdminProjectDetail, updateLanding, renderAdminProjectCreate, createProject} from "../controllers/adminController.js";
import { requireAuth } from "../middlewares/auth.js";
import { adminLayout } from "../middlewares/adminLayout.js";
import { uploadProjectItem, uploadLanding } from "../middlewares/upload.js";

const router = express.Router();
router.use("/admin", adminLayout);

router.get("/admin/login", renderLogin);
router.get("/admin/logout", logoutAdmin);
router.get("/admin", requireAuth, renderAdminDashboard);
router.get("/admin/landing", requireAuth, renderAdminLanding);
router.get("/admin/statistics", requireAuth, renderAdminStatistics);
router.get("/admin/projects", requireAuth, renderAdminProjects)
router.get("/admin/projects/new", requireAuth, renderAdminProjectCreate);
router.get("/admin/projects/:slug", requireAuth, renderAdminProjectDetail);
router.get("/admin/projects/delete/:id", deleteProject);
router.get("/admin/project-items/delete/:id", deleteProjectItem);
router.post("/admin/projects", requireAuth, createProject);
router.post("/admin/projects/:slug", updateProject);
router.post("/admin/project-items", uploadProjectItem, createProjectItem);
router.post("/admin/project-items/:id", uploadProjectItem, updateProjectItem);
router.post("/admin/login", loginAdmin);
router.post("/admin/landing", requireAuth, uploadLanding, updateLanding);

router.get("/", renderMain);
router.get("/contact", renderContact);
router.get("/privacy", renderPrivacy);
router.get("/exampleproject", renderExampleproject);
router.get("/projects/:slug", renderProject);

export default router;