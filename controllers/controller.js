const path = require('path');
const NE = require('../models/Schema.js');
const dns = require('dns');
const url = require('url');
var short = 1;
const index = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'));
};

const add = (req, res) => {
    let u = req.body.url;
    const parsedUrl = url.parse(u);
    dns.lookup(parsedUrl.protocol ? parsedUrl.host : parsedUrl.path, async(err, address) => {
        if (err) {
            console.log(err);
            res.json({ "error": "Invalid URL" });
        } else if (parsedUrl.protocol == null) {
            res.json({ "error": "Invalid URL" });
        } else if (parsedUrl.pathname == null) {
            res.json({ "error": "Invalid URL" });
        } else {
            console.log(parsedUrl);
            const ne = await NE.findOne({ orignalUrl: u });
            if (ne) {
                res.json({ "original_url": ne.orignalUrl, "short_url": ne.shortUrl });
            } else {
                NE.find().sort({ _id: -1 }).exec(async(error, result) => {
                    if (error) {
                        console.log(error);
                    }
                    if (result.length) {
                        short = parseInt(result[0].shortUrl + 1);
                        const nu = new NE({
                            orignalUrl: u,
                            shortUrl: short
                        });
                        const re = await nu.save();
                        console.log(re);
                        res.json({ "original_url": re.orignalUrl, "short_url": re.shortUrl });
                    } else {
                        const nu = new NE({
                            orignalUrl: u,
                            shortUrl: short
                        });
                        const re = await nu.save();
                        console.log(re);
                        res.json({ "original_url": re.orignalUrl, "short_url": re.shortUrl });
                    }
                })
            }
        }
    });
}

const redirect = async(req, res) => {
    let short = req.params.short;
    const n = await NE.findOne({ shortUrl: short });
    if (n) {
        res.redirect(n.orignalUrl);
    } else {
        res.json({ "error": "No short URL found for the given input" });
    }
};

module.exports = { index, add, redirect };