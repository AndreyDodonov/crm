'use strict';

const express = require('express'),
      app = express(),
      authRouts = require('./routes/auth'),
      analyticRouts = require('./routes/analytic'),
      categoryRouts = require('./routes/category'),
      orderRouts = require('./routes/order'),
      positionRouts = require('./routes/position');

app.use('/api/auth', authRouts);
app.use('/api/analytic', analyticRouts);
app.use('/api/category', categoryRouts);
app.use('/api/order', orderRouts);
app.use('/api/position', positionRouts);

module.exports = app;