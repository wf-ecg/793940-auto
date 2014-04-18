/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
// ODDBALL
// @ standardize
/*
    Wrapper for the scrolling background image divs
    background image is controlled by css for class changes and caching
    initialzed by drawing from data obj
*/
var Player = (function ($, W) {
    'use strict';
    var name = 'Player',
        self,
        C = W.console,
        Df;

    C.debug('load', name, '(f*d up bkge img divs)');

    Df = { // DEFAULTS
        id: 'Bkgr-',
        size: [100, 100],
        backgroundImage: 'any.png',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function checkConfig(O) {
        if (O.id && typeof O.id !== 'string') {
            throw new Error('id not string?');
        }
        if (O.css && typeof O.css !== 'object') {
            throw new Error('no css?');
        }
        if (O.size && typeof O.size !== 'object') {
            throw new Error('bad size pair?');
        }
    }

    /**
     * @constructor
     */
    self = function Player(Cf) {
        var obj = this;

        checkConfig(Cf);
        obj = $.extend(true, obj, Df, Cf);

        if (W.debug > 1) {
            C.debug('player this', obj);
        }
        obj.init();
    };

    self.prototype.init = function () {
        var obj = this;

        obj.jq = $('#' + obj.id);
        obj.jq.css(obj.css);
        obj.jq.data(name, obj);
        obj.jq.addClass(obj.role || '');
    };

    self.prototype.valueOf = function () {
        return this.jq;
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    return self;

}(jQuery, window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
