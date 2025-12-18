const express = require("express");
const router = express.Router();
const urlService = require("../services/urlService");

router.post("/shorten", (req, res) => {
    const { longUrl } = req.body;

    if (!longUrl) {
        return res.status(400).json({ error: "Long URL is required" });
    }

    const shortCode = urlService.shortenUrl(longUrl);

    res.json({
        shortUrl: `http://localhost:3000/${shortCode}`
    });
});

router.get("/analytics/:code", (req, res) => {
    const analytics = urlService.getAnalytics(req.params.code);

    if (!analytics) {
        return res.status(404).json({ error: "URL not found" });
    }

    res.json(analytics);
});

module.exports = router;
