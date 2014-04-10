/*jslint es5:true, white:false */
/*globals C, W, Globs, Util, _, jQuery,
    Data */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Vehicle = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Vehicle',
    self = new G.constructor(name, '(bucket for the bolts)'),
    Df, Div, Mod;

    Mod = Data.models;
    Df = G['+' + name] = { // DEFAULTS
        list: ['compact', 'midsize', 'minivan', 'utility'],
        motionClass: 'roll',
        inits: function () {
            if (U.debug(1)) {
                W['_' + name] = this;
                C.debug(this);
            }
            Df.inited = true;
        },
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _makeDiv() {
        if (Div && Div.length) {
            return Div;
        }
        Div = $('<div id="Vehicle">') //
        .appendTo('#Static') //
        .append($('<div>').addClass('imgcache'));
    }

    function _setModel(nom) {
        self.inited();

        W.remember({
            model: nom
        });

        Div.removeClass(self.name);
        self.name = nom;

        Div.addClass(nom);
        $.extend(true, Mod[nom], Mod.defaults);
        Div.css(Mod[nom].css);
    }

    function hitBrake() {
        Div.removeClass(Df.motionClass);
    }

    function giveGas() {
        hitBrake();
        Div.addClass(Df.motionClass);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INVOKE

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        _makeDiv();
        _setModel(W.remember().model);

        $.PS_sub('stopped', function () {
            hitBrake();
        });
        $.PS_sub('moving', function () {
            giveGas();
        });

        return self;
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        init: _init,
        move: giveGas,
        halt: hitBrake,
        type: _setModel,
    });

    return self;
}(jQuery, Globs, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
