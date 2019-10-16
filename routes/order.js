'use strict';

const express = require('express'),
      router = express.Router(),
      controller = require('../controllers/order');

router.get('/', controller.getAll);
router.post('/', controller.create);



module.exports = router;