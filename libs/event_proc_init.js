import subscribeEvents from './subscribe_events.js';
import TrainStatusManager from './train_status_manager.js';


const trainStatus = new TrainStatusManager();

const handleEvent = (status) => {
    const updateResult = trainStatus.update(status);
}

const initialize = (avgDelay = 5000) => {
    subscribeEvents(handleEvent, avgDelay);
}


export default initialize;