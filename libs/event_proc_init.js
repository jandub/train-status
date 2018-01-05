import subscribeEvents from './subscribe_events.js';

const initialize = (avgDelay = 5000) => {
	subscribeEvents(console.log, avgDelay);
}

export default initialize;