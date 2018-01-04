import express from 'express';
import path from 'path';
import logger from 'morgan';

import index from './routes/index';

const app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

module.exports = app;
