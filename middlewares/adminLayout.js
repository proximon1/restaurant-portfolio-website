export const adminLayout = (req, res, next) => {
  if (req.path.startsWith("/admin")) {
    res.locals.layout = "admin/layout";
  }

  res.locals.currentPath = req.path;
  res.locals.user = req.session.user;

  next();
};