'use strict';

const express = require('express'),
      router = express.Router(),
      controller = require('../controllers/auth');

router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router;