/*jslint es5:true, white:false */
/*globals $, Data, Global, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Vehicle;

(function (W) {
    var name = 'Vehicle',
        self = new Global(name, '(bucket for the bolts)'),
        C = W.console,
        Mod = Data.models,
        Df, Div;

    Df = { // DEFAULTS
        list: ['compact', 'midsize', 'minivan', 'utility'],
        motionClass: 'roll',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

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

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        _makeDiv();
        _setModel(W.remember().model);

        $.PS_sub('stopped', function () {
            hitBrake();
        });
        $.PS_sub('moving', function () {
            giveGas();
        });

        return this;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        move: giveGas,
        halt: hitBrake,
        type: _setModel,
    });

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
