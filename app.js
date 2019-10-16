'use strict';

const express = require('express'),
      app = express(),
      bodyParser = require('body-parser'),
      authRouts = require('./routes/auth'),
      analyticRouts = require('./routes/analytic'),
      categoryRouts = require('./routes/category'),
      orderRouts = require('./routes/order'),
      positionRouts = require('./routes/position');

app.use(require('morgan')('dev'));
app.use(require('cors')());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use('/api/auth', authRouts);
app.use('/api/analytic', analyticRouts);
app.use('/api/category', categoryRouts);
app.use('/api/order', orderRouts);
app.use('/api/position', positionRouts);

module.exports = app;