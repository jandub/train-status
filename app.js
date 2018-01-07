import express from 'express';
import path from 'path';
import logger from 'morgan';
import socketio from 'socket.io';

import index from './routes/index';

import eventProcInit from './libs/event_proc_init';


// initialize express
const app = express();
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', index);

// initialize socket.io, gets attached to the server in /bin/www
const io = socketio();
app.io = io;

// start generating and processing train status events
eventProcInit(io);


export default app;