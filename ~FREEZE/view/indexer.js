/*jslint es5:true, white:false */
/*globals $, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function _Indexer() {
    return function Indexer() {
        if (!this._idx) {
            this._idx = 0;
        }
        return this._idx++;
    };
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
