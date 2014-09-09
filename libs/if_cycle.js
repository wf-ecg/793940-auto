/*jslint es5:true, white:false */
/*globals $, _, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function iF_Cycle(Df, list) {
    var self = Df.cycle = function () {};
        _.addCounter(self);

        build_cycle: {

            self.noms = list || {};
            self.nums = _.invert(self.noms);
            // backhash default configs

            self.nom = function (_nom) {
                if (_nom !== undefined) {
                    this._nom = _nom;
                }
                return (this._nom || this.noms[0]);
            };
            self.num = function (_num) {
                if (_num !== undefined) {
                    this._num = _num;
                }
                return (this._num || 0);
            };
            self.valueOf = function () {
                return this.nom();
            };
            self.limit = function () {
                return this.noms.length;
            };
        }

    self.inc.limitTo(self.limit());

    function _changeTo(nom, num) {
        self.num(num);
        self.nom(nom);

        $(Df.host).removeClass().addClass(nom);
    }

    function _cleanNumber(x) { // normalize number
        var y = self.limit();
        return (Math.abs(x + y) % y | 0);
    }

    function _normalize(x) { // use numbers internally
        if (_.isNumber(x)) {
            return _cleanNumber(x);
        } else {
            return self.nums[x];
        }
    }

    // INTERFACE

    function getName(num) {
        if (num === undefined) {
            num = self.num();
        }
        return self.noms[num % self.noms.length];
    }

    function getNumb(nom) {
        if (nom === undefined) {
            nom = self.nom();
        }
        return _normalize(nom);
    }

    function lookup(x, num) {
        if (num || _.isNumber(x)) {
            return getName(_normalize(x));
        } else {
            return _normalize(x);
        }
    }

    function tryChange(x) {
        var num, nom;

        if (_.isNumber(x)) {
            nom = lookup(x, true);
        } else {
            nom = x;
        }
        num = lookup(nom);

        if (self.nom() === nom) {
            return true;
        } else {
            _changeTo(nom, num);
            return nom;
        }
    }

    function advance(dir) {
        self.manual = true;
        if (dir === false) {
            return tryChange(self.inc() * -1);
        }
        return tryChange(self.inc());
    }
    self.inc();

    return {
        ic_look: lookup,
        ic_name: getName,
        ic_next: advance,
        ic_numb: getNumb,
        ic_pick: tryChange,
        ic_prev: function () {
            return advance(false);
        },
    };
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


 */
