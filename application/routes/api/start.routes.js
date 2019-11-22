const express = require('express');

const Controller = require('../../controllers/start.controller');

let router = express.Router();

router.get('/ping', Controller.ping);

module.exports = router;
