/*jslint es5:true, white:false */
/*globals $, _, console, window,
    localStorage */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Blobo;

(function (W) { //IIFE

    var name = 'Blobo',
        self;

    console.debug('load ' + name + ' (archiver)');

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    self = {
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
            localStorage.setItem(key, this.txt(obj));
            return obj;
        },
        raw: function (key) {
            return localStorage.getItem(key);
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
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    W[name] = self;

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



*/
