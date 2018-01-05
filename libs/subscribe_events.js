/*
 * Event generator from the assignment
 * Black box, do not change/refactor this
 */
export default function(cb, averageDelay) {
    const n = "ABCD";
    const ts = [0,0,0,0];
    (function cE() {
        const r = Math.random();
        const t = Math.abs(Math.round(r*4 - 0.5));
        const s = ts[t];
        let a;
        if(Math.round(r * 1237) % 3 === 2 && s === 0) {
            a = 'reverse';
        } else {
            a = (s === 0) ? 'depart' : 'arrive';
            ts[t] = (s + 1) % 2;
        }
        cb({train: n[t], action: a });
        setTimeout(cE, Math.random() * averageDelay*2);
    })();
}