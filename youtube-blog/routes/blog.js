const express = require("express");
const multer = require("multer");
const {
  createNewBlog,
  handleAddBlog,
  handleDisplayBlog,
  handleComment,
} = require("../controllers/blog");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}_${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get("/add-new", createNewBlog);
router.post("/add", upload.single("coverImage"), handleAddBlog);
router.get("/:id", handleDisplayBlog);
router.post("/comment/:id", handleComment);
module.exports = router;
