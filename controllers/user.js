const passport = require("passport");
const User = require("../models/user");

module.exports = {
  // GET Log In
  getLogin(req, res, next) {
    res.render("login");
  },

  // GET Sign Up
  getSignup(req, res, next) {
    res.render("signup");
  },

  // POST Sign Up
  postSignup(req, res, next) {
    if (!req.body.email || !req.body.name || !req.body.bio) {
      req.flash("errores", { message: "Debes llenar todos los campos!" });
      return res.redirect("/signup");
    }

    const newUser = new User({
      email: req.body.email,
      name: req.body.name,
      username: req.body.username,
      bio: req.body.bio
    });

    // Register method by passport-local-mongoose to register the user
    User.register(newUser, req.body.password, (err, user) => {
      if (err) {
        console.log(err);
        req.flash("errores", { message: err.message });
        return res.redirect("/signup");
      }

      passport.authenticate("local")(req, res, () => {
        res.redirect("/");
      });
    });
  },

  // POST Log In
  postLogin(req, res, next) {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login"
    })(req, res, next);
  },

  // GET Log Out
  getLogout(req, res, next) {
    req.logout();
    res.redirect("/");
  }
};
