/*jslint es5:true, white:false */
/*globals $, Global, _, debug, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function (W, $) {

    var self = new Global('Util'),
        name = 'Util';

    $.extend(self, {
        args: function () {
            return arguments;
        },
        debug: function (n) {
            return W.debug >= (n || 0);
        },
        defined: function (x) {
            return !this.undef(x);
        },
        echo: function () {
            C.log([name], arguments);
        },
        flatcat: function (arr) {
            return arr.concat.apply([], arr);
        },
        reflect: function () {
            return arguments[0];
        },
        undef: function () {
            return (typeof arguments[0] === 'undefined');
        },
    });

    W[name] = self;
}(window, jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var hash0 = {
    modelList: ['compact','midsize','minivan','utility'],
};
