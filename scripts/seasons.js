/*jslint es5:true, white:false */
/*globals $, Global, _, iF_Cycle, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Seasons;

(function (W) { //IIFE
    var name = 'Seasons',
        self = new Global(name, '(transition backgrounds)'),
        C = W.console,
        G = W.Globals,
        Df;

    Df = { // DEFAULTS
        time: 22222,
        host: '#Port',
        cycle: null,
        nomList: ['summer', 'autumn', 'winter', 'spring'],
        inits: function () {
            $.extend(true, self, iF_Cycle(Df, this.nomList));
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _rotate() {
        if (Df.looping) {
            return;
        }
        self.ic_init();
        self.ic_next();
        Df.looping = true;
        Df.tref = W.setInterval(self.ic_next, Df.time);
    }

    function _watchProgress(prog) {
        if (Df.cycle.manual) {
            return;
        }
        if (prog > 25 && prog <= 45) {
            self.ic_pick('autumn');
        } else if (prog > 45 && prog <= 70) {
            self.ic_pick('winter');
        } else if (prog > 70 && prog <= 95) {
            self.ic_pick('spring');
        } else {
            self.ic_pick('summer');
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        $.PS_sub('refresh', function (evt, pct) {
            Seasons.refresh(pct);
        }); // changeTo(W.remember().season);
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        loop: _rotate,
        init: _init,
        refresh: _watchProgress,
        current: function () {
            self.ic_name();
        },
        // iF_Cycle
        // // ic_look // ic_name // ic_next // ic_numb // ic_pick // ic_prev
    });

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


 */
