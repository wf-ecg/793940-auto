/*jslint es5:true, white:false */
/*globals $, Global, _, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Backer;

(function (W) { //IIFE
    var name = 'Backer',
        self = new Global(name, '(templatise)'),
        C = W.console,
        Df;

    Df = { // DEFAULTS
        count: 9,
        wrap: '#Port',
        pfix: 'Bkgr-',
        host: '#View',
        clas: 'bkgr',
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
        var i, x;

        x = _setWrap();

        for (i = 0; i < Df.count; i++) { // NUMBER OF LAYERS
            x.grow();
        }
        x.appendTo(Df.host);
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
    });

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
