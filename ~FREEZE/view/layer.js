/*jslint es5:true, white:false */
/*globals $, Layer, _Indexer, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function (W) {
    var self, name = 'Layer';

    self = function Layer() {
        var con = this.constructor;
        this.index = con._inc();
        this.configs = {
            element: $(),
            ratio: 1.1,
        };
    };

    function Set() {
        return [new Layer(), new Layer(), new Layer()];
    }

    self._inc = _Indexer();
    self.Set = Set;

    W[name] = self;
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
