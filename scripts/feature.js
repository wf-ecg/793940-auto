/*jslint es5:true, white:false */
/*globals $, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Feature;

(function (W) { //IIFE
    var name = 'Feature',
        C = W.console,
        G = W.globals,
        D = {},
        X;

    C.debug('load ' + name + ' (make objects)');

    D = {
        cnom: 'feature ',
        host: '#Port',
        pref: 'Obj-',
        wrap: '#Features',
        signs: ['caution', 'notice', 'stop', 'work', 'buckleup', ],
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function self() {
        return 'nothing here';
    }

    function addInc(fn) {
        fn.inc = function () {
            return fn.inc.val++;
        };
        fn.inc.val = 0;
    }

    function addSign(num) {
        var ele, nom, mod;
        mod = (num % 4);
        nom = D.pref + num;

        ele = $('<div>').attr('id', nom).text(nom).addClass(D.cnom + ' signs');
        ele.css('background-image', 'url(./images/signs/' + D.signs[mod] + '.png)');

        return ele;
    }

    function addTree(num) {
        var ele, nom;

        ele = $('<div>').text(nom).addClass(D.cnom + ' trees');
        ele.css({
            backgroundImage: 'url(./images/trees/summer.png)',
            left: num * 2500,
        });

        return ele;
    }

    function initWrap() {
        var ele = $(D.wrap).text(D.wrap);

        ele.wrap = function (fn) {
            return fn(fn.inc()).appendTo(this);
        };
        return ele;
    }

    function init() {
        var i, ele = this.initWrap();

        for (i = 0; i < (G.D.stops + 1); i++) { // NUMBER OF SIGNS
            ele.wrap(addSign);
        }
        ele.appendTo(D.host);
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    addInc(addSign);
    addInc(addTree);

    W[name] = $.extend(true, self, {
        initWrap: initWrap,
        init: init,
    });

}(window));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
