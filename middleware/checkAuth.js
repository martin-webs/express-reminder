// export const ensureAuthenticated = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/auth/login");
// };

// export const forwardAuthenticated = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/reminder");
// };

module.exports = {
  ensureAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/auth/login");
  },
  forwardAuthenticated: function (req, res, next) {
    if (!req.isAuthenticated()) {
      return next();
    }
    res.redirect("/reminder");
  },
};
