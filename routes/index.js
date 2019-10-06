const express = require("express");
const router = express.Router();

const Url = require("../models/Url");

// @route     GET /:code
// @desc      Redirect to long/original URL
router.get("/:code", async (req, res) => {
  try {
       
    const url = await Url.findOne({ urlCode: req.params.code });

    if (url) {
      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("No url found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});
router.get("/", async (req, res) => {
  res.send(
    '<img style="width: 100%; height: auto;" src="https://theguidex.com/wp-content/uploads/2017/03/maxresdefault.jpg" />'
  );
});


module.exports = router;
