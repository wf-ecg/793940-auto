/*jslint es5:true, white:false */
/*globals $, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function drtGauge() {
    this.hook.apply(this, arguments);
}

(function (W) {
    var name = 'drtGauge',
        self = W[name],
        C = W.console,
        defaults, registry;

    defaults = {
        id: '?',
        max: 100,
        min: 0,
        // abitrary defaults
        high: 80,
        low: 20,
        optimum: 50,
        value: 50,
    };

    registry = [];

    function register(x) {
        return registry.push(x);
    }

    function Construct() {
        this.num = register(this);
        this.init = function () {
            return true;
        };
    }

    self.prototype = {
        hook: Construct,
        num: null, //'instance only'
        ele: null, //'instance only'
        adj: null, //'instance only'
        max: 200,
        makeView: function () {
            var ele = this; //
            defaults.id = name + ele.num;

            ele.ele = $('<meter>').attr(defaults).css({
                width: ele.max + 'px'
            }).on('mouseup mouseout', function (evt) {
                ele.adj = false;
                if (W.debug) {
                    C.debug(name + '.makeView', evt.offsetX, this.value, [this, evt]);
                }
            }).on('mousedown', function () {
                ele.adj = true;
            }).on('mousedown mousemove', function (evt) {
                if (ele.adj) {
                    this.value = (evt.offsetX / ele.max) * 100;
                }
            });
        },
        getDisplay: function () {
            return this.ele;
        },
        setPercent: function (num) {
            num = num > 100 ? 100 : (num < 0 ? 0 : num); // bookends
            this.setValue(num);
        },
        setValue: function (num) {
            num %= 101;
            this.ele.val(num);
        },
        insertInto: function (sel) {
            if (!this.ele) {
                this.makeView();
            }
            return this.ele.appendTo(sel || 'body');
        },
    };
    // EXPOSE
    self.def = defaults;
    self.reg = registry;

    self.test = function (container) {
        var test;
        C.debug(name, 'test');
        test = new self();
        test.insertInto(container);
        return test;
    };

    W[name] = self;
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
