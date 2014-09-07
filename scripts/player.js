/*jslint es5:true, white:false */
/*globals $, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Player;
(function (W) {
    var name = 'Player',
        C = W.console,
        self, defaults, X;

    defaults = {
        id: 'Bkgr-',
        size: [100, 100],
        css: {
            backgroundImage: 'any.png',
            //backgroundRepeat: 'repeat-x',
        },
    };

    // TODO set z-index

    function checkConfig(O) {
        if (O.id && typeof O.id !== 'string') {
            throw new Error('id not string?');
        }
        if (O.css && typeof O.css !== 'object') {
            throw new Error('no css?');
        }
        if (O.size && typeof O.size !== 'object') {
            throw new Error('bad size pair?');
        }
    }

    self = function (config) {
        var _ = $.extend(true, this, defaults, config);
        checkConfig(_);
        // C.debug('player this', _);
        this.init();
    };

    self.prototype.init = function () {
        var _ = this;
        _.jq = $('#' + _.id);
        _.jq.css(_.css);
        _.jq.data(name, _);
        _.jq.addClass(_.role || '');
    };
    self.prototype.valueOf = function () {
        return this.jq;
    };

    W[name] = self;
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
