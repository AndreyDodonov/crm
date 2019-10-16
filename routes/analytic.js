'use strict';

const express = require('express'),
      router = express.Router(),
      controller = require('../controllers/analytic');

router.get('/overview', controller.overview);
router.get('/analytic', controller.analytic);



module.exports = router;