'use strict';

const express = require('express'),
      router = express.Router(),
      passport = require('passport'),
      controller = require('../controllers/category');

router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:id', controller.getById);
router.delete('/:id', controller.remove);
router.post('/:id', controller.create);
router.patch('/:id', controller.update);



module.exports = router;