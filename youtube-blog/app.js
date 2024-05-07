require("dotenv").config();
require("./db");
const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const Blog = require("./models/blog");

const app = express();
const PORT = process.env.PORT;

const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const {
  checkForAuthenticationCookie,
} = require("./middlewares/authentication");

//console.log("My name is", process.env.myname);  //To set environment variable, run command `set myname=lingaraj` in windows, in mac `export myname=lingaraj`

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.render("home", { user: req.user, blogs });
});

app.use("/user", userRouter);
app.use("/blog", blogRouter);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
