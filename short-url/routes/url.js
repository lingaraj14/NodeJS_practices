const express = require("express");
const {
  handleGenerateShortUrl,
  handleShortIdAndRedirect,
  handleGetAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", handleGenerateShortUrl);
router.get("/:shortId", handleShortIdAndRedirect);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
