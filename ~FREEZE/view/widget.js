/*jslint es5:true, white:false */
/*globals $, _Indexer, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function (W) {
    var self, name = 'Widget';

    self = function Widget() {
        var con = this.constructor;
        this.index = con._inc();
        this.configs = {
            element: $(),
            actions: [null],
            url: 'path/to.png',
        };
    };

    self._inc = _Indexer();

    W[name] = self;
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
