/*jslint es5:true, white:false */
/*globals $, Cluster, Modernizr, Widget, _, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
Modernizr.load([{
    both: _.jsreRoot('view', ['indexer.js', 'cluster.js', 'layer.js', 'widget.js']),
    complete: function () {
        var View,
            W = window,
            C = W.console;

        View = {
            configs: {},
            clusters: [new Cluster(), new Cluster(), new Cluster()],
            controls: [new Widget(), new Widget(), new Widget(), new Widget()],
        };

        C.dir(View);
        W._View = View;
    },
}]);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
