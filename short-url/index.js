require("./db");
const express = require("express");
const path = require("path");
const app = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 8000;

const { restrictToLoginUserOnly, checkAuth } = require("./middlewares/auth");

//
const Url = require("./models/url");

// set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

//Routes
const urlRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/url", restrictToLoginUserOnly, urlRoute);
//app.use("/", urlRoute);
app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
