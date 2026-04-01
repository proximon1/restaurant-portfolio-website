import bcrypt from "bcrypt";
import { getAdminByUsername } from "../models/adminModel.js";

export const renderLogin = (req, res) => {
    try {
        res.render("admin/login", { error: req.query.error || null });
    } catch (error) {
        console.log("Can't load the login page: " + error.message);
    };
};

export const renderAdminDashboard = (req, res) => {
    try {
        res.render("admin/dashboard.ejs", {
            currentPath: req.path,
            layout: "admin/layout"
        });
    } catch (error) {
        console.log("Can't load the admin page: " + error.message);
    };
};

export const renderAdminLanding = (req, res) => {
    try {
        res.render("admin/landing.ejs", {
            currentPath: req.path,
            layout: "admin/layout"
        });
    } catch (error) {
        console.log("Can't load the landing editor page: " + error.message);
    };
};

export const renderAdminStatistics = (req, res) => {
    try {
        res.render("admin/statistics.ejs", {
            currentPath: req.path,
            layout: "admin/layout"
        });
    } catch (error) {
        console.log("Can't load the statistics page: " + error.message);
    };
};

export const renderAdminProjects = (req, res) => {
    try {
        res.render("admin/projects.ejs", {
            currentPath: req.path,
            layout: "admin/layout"
        });
    } catch (error) {
        console.log("Can't load the admin projects page: " + error.message);
    };
};

export const logoutAdmin = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/admin/login");
  });
};

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const user = await getAdminByUsername(username);

  if (!user) return res.redirect("/admin/login?error=1");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.redirect("/admin/login?error=1");

  req.session.user = {
    id: user.id,
    username: user.username
  };

  res.redirect("/admin");
};