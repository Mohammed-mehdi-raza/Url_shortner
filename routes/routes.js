const express = require('express');
const router = express.Router();
const { index, add, redirect } = require('../controllers/controller.js')

router.get('/', index);

router.post('/api/shorturl', add);

router.get('/api/shorturl/:short', redirect);

module.exports = router;