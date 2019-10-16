'use strict';

const express = require('express'),
      router = express.Router(),
      controller = require('../controllers/category');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id', controller.remove);
router.post('/:id', controller.create);
router.post('/:id', controller.update);



module.exports = router;