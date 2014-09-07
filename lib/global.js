/*jslint es5:true, white:false */
/*globals window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var W = window,
    C = W.console;

function Global(name, desc) {
    var self = this,
        init = false;

    W[name] = self;

    self[''] = (name || 'glob#' + Global.inc());

    self.inited = function (b) {
        if (init) {
            if (b) { // True (true)
                C.error('double init', name); // throw new Error(name + ' double inited');
            } //        True (?) == Normal
            return true;
        } else {
            if (b) { // False (true)
                C.debug('init', name);
                init = true; // First run
            } else { // False (?)
                C.error('premature', name); // throw new Error(name + ' not inited');
            }
            return false;
        }
    };
    C.debug('load new Global', self, desc);
}

Global.addCounter = function (fn, nom) { // drt // I love this!
    var num = -1,
        mod = 0,
        inc;

    inc = fn[nom || 'inc'] = function () {
        num++;
        return inc.valueOf();
    };
    inc.valueOf = function () {
        return (mod ? num % mod : num);
    };
    inc.limitTo = function (num) {
        if (num !== undefined) {
            mod = num | 0;
        }
        return mod;
    };
    inc.reset = function () {
        num = -1;
    };
};

Global.prototype.valueOf = function () {
    return this[''];
};

Global.addCounter(Global);
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
