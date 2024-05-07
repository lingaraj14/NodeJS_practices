const express = require("express");
const router = express.Router();

const {
  handleSignup,
  handleSignin,
  handleLogout,
} = require("../controllers/user");

router.route("/signup").get((req, res) => {
  res.render("signup");
});

router.route("/signin").get((req, res) => {
  res.render("signin");
});

router.route("/signup").post(handleSignup);
router.route("/signin").post(handleSignin);
router.route("/logout").get(handleLogout);

module.exports = router;
