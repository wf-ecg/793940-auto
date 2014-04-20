
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
