/*jslint es5:true, white:false */
/*globals $, Util, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (W) {
    var self,
        C = W.console,
        name = 'Watcher',
        index = new Register(),
        Mock = function () {};

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    self = function Watcher(a1, a2) {
        if (arguments.length > 1) {
            this.makeWatcher(a1, a2);
        } else {
            this.test(a1);
        }
    };

    Mock.prototype = {
        val: 0,
        valueOf: function () {
            return this.val;
        },
        increment: function () {
            this.val++;
            return 'incremented';
        },
    };

    function makeWidget(nom) { // subscribe to?
        var myNom = 'Widget';

        function cb(str, etc) { // implements display
            C.debug(myNom, str, etc);
        }
        if (nom) {
            myNom += (':' + nom);
            $.subscribe(nom, cb);
        }
        return cb;
    }

    function newAccessor(obj, fnom) {
        var xsr;
        fnom = fnom || 'valueOf';

        if (typeof obj[fnom] !== 'function') {
            throw new Error('needs method for callback');
        } else {
            xsr = function Xsr() {
                return obj[fnom]();
            };
            return xsr;
        }
    }

    function newChangeAccessor(obj, fnom) {
        var old_val = '',
            xsr = newAccessor(obj, fnom);

        return function () {
            var new_val = xsr();

            if (old_val === new_val) {
                new_val = null;
            } else {
                old_val = new_val;
            }
            return new_val;
        };
    }

    function isNull(x) {
        return (null === x);
    }

    function makeWatcher(obj, sec, nom) {
        nom = nom || 'watcher';
        sec = sec || 1;

        var poll, idx, old_val, val;

        poll = newChangeAccessor(obj);
        old_val = poll(); // initialize a value

        function read() {
            return (val = poll(old_val));
        }

        function save(val) {
            return old_val = val;
        }

        function show() {
            C.debug(nom, 'new value >', save(val));
        }

        function xsrName(str) {
            return (nom = str ? (str + ':' + idx) : nom);
        }

        function watcher() {
            return (isNull(read()) || show());
        }
        idx = index.reg(watcher);
        nom = xsrName(nom);

        // PUBLIC
        watcher.tick = W.setInterval(watcher, sec * 1000);
        watcher.namer = xsrName;
        return watcher;
    }

    function test(obj) {
        var watcher;
        obj = obj || new Mock();
        watcher = makeWatcher(obj, 0.5, 'test');
        watcher.mock = obj;
        C.warn('HINT:\nwatcher = makeWatcher(object, seconds);//(mock, 0.5) \nwatcher.mock.increment();');
        return watcher;
    }

    self.prototype.make = makeWatcher;
    self.test = test;
    self._idx = index;

    W[name] = self;
}(window));

/*

want to watch a value?
an internal property could be referenced with a callback / valueGetter

Watch {
    div
    update()
}

PULL (pole by running a get function)
    cb: callback / ov: old value / wd: widget
    callback(ov) {
        if (ov != <value>) return <value>;
    }
    timer: // set interval
        nv: pull value via callback
        ov == nv (stop if value has not changed)
    else
        run widget.update(nv)
        ov = nv // store new value


PUSH (another option is to publish changes)
    new Watch(subscribe:title)

    watch a value
        when setting a value run a check
            has it changed?
    publish (title, value)


PUSH2 (another option is to deliver changes)
    create a widget that
            returns a updater function
    watch a value
        when setting a value run a check
            has it changed?
    publish new value to widget

yeah!
why not have the setter update the widget?
not feasible to every little change?
    lazy load
    or every so often send?

*/
