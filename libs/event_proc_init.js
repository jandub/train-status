import subscribeEvents from './subscribe_events.js';
import TrainStatusManager from './train_status_manager.js';


const trainStatus = new TrainStatusManager();
let io;

/**
 *  Callback. Updates the train status and pushes the change to all
 *  listening clients through socket.io.
 *
 *  @param  {Object} statusUpdate           The update object.
 *  @param  {String} statusUpdate.train     Name of the train.
 *  @param  {String} statusUpdate.action    Updated action of the train.
 */
const handleEvent = status => {
    const trainData = trainStatus.update(status);
    const updateData = {
        'train': status.train,
        'data': trainData
    };

    io.emit('update', updateData);
}

/**
 *  Sends current status of all trains to newly connected socket.io
 *  clients. Also, it starts the event generator.
 *
 *  @param  {Object} socketio   Socket.io instance.
 *  @param  {Number} avgDelay   Average delay between train updates.
 */
const initialize = (socketio, avgDelay = 5000) => {
    io = socketio;

    io.on('connection', client => {
        client.emit('init_update', trainStatus.statuses);
    });

    subscribeEvents(handleEvent, avgDelay);
}


export default initialize;