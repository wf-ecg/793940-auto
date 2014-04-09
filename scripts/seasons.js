/*jslint es5:true, white:false */
/*globals C, W, Globs, Util, _, jQuery,
    iF_Cycle */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Seasons = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Seasons',
    self = new G.constructor(name, '(transition backgrounds)'),
    Df;

    Df = G['+' + name] = { // DEFAULTS
        time: 22222,
        host: '#Port',
        cycle: null,
        nomList: ['summer', 'autumn', 'winter', 'spring'],
        inits: function () {
            if (U.debug(1)) {
                W['_' + name] = this;
                C.debug(this);
            }
            $.extend(true, self, iF_Cycle(Df, this.nomList));
            Df.inited = true;
        },
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

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
    /// INVOKE

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        $.PS_sub('refresh', function (evt, pct) {
            Seasons.refresh(pct);
        }); // changeTo(W.remember().season);
        return self;
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        init: _init,
        loop: _rotate,
        refresh: _watchProgress,
        current: function () {
            self.ic_name();
        },
    // iF_Cycle
    // // ic_look // ic_name // ic_next // ic_numb // ic_pick // ic_prev
    });

    return self;
}(jQuery, Globs, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
