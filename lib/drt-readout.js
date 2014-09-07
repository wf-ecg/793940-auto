/*jslint es5:true, white:false */
/*globals $, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function drtReadout() {
    this.hook.apply(this, arguments);
}

(function (W) {
    var name = 'drtReadout',
        self = W[name],
        C = W.console,
        defaults, registry;

    registry = [];

    defaults = {
        prop: 'valueOf',
        wrap: '#Dash',
    };

    function register(x) {
        return registry.push(x);
    }

    function Construct(sel, prop) {
        this.jq = (sel && sel.get) ? sel.eq(0) : $(sel || 'body');
        this.el = this.jq.get(0);
        this.prop = (prop || defaults.prop);
        this.makeLabel();
        this.build();
        this.makeStyle();
        this.output('--');

        register(this);

        this.init = function () {
            return true;
        };
    }

    // PUBLIC
    self.prototype = {
        hook: Construct,
        fld: null,   //'instance only'?
        watch: null, //'instance only'?
        cb: $.noop,
        setLabel: function (str) {
            this.lab = str;
        },
        makeLabel: function () {
            var str = [this.el.id, this.prop, this.evtnom];
            this.setLabel(str.join(' '));
        },
        makeStyle: function (css) {
            this.fld.css({
                fontSize: '12px',
            });
        },
        build: function () {
            var _ = this;
            _.wrap = $('<div>').addClass(name).appendTo(defaults.wrap);
            _.lab = $('<div>').html(_.lab).appendTo(_.wrap);
            _.fld = $('<div>').prependTo(_.wrap);
        },
        output: function (str) {
            this.fld.text(str);
        },
        rev: function () {
            var _ = this,
                get = _.el[_.prop];
            _.output(typeof get === 'function' ? get.apply(_.el) : get);
        },
        update: function () { // do thing to update
            this.output(this.watch());
        },
    };

    // EXPOSE
    self.def = defaults;
    self.reg = registry;
    self.updateAll = function () {
        $.each(registry, function () {
            this.rev();
        });
    };

    self.test = function (ele) {
        var test;
        C.debug(name + ' test');
        test = new self(ele);
        return test;
    };

    W[name] = self;
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
