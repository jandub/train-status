/*
 *  The tested class has multiple constants that make this test
 *  easily breakable by their change. In the given scenario 
 *  with trains/tracks and stations that change seems quite 
 *  unlikely, so I have hard-coded the values. Other scenarios
 *  might require a different approach.
 */

import { expect } from 'chai';
import TrainStatusManager from './../libs/train_status_manager';


describe('TrainStatusManager', () => {
    let trainStatus = null;

    beforeEach(() => {
        trainStatus = new TrainStatusManager();
    });

    it('Is correctly initialized', () => {
        const statuses = trainStatus.statuses;

        expect(statuses).to.have.keys('A', 'B', 'C', 'D');

        expect(statuses.A).to.have.keys('station', 'direction', 'next_station', 'action');
        expect(statuses.A.station).to.equal('Y');
        expect(statuses.A.direction).to.equal(1);
        expect(statuses.A.next_station).to.be.null;
        expect(statuses.A.action).to.be.null;
    });

    it('Handles "reverse" action', () => {
        const result = trainStatus.update({'train': 'A', 'action': 'reverse'});

        expect(result).to.have.keys('station', 'direction', 'next_station', 'action');
        expect(result.station).to.equal('Y');
        expect(result.direction).to.equal(-1);
        expect(result.next_station).to.be.null;
        expect(result.action).to.equal('reverse');
    });

    it('Handles "depart" action', () => {
        const result = trainStatus.update({'train': 'A', 'action': 'depart'});

        expect(result).to.have.keys('station', 'direction', 'next_station', 'action');
        expect(result.station).to.equal('Y');
        expect(result.direction).to.equal(1);
        expect(result.next_station).to.equal('X');
        expect(result.action).to.equal('depart');
    });

    it('Handles "arrive" action', () => {
        trainStatus.update({'train': 'A', 'action': 'depart'});
        const result = trainStatus.update({'train': 'A', 'action': 'arrive'});

        expect(result).to.have.keys('station', 'direction', 'next_station', 'action');
        expect(result.station).to.equal('X');
        expect(result.direction).to.equal(1);
        expect(result.next_station).to.be.null;
        expect(result.action).to.equal('arrive');
    });

    it('Can go around the whole track clockwise', () => {
        const expectedStations = ['X', 'V', 'W', 'Z', 'Y'];
        let result;

        for (let i = 0; i < 5; i++) {
            trainStatus.update({'train': 'A', 'action': 'depart'});
            result = trainStatus.update({'train': 'A', 'action': 'arrive'});
            expect(result.station).to.equal(expectedStations[i]);
        }
    });

    it('Can go around the whole track counter-clockwise', () => {
        const expectedStations = ['Z', 'W', 'V', 'X', 'Y'];
        let result;

        trainStatus.update({'train': 'A', 'action': 'reverse'});

        for (let i = 0; i < 5; i++) {
            trainStatus.update({'train': 'A', 'action': 'depart'});
            result = trainStatus.update({'train': 'A', 'action': 'arrive'});
            expect(result.station).to.equal(expectedStations[i]);
        }
    });
    
    it('Updates the list of all statuses', () => {
        const result = trainStatus.update({'train': 'A', 'action': 'depart'})

        expect(trainStatus.statuses.A).to.deep.equal(result);
    });
});