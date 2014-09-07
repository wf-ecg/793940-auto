/*jslint es5:true, white:false */
/*globals $, _, debug, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Util = (window.Util || new Global());

Util.per = {
    styled: function (num, tot) {
        return '<span class="percent">' + this.formatted(num, tot) + '</span>';
    },
    formatted: function (num, tot) {
        var x = num / tot;
        x = Util.round(x * 100, 2);
        return x + '%';
    },
};
Util.round = function (num, places) {
    return this.roundTo(num, places).toFixed(places);
};
Util.roundTo = function (num, places) {
    var pow = Math.pow(10, places || 2);
    return Math.round(parseFloat(num) * pow) / pow;
};
Util.equal = function (x, y) {
    return (Math.abs(x - y) < 0.000001);
};
Util.translateCursorKeyEvt = function (evt) {
    var k = evt.which,
        neg = -1,
        pos = 1;
    if (k === 37) return [neg, 0];
    if (k === 38) return [0, neg];
    if (k === 39) return [pos, 0];
    if (k === 40) return [0, pos];
    return [0, 0];
};

Util.pos = {};
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (W) {
    if (!debug) {
        return;
    }
    var C = W.console;

    C.assert(Util.roundTo(3.33, 1) === 3.3);
    C.assert(Util.per.formatted(3, 9) === '33.33%');
    C.assert(Util.per.styled(3, 9) === '<span class="percent">33.33%</span>');

    C.debug('Util: Passes all tests');
}(window));

(function (W, _) {
    _.mixin(_.string.exports());
    _.mixin({
        jsrcRoot: function (name) {
            var page = W.document.baseURI.toString(),
                path = $('script[src$="' + name + '.js"]').prop('src').toString();

            function pop(pth) {
                return _(pth).words('/').slice(0, - 1).join('/');
            }

            function cancelout(shr, lng) { //  page, jsrc
                shr = pop(shr);
                lng = _.str.strRight(lng, shr);
                return pop(lng);
            }
            return cancelout(page, path);
        },
        jsreRoot: function (pth, arr) {
            var tmp;
            pth = _.jsrcRoot(pth) + '/';
            tmp = _.map(arr, function (e) {
                return pth + e;
            });
            return tmp;
        },
    });
}(window, _)); // underscore
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
