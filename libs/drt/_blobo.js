/*jslint white:false */
/*globals _, C, W, Glob, localStorage, jQuery,
        Blobo:true */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Blobo;

(function ($, G) { //IIFE
    var name = 'Blobo',
        self = new G.constructor(name, '(archive for memories)'),
        C = W.console;

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    W[name] = $.extend(true, self, {
        name: function (domain, data) {

            if (arguments.length > 1) {
                return this.set(domain, data);
            } else {
                return this.get(domain);
            }
        },
        get: function (key) {
            return this.obj(this.raw(key));
        },
        set: function (key, obj) {
            try { // cover for IE
                if (localStorage) {
                    localStorage.setItem(key, this.txt(obj));
                }
            } catch (err) {}
            return obj;
        },
        raw: function (key) {
            var stub = {};
            try { // cover for IE
                if (localStorage) {
                    stub = localStorage.getItem(key);
                }
            } catch (err) {
                stub = '"i hate ie"';
            }
            return stub;
        },
        txt: function (obj) {
            return JSON.stringify(obj);
        },
        obj: function (str) {
            return (str && JSON.parse(str)) || '';
        },
        bind: function () {
            return this.neo.apply(this, arguments);
        },
        neo: function (nom) {
            var self = this;

            // key gen
            nom = (nom || self._nom());

            // pseudo accessor / xsr
            return function (obj) {
                if (arguments.length) {
                    return self.set(nom, obj);
                } else {
                    return self.get(nom);
                }
            };
        },
        _inc: function () {
            var X = (this.name('_inc') || 0);

            this.name('_inc', ++X);
            return X;
        },
        _nom: function () {
            var num1 = ((new Date()).valueOf() % 100),
                num2 = (this._inc() % 100);

            return ('id_' + num1 + '_' + num2);
        },
    });

}(jQuery, Glob));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
