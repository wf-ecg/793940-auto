/*jslint es5:true, white:false */
/*globals window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (W) {
    // Register creates new register object with registry
    // and helper methods
    // am i an object or function?
    var name = 'Register',
        self = {},
        serialNum = 0,
        regArray = [],
        refArray = [],
        x;

    // registration serial vs index array
    // multi ops
    // has to happen to reg and hash

    function _increment() {
        serialNum++;
    }

    function _append(obj) {
        regArray.push(obj); // 0: obj
        refArray.push(serialNum); // 0: 0
        return;
    }

    function append(obj) {
        if (obj) {
            _append(obj);
            _increment();
        }
        return serialNum - 1;
    }

    function length() {
        return serialNum;
        // memory leak if not allowed to remove...
    }

    function lookupIdx(num) {
        return regArray[num];
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // PLANNED

    function lookupObj(obj) {
        // how to find needle in haystack...
        // return idx or obj
    }

    function release() { // x == obj or num
        // release from registry
        // release from ref hash
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // PUBLIC
    self = function Register(obj) {
        append(obj);
    };
    // self.index(this)
    self.prototype.reg = append;
    self.prototype.val = length;
    self.prototype.lookup = lookupIdx;

    W[name] = self; // constructor
}(window));
