/*jslint es5:true, white:false */
/*globals $, _, debug, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Backer;

(function (W) { //IIFE
    var name = 'Backer',
        C = W.console,
        D = {},
        M = {},
        count = 9,
        X;

    C.debug('load ' + name + ' (templatise)');

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    D = {
        wrap: '#Port',
        item: 'Bkgr-',
        host: '#View',
        clas: 'bkgr',
    };

    function self() {
        return 'nothing here';
    }

    function addInc(fn) {
        var num = 0;
        fn.inc = function () {
            return num++;
        };
        fn.num = function () {
            return num;
        };
    }

    function addItem() {
        var nom, ele, cache;

        addItem.inc();
        nom = D.item + addItem.num();

        cache = $('<div>').addClass('cache');

        ele = $('<div>').text(nom) //
        .attr('id', nom) //
        .addClass(D.clas).append(cache);

        return ele;
    }
    addInc(addItem);

    function setWrap() {
        var ele;

        ele = $(D.wrap);

        ele.forg = function () {
            return addItem().appendTo(this);
        };
        return ele;
    }
    addInc(setWrap);

    function init() {
        var i, x = this.forg();
        for (i = 0; i < count; i++) { // NUMBER OF LAYERS
            x.forg();
        }
        x.appendTo(D.host);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    M = {
        forg: setWrap,
        init: init,
    };

    W[name] = $.extend(self, M);
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
