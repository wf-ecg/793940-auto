/*jslint es5:true, white:false */
/*globals $, Data, console, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Vehicle;

(function (W) {
    var name = 'Vehicle',
        C = W.console,
        self = {},
        def = {},
        cnom = 'roll',
        dat = Data.models,
        div, init, methods;

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    def = {
        list: ['compact', 'midsize', 'minivan', 'utility'],
    };
    $.noop(def);

    function makeDiv() {
        if (div && div.length) {
            return div;
        }
        div = $('<div id="Vehicle">') //
        .appendTo('#Static');
    }

    function setModel(nom) {
        init();
        W.remember({
            model: nom
        });

        div.removeClass(self.name);
        self.name = nom;

        div.addClass(nom);
        $.extend(true, dat[nom], dat.defaults);
        div.css(dat[nom].css);
    }

    function stop() {
        div.removeClass(cnom);
    }

    function move() {
        stop();
        div.addClass(cnom);
    }

    init = function () {
        if (div) {
            return null;
        }
        makeDiv();
        setModel(W.remember().model);
        return this;
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    methods = {
        init: init,
        move: move,
        stop: stop,
        type: setModel,
    };

    W[name] = $.extend(self, methods);

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*




 */
