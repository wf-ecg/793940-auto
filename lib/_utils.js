/*jslint es5:true, white:false */
/*globals $, Global, _, debug, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (W, $) {

    var self = new Global('Util'),
        name = 'Util';

    $.extend(self, {
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
    });

    W[name] = self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function (W, _) {

    var u = '', keyNomArray = [u, u, u, u, u, u, u, u,
    "backspace","tab", u, u, u,"enter", u, u,"shift","ctrl","alt",
    u, u, u, u, u, u, u, u,"esc", u, u, u, u,
    "space","pageup","pagedown","end","home","left","up","right","down", u, u, u, u,
    "insert","delete", u,"0","1","2","3","4","5","6","7","8","9", u, u, u, u, u, u, u,
    "a","b","c","d","e","f","g","h","i","j","k","l","m",
    "n","o","p","q","r","s","t","u","v","w","x","y","z",
    "command", u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u,
    "f1","f2","f3","f4","f5","f6","f7","f8","f9","f10","f11","f12",
    u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u,
    "numlock","scrolllock", u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u,
    u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u,
    ",", u,".","/","`",
    u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u,
    "[","\\","]","'"];

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
        transKeyEvt: function (evt){
            return keyNomArray[evt.which];
        },
        isChoiceEvt: function (evt){
            if (evt.type === 'keydown' && _.transKeyEvt(evt) !== 'space') {
                return false;
            }
            return true;
        },
        jsreRoot: function (pth, arr) { // drt
            pth = _.jsrcRoot(pth) + '/';
            return _.map(arr, function (e) {
                return pth + e;
            });
        },
    });
}(window, _)); // underscore

(function (W) {
    if (!debug) {
        return;
    }
    var C = W.console;

    C.assert(_.roundTo(3.33, 1) === 3.3);
    C.assert(_.pct_formatted(3, 9) === '33.33%');
    C.assert(_.pct_styled(3, 9) === '<span class="percent">33.33%</span>');

    C.debug('_.mixins: Passes all tests');
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (a) { //  assume we can log -- at least
    var c, d; //  bondo the rest!
    c = 'log xfoo quebug delay clear ';
    c += 'assert count debug dir dirxml error exception group groupCollapsed groupEnd ';
    c += 'info markTimeline profile profileEnd time timeEnd trace warn';
    for (c = c.split(' '); !! (d = c.shift());) {
        a[d] = a[d] || a.log;
    }
}((function (W) {
    function Terminal(){}
    Terminal.prototype.log = function Ø(){};
    return W.terminal = new Terminal();
}(window))));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var hash0 = {
    modelList: ['compact','midsize','minivan','utility'],
};

function hash1(arr) {
    var self = function () {};

    self.noms = arr || {};
    self.nums = _.invert(self.noms);
    // backhash default configs
    self.nom = function(_nom) {
        if (_nom !== undefined) {
            this._nom = _nom;
        }
        return (this._nom || this.noms[0]);
    };
    self.num = function(_num) {
        if (_num !== undefined) {
            this._num = _num;
        }
        return (this._num || 0);
    };
    self.valueOf = function() {
        return this.nom();
    };
    self.limit = function() {
        return this.noms.length;
    };
    arr = self;
}

function hash2(obj, key) {
    var rep = {};

    rep.idx = obj[key].split(',');
    rep.idy = _.invert(rep.idx);
    obj[key] = rep;

    rep.seek = function(arg, type) {
        var max = (rep.idx.length - 1);
        arg = _.purify(arg);

        if (_.isNumber(arg)) {
            if (arg > max) {
                C.error(name, key + ':seek:' + arg, 'no index after ' + max);
            }
            return (type === 'number' ? arg : rep.idx[arg]);
        } else {
            if (!rep.idy[arg]) {
                C.error(name, key + ':seek:' + arg, 'no entry');
            }
            return (type === 'string' ? arg : rep.idy[arg]);
        }
    };
}
