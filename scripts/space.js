/*jslint white:false */
/*globals $, _, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// ODDBALL
// tracks the dimensions of a div
// has methods for establishing properties
// @ standardize
(function (W) {
    var name = 'Space',
        C = W.console,
        _reg = [],
        construct;

    C.debug('load', name, '(div dimensions xsr)');

    construct = function Space(sel) {
        var my = this;
        my.jq = $(sel);
        my.el = my.jq.get(0);
        my.id = 'space';
        my.resize();
        construct._reg(my);
    };

    construct._reg = function (x) {
        if (x) {
            _reg.push(x);
        }
        return _reg;
    };

    function asPix(pix, tot) {
        return _.pct_raw(pix, tot);
    }

    function pixAsPer(pix, tot) {
        return _.pct_formatted(pix, tot);
    }

    construct.prototype = {
        set: 0,
        resize: function () {
            var my = this;
            my.measure(my.el.scrollWidth, my.el.clientWidth, 'horz');
            my.measure(my.el.scrollHeight, my.el.clientHeight, 'vert');
        },
        measure: function (T, V, prop) {
            this[prop] = {
                total: T,
                view: V,
                midspace: T / 2,
                midview: V / 2,
                scrollmax: T - V,
            };
        },
        getPercent_h: function (pix) {
            return asPix(pix || this.el.scrollLeft, this.horz.scrollmax);
        },
        getPercent_v: function (pix) {
            return asPix(pix || this.el.scrollTop, this.vert.scrollmax);
        },
        getPercent_hper: function (pix) {
            return pixAsPer(pix || this.el.scrollLeft, this.horz.scrollmax);
        },
        getPercent_vper: function (pix) {
            return pixAsPer(pix || this.el.scrollTop, this.vert.scrollmax);
        },
        // get ratio from point within total
        setScroll_h: function (num) {
            this.jq.scrollLeft(num);
            return num;
        },
        setScroll_v: function (num) {
            this.jq.scrollTop(num);
            return num;
        },
        scrollToCenter: function () {
            var my = this;
            C.debug(name, 'midview at ', [my.setScroll_h(my.horz.scrollmax / 2), my.setScroll_v(my.vert.scrollmax / 2)]);
        },
        scrollToStart: function (xp, yp) {
            var my = this;
            C.debug(name, 'start at ', [my.setScroll_h(my.horz.scrollmax * (xp || 0)), my.setScroll_v(my.vert.scrollmax * (yp || 1))]);
        },
        // push pin at center min and center max [offset by 1/2 of view]
        showBounds_h: function () {
            var my = this;
            my.jq.bg_Pin([my.horz.midview, 11]);
            my.jq.bg_Pin([my.horz.midspace, 11]);
            my.jq.bg_Pin([my.horz.scrollmax + my.horz.midview, 11]);
        },
        showBounds_v: function () {
            var my = this;
            my.jq.bg_Pin([11, my.vert.midview]);
            my.jq.bg_Pin([11, my.vert.midspace]);
            my.jq.bg_Pin([11, my.vert.scrollmax + my.vert.midview]);
        },
    };

    W[name] = construct;

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
