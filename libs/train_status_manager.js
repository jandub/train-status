/*
 *  I am not sure if using classes is the best practice. It seems like the js
 *  community is quite split on this. It is still just a different syntax for
 *  the prototype pattern and does not allow clean approach for having private
 *  variables or constants. There should be updates for this in next specification.
 *
 *  Regarding the constats, I decided to keep them outside the class definition.
 *  That is not perfect, but it keeps them private, reasonably read-only and also at
 *  the top of the file.
 *  The private variables are prefixed with an underscore and have no setter. I feel 
 *  like that is enough for this case. WeakMap might be better way for other cases.
 */

/*
 *  Constants
 */
const defStation = 'Y'; // All trains should start in station 'Y'
const defDirection = 1; // facing clockwise direction
const trains = ['A', 'B', 'C', 'D'];
const stations = ['Z', 'Y', 'X', 'V', 'W'];

class TrainStatusManager {
    /*
     *  Initializes the train statuses object with default data.
     */
    constructor() {
        this._statuses = {};

        for (const train of trains) {
            this._statuses[train] = {
                'station': defStation,
                'direction': defDirection,
                'next_station': null,
                'action': null
            };
        }
    }

    /*
     *  Getters
     */
    get statuses() {
        return this._statuses;
    }

    /**
     *  Updates status of train.
     *
     *  @param  {Object} statusUpdate           The update object.
     *  @param  {String} statusUpdate.train     Name of the train.
     *  @param  {String} statusUpdate.action    Updated action of the train.
     *
     *  @return {Object} Updated status of the train.
     */
    update({train, action}) {
        const status = this._statuses[train];
        status.action = action;
        
        switch (action) {
            case 'reverse':
                status.direction = -status.direction;
                break;
            case 'arrive':
                status.station = status.next_station;
                status.next_station = null;
                break;
            case 'depart':
                status.next_station = this._getNextStation(status.station, status.direction);
                break;
        }
        
        return status;
    }

    /**
     *  Returns next station base on current train location and its direction.
     *
     *  @param  {String} currentStation Name of current station.
     *  @param  {Number} direction      1 for clockwise or -1 for counter-clockwise.
     *
     *  @return {String} Name of next station.
     */
    _getNextStation(currentStation, direction) {
        const currentIdx = stations.indexOf(currentStation);
        let nextIdx = currentIdx + direction;

        if (nextIdx < 0) {
            nextIdx = stations.length - 1;
        }

        if (nextIdx > stations.length - 1) {
            nextIdx = 0;
        }
         
        return stations[nextIdx];
    }
}

export default TrainStatusManager;