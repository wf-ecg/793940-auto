/*jslint es5:true, white:false */
/*globals _, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function (W, _) {

    _.mixin(_.string.exports());

    _.mixin({
        pct_raw: function (num, tot) {
            var x = num / tot;
            return _.round(x * 100, 2);
        },
        pct_formatted: function (num, tot) {
            var x = _.pct_raw(num, tot);
            return (x + '%');
        },
        pct_styled: function (num, tot) {
            return '<span class="percent">' + _.pct_formatted(num, tot) + '</span>';
        },
        round: function (num, places) {
            return _.roundTo(num, places).toFixed(places);
        },
        round_XbyY: function (num, places) {
            return _.roundTo(num, _.integerize(places));
            // if neg mult?
            //    123.321 by (decimal places) equals
            //                        2           123.32
            //                       -2           100
        },
        roundTo: function (num, places) {
            var pow = Math.pow(10, places || 2);
            // TODO negative places?
            return Math.round(parseFloat(num) * pow) / pow;
        },
        integerize: function (n) { // drt
            var sign = (n < 0) ? - 1 : 1;
            n = _.pos(n);
            if (n < 1 && n > 0) {
                n = _.defrac(n); // ensure whole num
                sign = -1;
            }
            return Math.round(n) * sign;
        },
        pos: function (n) { // drt
            return Math.abs(n); // ensure positive num
        },
        purify: function (x) { // if number, be a number
            var num = (_.isString(x) ? x.replace(/\D/g, '') : NaN);
            return (num == x ? num|0 : x);
        },
        fractional: function (n) { // drt
            return (n % 1);
        },
        defrac: function (n) { // drt
            return (1 / n | 0);
        },
        eqfloats: function (x, y) { // drt
            return (Math.abs(x - y) < 0.000001);
        },
        addCounter: function (fn, nom) { // drt // I love this!
            var num = -1,
                mod = 0,
                inc;
            inc = fn[nom || 'inc'] = function () {
                num++;
                return inc.valueOf();
            };
            inc.valueOf = function (tru) {
                return (!mod || tru ? num : num % mod);
            };
            inc.limitTo = function (num) {
                if (num !== undefined) {
                    mod = num|0;
                }
                return mod;
            };
            inc.reset = function () {
                num = -1;
            };
        },
        arrowKeyXY: function (evt) { // drt
            var k = evt.which,
                neg = -1,
                pos = 1;
            if (k === 37) return [neg, 0];
            if (k === 38) return [0, neg];
            if (k === 39) return [pos, 0];
            if (k === 40) return [0, pos];
            return false;
        },
        jsrcRoot: function (name) { // drt
            var page = W.document.baseURI.toString(),
                pajq = $('script[src$="' + name + '.js"]'),
                path = pajq.prop('src').toString(),
                pop, cancelout;

            pop = function (pth) {
                return _(pth).words('/').slice(0, - 1).join('/');
            };
            cancelout = function (shr, lng) { //  page, jsrc
                shr = pop(shr);
                lng = _.str.strRight(lng, shr);
                return pop(lng);
            };
            return cancelout(page, path);
        },
        jsreRoot: function (pth, arr) { // drt
            pth = _.jsrcRoot(pth) + '/';
            return _.map(arr, function (e) {
                return pth + e;
            });
        },
    });
}(window, _)); // underscore

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
