const express = require("express");
const app = express();
const urlController = require("./controllers/urlController");
const urlService = require("./services/urlService");

app.use(express.json());
app.use("/api", urlController);

app.get("/:code", (req, res) => {
    const longUrl = urlService.getLongUrl(req.params.code);

    if (!longUrl) {
        return res.status(404).send("URL not found");
    }

    res.redirect(longUrl);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
