'use strict';

const User = require('../models/User');

module.exports.login = function(req, res) {
  
};

module.exports.register = function(req, res) {    
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
    user.save().then (() => console.log('user created'));
};