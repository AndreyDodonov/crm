'use strict';
const bcrypt = require('bcryptjs');
const User = require('../models/User');

module.exports.login = function(req, res) {
  
};

module.exports.register = async function(req, res) {    
    const candidate = await User.findOne({email: req.body.email});
    if (candidate) {
        // if user exist - send error
        res.status(409).json({
            message: 'Такой email уже занят'
        });
    } else {
        // create user
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const user = new User ({
            email : req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try {
        await user.save();
         res.status(201).json(user);
        } catch(e) {
            // TODO error code
        }
    }
};