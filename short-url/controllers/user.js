const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("./service/auth");

const handleUserSignUp = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password });
  res.render("/");
};

const handleUserLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user)
    return res.render("login", { error: "Invalid username or password" });

  /* const sessionId = uuidv4();  //This is used for state full, without jwt
  setUser(sessionId, user);
  res.cookie("uid", sessionId); */

  const token = setUser(user);
  //res.cookie("uid", token);  //this will use, when we pass the joken by cookie

  res.json({ token }); //This is by response

  //res.redirect("/"); //this will use, when we pass the joken by cookie
};

module.exports = {
  handleUserSignUp,
  handleUserLogin,
};
