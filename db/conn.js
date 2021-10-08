const mongoose = require('mongoose');
const p = require('path')
require('dotenv').config({
    path: p.resolve(__dirname, '../sample.env')
});
const URI = process.env['MONGO_URI'];
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('connection to database successful')).catch((e) => console.log(`not connected to database due to error ${e}`));