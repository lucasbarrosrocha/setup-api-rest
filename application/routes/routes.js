
const express = require('express');

// Routes
const start = require('./api/start.routes');
const user = require('./api/user.routes');

let router = express.Router();

router.use('/start', start);
router.use('/user', user);


module.exports = router;