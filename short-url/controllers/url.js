const ShortUniqueId = require("short-unique-id");
const Url = require("../models/url");
const { randomUUID } = new ShortUniqueId({ length: 10 });

const handleGenerateShortUrl = async (req, res) => {
  const shortId = randomUUID();
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required!" });

  await Url.create({
    shortId: shortId,
    redirectUrl: body.url,
    visitHistory: [],
  });

  return res.status(201).json({ id: shortId });
};

const handleShortIdAndRedirect = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: { timestamp: Date.now() },
      },
    },
    {
      new: true, //if you pass theis optional parameter, it will return the updated field also
    }
  );

  console.log("entry:", entry);

  res.redirect(entry.redirectUrl);
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await Url.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  handleGenerateShortUrl,
  handleShortIdAndRedirect,
  handleGetAnalytics,
};
