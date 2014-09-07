/*jslint es5:true, white:false */
/*globals $, Digit, _, console, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function (W) {
    var name = 'Odom',
        C = W.console,
        G = W.globals,
        def = {},
        self = {},
        methods = {},
        X;

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    def = {
        div: '#Odom',
        digits: 6,
        vfactor: 1.5,
        unit: 'em',
    };

    function rollOver() {
        $.each(self.digs, function () {
            this.setTo(0);
        });
        self.digs[5].div.on(G.D.transend, function () {
            self.reset();
            // my data obj has value of 10(0)
            // remove .ani and
            // set to 0(0)
            // restore ani
        });
    }

    function showOff() {
        if (self.recentDig) {
            self.recentDig.inc();
        }
    }

    function padarr(num) {
        return _.pad(num, 6, '0000000').split(/\B/);
    }

    function newDigit() {
        var div, dig;

        div = self.digit0.clone();
        self.divs.push(div);

        dig = new Digit(div, self.digs.length);
        self.digs.push(dig);
        dig.odom = self;

        showOff();
        self.recentDig = dig;

        return div;
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function Digit(ele, pos) {
        var I = this;
        I.div = ele;
        I.pos = pos;
        I.val = 0;
        // store the obj in the element
    }
    $.extend(Digit.prototype, {
        setTo: function (val) {
            var I = this,
                D = I.div;
            I.val = val;
            I.val = (val % 10);
            D.css({
                top: (-1 * I.val * def.vfactor) + def.unit,
            });
        },
        inc: function () {
            this.setTo(this.val + 1);
        },
    });



    self = {
        E: null,
        divs: null,
        digs: null,
        recentDig: null,
        calcOffset: function (n1) {
            return n1 * def.vfactor;
        },
        getLength: function (n1) {
            return this.digs.length;
        },
        reset: function () {
            this.doset(0);
        },
        makeDigit: function () {
            X = $('<div>');
            X.addClass('digit ani').text('0 1 2 3 4 5 6 7 8 9 0');
            return X;
        },
        addDigit: function () {
            var I = self;
            if (I.getLength() === def.digits) {
                return;
            }
            I.E.append(newDigit());
            I.recentDig.setTo(I.getLength() - 1);

            return I.digs[I.getLength() - 1];
        },
        doset: function (num) {
            var arr = padarr(num);

            $.each(self.digs, function (i, e) {
                e.setTo(arr[5 - i]);
            });
        },
        init: function (div) {
            var I = self;
            if (I.inited) {
                return;
            }
            I.divs = [];
            I.digs = [];
            I.recentDig = null;

            I.E = $(def.div);
            if (I.digit0) {
                return;
            }
            // get original digit and store it
            I.digit0 = I.makeDigit();
            I.E.find('.digit').remove();
            I.fill(def.digits);
        },
        fill: function (places) {
            var I = self;
            while (I.getLength() < (places || def.digits)) {
                I.addDigit();
            }
        },
    };

    $.subscribe('slideTo', function (x, y) {
        self.reset();
        self.doset(y);
    });
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    methods = {
        //        reset: reset,
    };

    self.init();
    self.addDigit();
    W[name] = $.extend(self, methods);


}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*
    accessor for number setting,
    property for animation speed
    stacker/augmenter (awareness of magnitudes --- to the left)

// describe in english
// mock in html
// model in js
// assemble in jq
// animate in css

take one digit at a time

any movement needs an ease function, right? set time in code

switching to 10... we need to scroll up to 10 and then instantly move to zero
the modulous is 10 but only in whole numbers

 */
