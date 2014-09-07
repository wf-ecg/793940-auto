/*jslint es5:true, white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Misc = (function (W, $) {
    var name, self, C;
    //
    name = 'Misc';
    self = {};
    C = W.console;
    //
    function _log() {
        var args = [].slice.call(arguments);
        C.info.apply(C, [name].concat(args));
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    self.fftd = function () {
        $('#Platter td').wrapInner('<div class="relative">');
        _log('fftd');
    };

    self.init = function () {
        if ($.browser.mozilla) {
            W.setTimeout(self.fftd, 999);
        }
        return self;
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    _log('Loaded', self);

    return self.init();
}(window, jQuery));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


*/
