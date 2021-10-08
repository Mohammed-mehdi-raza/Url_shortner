const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const url = new Schema({
    orignalUrl: {
        type: String,
        require: true,
        unique: true
    },
    shortUrl: {
        type: Number,
        require: true,
        unique: true
    }
});

const newUrl = mongoose.model('url', url);

module.exports = newUrl;