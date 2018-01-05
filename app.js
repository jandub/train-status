import express from 'express';
import path from 'path';
import logger from 'morgan';

import index from './routes/index';

import eventProcInit from './libs/event_proc_init';


const app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

// start generating and processing train status events
eventProcInit();


export default app;