/*jslint es5:true, white:false */
/*globals Global, Util, _, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Backer = (function (W, $) { // IIFE
    'use strict';
    var name = 'Backer',
        self = new Global(name, '(templatise)'),
        C, Df, G, U;

    G = Global;
    U = Util;
    C = W.console;

    Df = G['+' + name] = { // DEFAULTS
        count: 9,
        wrap: '#Port',
        pfix: 'Bkgr-',
        host: '#View',
        clas: 'bkgr',
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

    function _addItem() {
        var nom, ele;

        nom = Df.pfix + (self.inc() + 1);

        ele = $('<div>') //
        .attr('id', nom) //
        .addClass(Df.clas) //
        .html($('<cite>').text(nom)) //
        .append($('<div>').addClass('imgcache'));
        //C.debug('add item', ele);
        return ele;
    }

    function _setWrap() {
        var port;

        port = $(Df.wrap);
        // expando
        port.grow = function () {
            return _addItem().appendTo(this);
        };
        return port;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits(arguments);

        var i, x;

        x = _setWrap();

        for (i = 0; i < Df.count; i++) { // NUMBER OF LAYERS
            x.grow();
        }
        x.appendTo(Df.host);
        return self;
    }

    $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
    });

    return self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*




 */
