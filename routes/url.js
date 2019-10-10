const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortid = require("shortid");
const config = require("config");

const Url = require("../models/Url");


router.get("/", async (req, res) => {
  const longUrl  = req.query.url;
  const baseUrl = config.get("baseUrl");

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base url");
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.render("index", { url: url.shortUrl });
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();
  
        
        res.render("index", { url: url.shortUrl });
      }
    } catch (err) {
      console.error(err);
        res.render("index", { url: "error occured" });
    }
  } else {
        res.render("index", { url: "error" });
  }
});


module.exports = router;
