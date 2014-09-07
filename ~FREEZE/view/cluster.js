/*jslint es5:true, white:false */
/*globals $, Layer, _Indexer, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function (W) {
    var self, name = 'Cluster';

    self = function Cluster() {
        var con = this.constructor;
        this.index = con._inc();
        this.configs = {
            element: $(),
            master_ratio: 1.0,
        };
        this.layers = new Layer.Set();
    };

    self._inc = _Indexer();

    W[name] = self;
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
