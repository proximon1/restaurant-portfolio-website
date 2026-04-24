export const desktopOnly = (req, res, next) => {
  const ua = req.headers['user-agent'] || "";

  const isMobile = /mobile|android|iphone|ipad|ipod/i.test(ua);

  if (isMobile) {
    return res.render("admin/mobile-blocked", {
      layout: false
    });
  }

  next();
};