/*jslint es5:true, white:false */
/*globals $, globals, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Seasons;

(function (W) { //IIFE
    var name = 'Seasons',
        C = W.console,
        G = W.globals,
        self = {},
        def = {},
        methods, init, X;

    C.debug('load ' + name + ' (change ground pngs)');

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    def.time = 22222;
    def.all = ['summer', 'autumn', 'winter', 'spring'];

    function changeTo(name) {
        $('#Port').removeClass().addClass(name);
        return name;
    }

    function getName(num) {
        num = (num || def.current);
        return def.all[num % 4];
    }

    function advance() {
        init();
        def.current++;

        X = getName();
        W.remember({
            season: X
        });
        changeTo(X);
    }

    function rotate() {
        if (def.looping) {
            return;
        }
        init();
        advance();
        def.looping = true;
        def.tref = W.setInterval(advance, def.time);
    }

    init = function () {
        if (def.inited) {
            return;
        }
        def.current = 0;
        def.inited = true;
        changeTo(W.remember().season);
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    methods = {
        loop: rotate,
        init: init,
        next: advance,
    };

    W[name] = $.extend(self, methods);
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
