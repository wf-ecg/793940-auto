/*jslint white:false */
/*globals C, W, Globs, Util, _, jQuery,
    Platter, Points, Signs, Vehicle */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Stage = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Stage',
    self = new G.constructor(name, '(live area and slightly beyond)'),
    Df, Div, Bod;

    Df = G['+' + name] = { // DEFAULTS
        div: '#Stage',
        foot: '#Foot',
        port: '#Port',
        scrl: '#Scroll',
        top: 'body',
        view: '#View',
        lastPoint: 0,
        inits: function () {
            if (U.debug(1)) {
                W['_' + name] = this;
                C.debug(this);
            }
            Df.inited = true;
        },
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _toggleWind() {
        var cnom = 'action';

        W.setTimeout(function () {
            if (Df.view.is('.action')) {
                Df.view.removeClass(cnom);
                W.remember({
                    wind: 0
                }); // save right away
            } else {
                Df.view.addClass(cnom);
                W.remember().wind = 1; // allow to forget
            }
        }, 1111);
    }

    function _veil(b) {
        if (b !== false) {
            Bod.addClass('veil');
        } else {
            Bod.removeClass('veil');
        }
    }

    function _setViewMode(state) {
        var term = {
            m: 'moving',
            s: 'stopped'
        };

        if (state === term.m) {
            Bod.removeClass(term.s).addClass(term.m);
        }
        if (state === term.s) {
            Bod.removeClass(term.m).addClass(term.s);
        }
    }

    function logStreet(str) {
        var me = $('#Total');

        me.text(str + 'point');
    }

    function _setViewPoint(num) {
        Bod.removeClass('near');
        if (num === null) {
            Bod.addClass('near');
            return;
        }
        var cnom = 'way' + num;
        Bod.removeClass(Df.lastPoint);
        Bod.addClass(cnom);
        Df.lastPoint = cnom;
        C.warn('tracing _setViewPoint', cnom);
    //        logStreet(cnom);
    }

    function _social(evt) {
        var dvt = evt.data;

        if (W.confirm('Leave this page for ' + dvt[0])) {
            W.location = dvt[1];
        } else {
            W.dvt = W.open(dvt[1]);
        }
    }

    function _allowStretch() {
        $.PS_sub('stretch', function (evt, num) { // STRETCH
            var px = Math.abs(750 - num);
            C.warn('stretch', px);
            Df.port.css({
                height: px
            });
        });
    }

    function _revUp(b) {
        // Platter.init();
        // Vehicle.init();
        if (b) {
            Vehicle.move();
            $('body').removeClass('stopped');
            $('body').addClass('moving');
        } else {
            $('body').removeClass('moving');
            $('body').addClass('stopped');
            Vehicle.halt();
        }
    }

    function _wakeUp() {
        _revUp(true);
        Df.scrl.scroll();
        W.setTimeout(function () {
            _revUp();
            Stage.unveil();
        }, 999);
    }

    function _coverUp(b) {
        if (b) {
            Div.addClass('covering');
            G.arrowControl = 0; // disable arrow keys
        } else {
            Div.removeClass('covering');
            G.arrowControl = 1;
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INVOKE

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        Bod = $(Df.top);
        Div = $(Df.div);
        Df.foot = $(Df.foot);
        Df.port = $(Df.port);
        Df.scrl = $(Df.scrl);
        Df.view = $(Df.view);

        Df.foot //
        .on('click', '.btnStart', Platter.finish) //
        .on('click', '.btnHelp', Platter.help) //
        .on('click', '.btnTweet', ['WellsFargo @ Twitter?', '//twitter.com/wellsfargo'], _social) //
        .on('click', '.btnFbook', ['WellsFargo @ Facebook?', '//facebook.com/wellsfargo'], _social) //
        ;

        $.PS_sub('signview', function (evt, ele) {
            _setViewPoint(Signs.index(ele));
        });
        $.PS_sub('platter', function (evt, b) {
            if (!b) {
                Stage.wake();
            }
        });
        _veil();

        return self;
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        init: _init,
        mode: _setViewMode,
        unveil: function () {
            _veil(false);
        },
        veil: _veil,
        wind: _toggleWind,
        wake: _wakeUp,
        cover: _coverUp,
        stretch: _allowStretch,
    });

    return self;
}(jQuery, Globs, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


    stage activities like:
        do something up reaching a point
        allow something after point transitions complete

        hurry to a place
        stretch


 */
