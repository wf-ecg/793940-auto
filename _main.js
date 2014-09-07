/*jslint es5:true, white:false */
/*globals $, Feature, Backer, Global, Player, Space, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function (W) {
    var C = W.console,
        G = W.globals,
        D = W.Data,
        X;

    W.G = G;
    G.D = D;
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function veil() {
        $('#View').addClass('veil');
    }
    function unveil() {
        $('#View').removeClass('veil');
    }

    function primaryInits() {
        // set css on for each item
        // make divs and load images
        Backer.init();
        Feature.init();
        G.featureDiv = $(D.featureDiv);
        G.featureDiv.bg_Pin([D.maxiSize, 1000]); // set outer limit

        G.scrollJq = $(D.scrollDiv);
        G.scrollDiv = G.scrollJq[0];
        G.scrollJq.bg_Pin([D.maxiSize, 700]); // set outer limit

    }

    function slideSubscribe(obj) {
        var div, slide;
        if (obj.role.match('clouds')) {
            return;
        }
        if (obj.role.match('street')) {
            obj.jq.on(G.D.transend, function () {
                Vehicle.stop();
                X = G.logScroll && C.debug('transend');
            });
        }
        div = G.scrollDiv;
        slide = function () {
            obj.jq.bgPosition((div.scrollLeft / obj.ratio[0] |0), div.scrollTop / obj.ratio[1]|0);
        };
        $.subscribe('slideTo', slide);
    }

    function addBkgr(grp, idx) {
        var nom = (grp + '_layer_' + idx),
            dat = D[grp];
        X = dat[idx];
        X.jq = G[nom] = new Player(X).valueOf();
        slideSubscribe(X);
    }

    function addSky() {
        addBkgr('sky', 1);
        addBkgr('sky', 2);
        addBkgr('sky', 3);
        addBkgr('sky', 4);
    }

    function addGround() {
        addBkgr('ground', 1);
        addBkgr('ground', 2);
        addBkgr('ground', 3);
        addBkgr('ground', 4);
    }

    function flipSign(evt, up) {
        var posi, size;
        var jq = $(this);
        posi = up ? 0 : 500;
        size = up ? '100% 100%' : '100% 10%';

        jq.css({
            backgroundPositionY: posi,
            backgroundSize: size,
        });
    }

    function configEvents() {
        G.port0 = G.featureDiv.porter().get;
        $('.feature').on('inview', flipSign);
    }

    function startPubsub() {
        $.subscribe('slideTo', function () {
            $('#Features').scrubLeft(G.scrollDiv.scrollLeft);
        });

        var throt = $.throttle(500, false, function () {
            X = G.logScroll && console.debug('scrolling');
            $.publish('slideTo', G.scrollDiv.scrollLeft);
            Vehicle.move();
        }, false);

        G.scrollJq.on('scroll', function () {
            X = G.logScroll && console.debug('throttling');
            return throt();
        });

        $(W).on('resize', function () {
            $.publish('resize');
        });
    }

    function handleSpace() {
        G.space = new Space(G.featureDiv);
        G.scroll = new Space(G.scrollDiv);
        G.scroll.scrollToStart(0, 1);
    }

    function establishMem() {
        var mem = Blobo.neo('mem'),
            now = mem();

        W.remember = function (obj) {
            now = $.extend(true, G.userPrefs, now, obj);
            return mem(now);
        };
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    veil();

    function main() {
        establishMem();
        primaryInits();

        addSky();
        addGround();
        unveil();

        handleSpace();
        configEvents();
        startPubsub();

        Seasons.init();
        C.debug('main');
        test(W);
        W.setTimeout(function () {
            $('*').scroll();
        }, 999);
    }

    W.inits = main;

}(window));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
