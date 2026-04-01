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
        res.render("admin/dashboard.ejs");
    } catch (error) {
        console.log("Can't load the admin page: " + error.message);
    };
};

export const logoutAdmin = (req, res) => {
  req.session.destroy(() => {
    res.redirect("admin");
  });
};

export const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const user = await getAdminByUsername(username);

  if (!user) return res.redirect("/admin/login?error=1");

  const valid = await bcrypt.compare(password, user.password_hash);
  if (!valid) return res.redirect("/admin/login?error=1");

  req.session.user = { id: user.id };

  res.redirect("/admin");
};