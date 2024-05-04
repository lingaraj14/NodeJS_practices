const path = require("path");
const express = require("express");
const multer = require("multer");

const app = express();
const PORT = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

//Code for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueFileName = `${Date.now()}-${file.originalname}`;
    return cb(null, uniqueFileName);
  },
});
const upload = multer({ storage }); //assign the directory to store file

//For single upload
app.get("/", (req, res) => {
  return res.render("homepage");
});

//For multiple upload
app.get("/multiple-upload", (req, res) => {
  return res.render("multiple-upload");
});

//For single upload
app.post("/upload", upload.single("profilePhoto"), (req, res, next) => {
  console.log(req.body);
  console.log(req.file);
  res.redirect("/");
});

//For multiple upload
app.post(
  "/uploads",
  upload.fields([{ name: "profilePhoto" }, { name: "coverPhoto" }]),
  (req, res, next) => {
    console.log(req.body);
    console.log(req.files);
    res.redirect("/multiple-upload");
  }
);

app.listen(PORT, () => console.log(`Server is running at ${PORT}`));
