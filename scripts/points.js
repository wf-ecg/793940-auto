/*jslint white:false */
/*globals C, W, Globs, Util, _, jQuery,
    Platter */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Points = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Points',
    self = new G.constructor(name, '(getting to/from conceptual points)'),
    Df, Div;

    Df = G['+' + name] = { // DEFAULTS
        host: '#Points',
        time: 22222,
        all: ['summer', 'autumn', 'winter', 'spring'],
        selector: '#Signs .sign',
        offsets: null,
        signs: null,
        freeScroll: true,
        cache: [],
        inits: function () {
            if (U.debug(1)) {
                W['_' + name] = this;
                C.debug(this);
            }
            Df.signs = $(Df.selector);
            Df.inited = true;
        },
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function nom2num(nom) { // parse num from id or dom
        var num;

        if (typeof nom === 'object') {
            nom = nom.id;
        }
        num = nom.match(/\d+/g);

        return parseInt(num ? num[0] : 0, 10);
    }

    function lightUp(ele) { // dom or num
        if (_.isNumber(ele)) {
            ele = Df.cache[ele];
        }
        Div.find('a').removeClass('active');
        $(ele).addClass('active');
    }

    function determinate(evt, ele) {
        var $jq, dat, idx;

        $jq = $(ele);
        dat = $jq.data ? $jq.data() : null;
        idx = dat ? dat.Signs.index : - 1;

        if (idx > 0) {
            lightUp(idx);
            Div.addClass('known');
        } else {
            Div.removeClass('known');
        }
    // C.debug('determinate', idx);
    }

    function scrollTo(num) {
        $('#Scroll').scrollLeft(num);
    }

    function makeLink(jq) {
        var $me, ele, evts;

        evts = 'keydown.' + name + ' click.' + name;
        ele = jq[0];
        $me = $('<a>').attr({
            tabindex: 99,
            title: 'Waypoint ' + jq.id,
        });

        $me.text(nom2num(ele)) //
        .on(evts, function (evt) {
            if (Keypress.isChoiceEvt(evt)) {
                lightUp(this);
                scrollTo(jq.data('Signs').base);
                Df.freeScroll = false;
            }
        });

        Df.cache.push($me);
        return $me;
    }

    function establishDiv() {
        Div = $('.waypoints'); // scope var
        if (!Div.length) {
            Div = $('<div class="waypoints">');
            Div.empty().appendTo(Df.host);
        }

        return Div;
    }

    function makeNavFrom(jqs) {
        Div = establishDiv();

        jqs.each(function (i) {
            var span = $('<span>').addClass('pointwrap');

            span.append(makeLink($(this)));
            Div.append(span);
            if (!i) {
                span.hide();
            }
        });
    }

    function initOffsets() {
        C.debug('initOffsets', name);
        Df.offsets = $.map(Df.signs, function (e, i) {
            var a, b;
            a = $(e).data('Signs').base; // target screen left
            b = e.offsetLeft; //            sign position
            // C.debug('offset', a, b);
            return a;
        // return e.offsetLeft; offset of sign (not screen)
        });
    }

    function calcDeltas(num, offsets) {
        var deltas = $.map(offsets, function (e, i) {
            return Math.abs(num - e);
        });
        return deltas;
    }

    function lowestOf(deltas) {
        var dif = Infinity,
        idx = null;

        $.each(deltas, function (i, e) {
            if (e <= dif) {
                dif = e;
                idx = i;
            }
        });
        return idx;
    }

    function getPosition() { // of target
        return G.scroll.div.scrollLeft;
    }

    function getCurrent() { // of present
        return G.signs.div.scrollLeft;
    }

    function getNearest(num) {
        var deltas = calcDeltas(num || getCurrent(), Df.offsets),
        nearest = lowestOf(deltas);
        return nearest;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _flipPage(evt) {
        var num = (evt.data.side === 'left') ? - 1 : 1;
        $('#Scroll').scrubLeft('+=' + 10000 * num);
    }

    function _initArrow(side) {
        var jq = $(Df.host + ' .arrow.' + side) //
        .on('click.' + name, {
            side: side,
        }, _flipPage);
        jq.attr({
            href: ('#' + side),
            tabindex: 99,
        });
        return jq;
    }

    function _goToNum(num) {
        Df.cache[num].trigger('click');
    }

    function _restart() {
        _goToNum(0);
        Platter.show(0);
    }

    function _handlePosition() {
        var nearest = getNearest(arguments[1]);

        lightUp(Df.cache[nearest]);
        $.PS_pub('nearest', nearest);

        return nearest;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INVOKE

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        makeNavFrom(Df.signs);

        _initArrow('left');
        _initArrow('right');

        $.PS_sub('resize', initOffsets);
        $.PS_sub('slideTo', _handlePosition);
        $.PS_sub('signview', determinate);
        $.PS_sub('nearest', function (evt, num) {
            W.clearTimeout(Df.timer);
            Df.timer = W.setTimeout(function () {
                C.debug('gotonum', num);
                _goToNum(num);
            }, 3333);
        });

        return self;
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        init: _init,
        lite: lightUp,
        goTo: _goToNum,
        near: function (num) {
            return _handlePosition(null, num);
        },
        snap: function () {
            _goToNum(getNearest());
        },
        restart: _restart,
        get: {
            target: function () {
                getNearest(getPosition());
            },
            current: function () {
                getNearest(getCurrent());
            },
            nearest: getNearest,
        },
    });

    return self;
}(jQuery, Globs, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
