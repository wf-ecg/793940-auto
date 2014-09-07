/*jslint es5:true, white:false */
/*globals $, console, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function ($) {
    /*
    buffer an event (defaults to scroll)
    accepts a [time value] [event name ] and returns [jq / itself]
    */
    var name = 'Throttle',
        kind = 'scroll',
        _tmp = '',
        meth = ('add' + name),
        W = window,
        C = console;

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // @ CLOSURE LEVEL

    function _xsrType(nom) {
        kind = nom || kind;
        return kind;
    }

    function _tmpType(nom) {
        if (nom) {
            _tmp = _xsrType();
            _xsrType(nom);
        } else if (_tmp) {
            _xsrType(_tmp);
            _tmp = '';
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // @ CLASS LEVEL

    function self(jq, fn, time) { // delegate stub
        C.debug(name, 'attaching fn to jq', (kind + '@' + time), [fn, jq]);
        self.attach(jq, fn, time); // add to que to run each on every
    }

    self.iterate = function (fn, time, evtype) {
        var thus = this,
            tFunc;
        tFunc = typeof time;
        tFunc = (tFunc === 'number') ? time : 999;

        if (evtype) {
            _tmpType(evtype);
        }

        // @ ELEMENT LEVEL
        thus.each(function () {
            self($(this), fn, tFunc); // init buffers
        });
        if (evtype) {
            _tmpType();
        }
        return thus;
    };

    self.attach = function (jq, fn, time) {
        var timer, action, delay = (time / 10);

        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
        // @ INVOCATION LEVEL
        action = function (evt) {
            fn(evt); //         complete
            delay = time; //    reset timer
            W.setTimeout(function () {
                delay = (time / 10); // allow quick calls soon
            }, time);
        };

        /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
        // @ EVENT LEVEL
        jq.on((kind + '.' + name), function (evt) {
            if (timer) {
                W.clearTimeout(timer);
            }
            timer = W.setTimeout(action, delay, evt);
        });
    };

    W[name] = self;
    $.fn[meth] = self.iterate;

    self.getDefaultType = function () {
        return _xsrType();
    };
    self.setDefaultType = function (str) {
        _xsrType(str);
        return self;
    };

}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
