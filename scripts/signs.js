/*jslint white:false */
/*globals C, W, Globs, Util, _, jQuery,
    Points */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Signs = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Signs',
    self = new G.constructor(name, '(objects along the road)'),
    Df, Div;

    Df = G['+' + name] = { // DEFAULTS
        cnom: 'sign ',
        host: '#View',
        pfix: 'Obj-',
        wrap: '#Signs',
        // signs: ['go', 'ignition', 'battery', 'brake', 'fuel', 'starter', 'steering', 'sparkplug', 'radiator', 'window', 'stop'],
        signs: ['go', 'battery', 'brake', 'fuel', 'ignition', 'steering', 'radiator', 'sparkplug', 'starter', 'window', 'stop'],
        cache: [],
        offset: {
            gap: null,
            per: 0.65,
            pix: null,
        },
        // , 'buckleup',
        inits: function () {
            if (U.debug(1)) {
                W['_' + name] = this;
                C.debug(this);
            }
            Df.inited = true;
        },
    };
    _.addCounter(self);

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function addSign(idx) {
        var ele, idn, nom;

        nom = Df.signs[idx];
        idn = Df.pfix + idx;
        ele = $('<div>');

        ele.attr({
            id: idn,
            title: nom,
        }).data(name, {}) //
        .html($('<cite>').text(idn)) //
        .addClass(Df.cnom) //
        .css({
            backgroundImage: 'url(./images/signs/' + nom + '.png)',
            // somewhere out of view
            left: 1e4,
        });

        Df.cache.push(ele);
        ele.appendTo(Div);
    }

    function calcOffsets() {
        Df.offset.gap = (G.fullWidth / G.stops);
        Df.offset.pix = (G.port.width() * Df.offset.per);
        G.signs.off = Df.offset;
    }

    function reposition() {
        calcOffsets();

        $(Df.cache).each(function () {
            var $me = $(this),
            dat = $me.data(name);
            $me.css({
                left: (dat.base + Df.offset.pix),
            });
        });
    }

    function enableAutoPositioning() {
        calcOffsets();

        $(Df.cache).each(function (i, e) {
            var $me = $(e),
            dat = $me.data('Signs'),
            num = Df.offset.gap;

            dat.index = i;
            dat.base = (i * num);
        });
        $.PS_sub('resize', reposition);
    }

    function flipSign(evt, up) {
        var $me;

        $me = $(this);
        $me[up ? 'addClass' : 'removeClass']('up');

        if ($me.data().inview) {
            $.PS_pub('signview', this);
            G.arrowControl = 0;
        } else { // toc indeterminate
            $.PS_pub('signview', false);
        //            Points.snap();
        }
    }

    function lookupIndex(ele) {
        var dat = $(ele).data();
        return dat ? dat.Signs.index : null;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function initDiv() {
        Div = $(Df.wrap);
        Div.text(Df.wrap);
        Div.appendTo(Df.host);
    }

    function initSigns() {
        var i;
        for (i = 0; i < (G.stops + 1); i++) { // NUMBER OF SIGNS
            addSign(self.inc());
        }
        G.signs.all = Df.cache;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INVOKE

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        initDiv();
        initSigns();

        return self;
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        init: _init,
        auto: enableAutoPositioning,
        flip: flipSign,
        index: lookupIndex,
    });

    return self;
}(jQuery, Globs, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
