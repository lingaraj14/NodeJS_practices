const User = require("../models/user");
const handleSignup = async (req, res) => {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });

  res.redirect("/");
};

const handleSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndCreateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    return res.render("signin", { error: "Invalid username or password" });
  }
};

const handleLogout = (req, res) => {
  res.clearCookie("token").redirect("/");
};

module.exports = {
  handleSignup,
  handleSignin,
  handleLogout,
};
