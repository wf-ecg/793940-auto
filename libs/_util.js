/*jslint white:false, evil:true  */
/*globals Global, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// from 1170361-getcollege

var Util = (function (W, $) { /// IIFE
    'use strict';
    var name = 'Util',
        self = new Global(name, '(793940-auto utils)'),
        C, U;
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// CONSTANTS
    C = W.console;

    U = {
        args: function () {
            return arguments;
        },
        debug: function (n) {
            return W.debug >= (n || 0);
        },
        defined: function (x) {
            return !this.undef(x);
        },
        echo: function () {
            C.log([name], arguments);
        },
        flatcat: function (arr) {
            return arr.concat.apply([], arr);
        },
        reflect: function () {
            return arguments[0];
        },
        undef: function () {
            return (typeof arguments[0] === 'undefined');
        },
    };

    if (U.undef(W.debug)) {
        W.debug = 1;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    $.extend(self, {
        flatten: U.flatcat,
        isDef: U.defined,
        I: U.reflect,
        mobile: W.View && View.mobile,
        viewport: W.View && View.port,
        testrict: "eval('var x=0'),(typeof(x)!=='number'?'':'non-')+'strict'",
    }, U);

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
