/*jslint white:false */
/*globals _, C, W, Util */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/// EXTENDS
//
// UNDERSCORE // Extra with Strings!
//
(function (_, U) {
    var NULS = /[\W_]+/g;
    var SEGS = /([^\W_]{3})([^\W_]*)/g;

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

    _.mixin({
        hasher: function (obj, self) {
            // {key:values} doubled as {val1:key, val2:key}
            if (!self) {
                obj = _.extend({}, obj);
            }
            _.each(obj, function (arr, nom) {
                if (!arr.pop) {
                    arr = obj[nom] = [arr]; // ensure array wrapper
                }
                _.each(arr, function (idx) {
                    var sub = obj[idx] = (obj[idx] || []); // ensure array
                    if (sub.length < 1 || (_.indexOf(sub, nom) < 0)) {
                        sub.push(nom);
                    }
                });
            });
            return obj;
        },
        idSafe: function (str, ns) {
            str = _.claSafe(str);
            return _.reserve(str, ns);
        },
        claSafe: function (str, ns) {
            str = str || ('X_' + btoa(Math.random() * 1e5 | 0));
            str = str.replace(NULS, '-');
            if (ns) {
                str = str.replace(SEGS, '$1');
            }
            return str.replace(NULS, '_');
        },
        isPlain: function (etc) {
            return (etc && _.isString(etc));
        },
        isPrivate: function (nom) {
            return (nom.toString().charAt(0) === '_');
        },
        objSort: function (obj, arr) {
            // return <obj> with values added in order by <arr>
            var neo = {};
            _.each(arr, function (e) {
                neo[e] = obj[e];
            });
            return neo;
        },
        reserve: function (nom, ns) {
            var self, cache, count;
            // register used keys by namespace <ns>
            self = _.reserve;
            nom = JSON.stringify(nom).slice(1, -1);
            ns = '+' + (ns || 'default');

            cache = self[ns] = (self[ns] || new U.Cache());
            count = cache[nom] = (cache[nom] || new U.Counter(1));
            return nom + '-' + count;
        },
        singler: function (obj, self) {
            // unbox sets with only 1 item
            if (!self) {
                obj = _.extend({}, obj);
            }
            _.each(obj, function (e, i) {
                if (e.length === 1) {
                    obj[i] = e.pop();
                }
            });
            return obj;
        },
        turnout: function (arr, prop, kill) {
            // index a hash<arr> by <prop> name
            // optional destruction<kill> of array index
            _.each(arr, function (item, name) {
                // use prop from each object as alias
                arr[item[prop]] = item;
                if (kill) {
                    delete arr[name];
                }
            });
            return _.extend({}, arr);
        },
    });
}(_, Util));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
