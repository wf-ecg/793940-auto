/*jslint es5:true, white:false */
/*globals $, Feature, Flayer, Global, Player, Space, Util, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var globals = (window.globals || new Global());

function test(W) {
    var C = W.console,
        G = W.globals,
        dash = $('#Dash');

    function allowStretch() {
        $.subscribe('slideTo', function (evt, div) { // STRETCH
            var px = Math.abs(900 - div.scrollTop);
            // C.warn('stretch', px);
            $('#Port').css({
                height: px
            });
            $('#Dash').css({
                top: 400 + (px - px / 2)
            });
            // $('#Feature').css({ height: px - 100 });
        });
    }

    function makeReadouts() {
        var fn = W.drtReadout;

        if (fn) {
            G.read3 = new fn(G.space, 'getPercent_h');
            $.subscribe('slideTo', function () { // (evt, div)
                fn.updateAll();
            });
        }
        if (W.drtGauge) {
            W.drtGauge.test(dash);
        }
    }

    function shiftSignage() {
        var signs = $('.feature');

        signs.each(function (i, e) {
            var me = $(this);
            me.css({
                left: me.offset().left + G.width - 333,
            });
        })
    }

    function newButton(txt, act) {
        var btn = $('<button>').text(txt).click(act).appendTo(dash);
    }

    function addButtons() {
        newButton('Toggle wind', toggleWind);
        newButton('Next season', Seasons.next);
        newButton('Toggle platter', function () {
            Platter.toggle().test()
        });
        newButton('Load platter', Platter.test);
        newButton('Hide dash', hideDash);
    }

    function hideDash() {
        $('#Dash').hide();
        W.setTimeout(function () {
            $('#Dash').show();
        }, 9999);
    }

    function toggleWind() {
        var host = $('#View'),
            cnom = 'action';

        W.setTimeout(function () {
            if (host.is('.action')) {
                host.removeClass(cnom);
                W.remember({wind:0});
            } else {
                host.addClass(cnom);
                W.remember({wind:1});
            }
        }, 1111);
    }

    function toggleDevlines() {
        var I = toggleDevlines;

        if (I.on === undefined) {
            I.on = 1;
            I.eles = $('#Port').find('.bkgr, .feature');
        }
        I.on = I.on ? 0 : 1;
        I.eles.css({
            borderWidth: I.on,
            color: I.on ? 'initial' : 'transparent',
        });
    }

    function enableCursorKeys() {
        // 2do: apply event to port scroll not background
        $(W).on('keydown', function (evt) {
            var arr = Util.translateCursorKeyEvt(evt);
            // into pix
            if (arr[0]) {
                $('#Scroll').scrubLeft('+=' + 100 * arr[0]);
            }
        });
    }

    $(function () {
        makeReadouts();
        enableCursorKeys();
        addButtons();

        !remember().devl && toggleDevlines();
        remember().wind && toggleWind();
//        hideDash();
        shiftSignage();

        Pointer.init();
        Vehicle.init();
        Platter.init();
        Pager.init();
        // allowStretch();
        //G.space.showBounds_h();
        //G.space.showBounds_v();
        //G.space.scrollToCenter();
        C.debug('test');
    });
}
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
