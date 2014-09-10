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
