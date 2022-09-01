var express = require("express");
var router = express.Router();
const passport = require("passport");
const Custom = require("../models/custom")

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", {
    title: "Express",
    user: req.user,
    name: req.query.name,
    custom: Custom,
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/",
    failureRedirect: "/",
  })
);

router.get("/logout", function (req, res, next) {
  req.logout(function(err) {
    if (err) return next(err);
    res.redirect("/");
  });
});

module.exports = router;
