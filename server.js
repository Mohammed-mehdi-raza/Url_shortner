require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const routes = require('./routes/routes.js');
require('./db/conn.js')

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/public', express.static(`${process.cwd()}/public`));
app.use('/', routes);

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
    res.json({ greeting: 'hello API' });
});

app.get('*', (req, res) => {
    res.writeHead(404, {
        "content-Type": "text/plain"
    }).end("Not Found");
});

app.listen(port, function() {
    console.log(`Listening on port ${port}`);
});