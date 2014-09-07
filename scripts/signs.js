/*jslint es5:true, white:false */
/*globals $, Global, Points, _, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Signs;

(function (W) { //IIFE
    var name = 'Signs',
        self = new Global(name, '(objects along the road)'),
        C = W.console,
        G = W.Globals,
        Df, Div;

    Df = { // DEFAULTS
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
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    _.addCounter(self);

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
        var $me, posi, size, css = {},
            tmp;

        $me = $(this);
        posi = up ? 0 : 500;
        size = up ? '100% 100%' : '100% 10%';

        if (G.BPY) {
            css.backgroundPositionY = posi;
        } else { // FF workaround
            tmp = 'backgroundPosition';
            posi = (' ' + posi + 'px');
            css[tmp] = $me.css(tmp).replace(/\s\S+/, posi);
        }
        css.backgroundSize = size;
        $me.css(css);

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
        for (i = 0; i < (G.stops + 1); i++) { // NUMBER OF SIGNS
            addSign(self.inc());
        }
        G.signs.all = Df.cache;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        var i;

        if (self.inited(true)) {
            return null;
        }

        initDiv();
        initSigns();
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        auto: enableAutoPositioning,
        flip: flipSign,
        index: lookupIndex,
    });

}(window));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


*/
