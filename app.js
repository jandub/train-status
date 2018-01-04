const express = require('express');
const path = require('path');
const logger = require('morgan');

const index = require('./routes/index');

const app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

module.exports = app;
