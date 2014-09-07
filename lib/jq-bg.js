/*jslint es5:true, white:false */
/*globals $, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function ($) {
    var Fn = $.fn,
        W = window,
        C = W.console;

    function getBPxy(ele) {
        var jq = $(ele);
        return {
            id: ele[0].id,
            top: parseInt($(jq).css('backgroundPositionY'), 10),
            left: parseInt($(jq).css('backgroundPositionX'), 10),
            jq: jq,
        };
    }

    Fn.bg_Data = function (obj) { // set or get
        // SINGULAR for now // get me, data
        var jq = $(this),
            _D = jq.data('Bkgr') || this.bg_init();
        // obj extends
        if (obj) {
            $.extend(_D, obj);
        }
        if (W.debug > 1) {
            C.debug(_D);
        }
        return _D;
    };

    Fn.bg_init = function () { // default
        var _D = getBPxy(this);
        _D.iniL = _D.left | 0;
        _D.iniT = _D.top | 0;
        _D.jq.data('Bkgr', _D);
        return _D;
    };

    Fn.bgPosition = function (x, y) {
        var _D = this.bg_Data();
        // SINGULAR for now
        if (x === y === undefined) {
            return [-_D.left, - _D.top];
        } else {
            _D.left = (-x || 0);
            _D.top = (-y || 0);
            _D.jq.css({
                backgroundPosition: (_D.left + _D.iniL + 'px ') + (_D.top + _D.iniT + 'px'),
            });
            /// update readouts publish update
            return this;
        }
    };

    Fn.bg_Move = function (x, y) {
        var _D = this.bg_Data();
        // SINGULAR for now
        this.bgPosition(-_D.left + x, - _D.top + y);
    };

    Fn.bg_Pin = function (off) {
        off = off || {};
        var std = {
            left: off.left || off[0] || 100,
            top: off.top || off[1] || 100,
        };
        $(this).append($('<cite class="pin"><div></div></cite>').css(std));
        return this;
    };

    if (!W.debug) {
        C.debug = $.noop;
    }
}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
