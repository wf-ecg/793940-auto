/*jslint es5:true, white:false */
/*globals ROOT, C, W, Global, Modernizr, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, Globs, Tests;

Globs = new Global('Globals');

(function ($, G, M) {
    'use strict';
    var Load = {};

    W.Data = new G.constructor('Data');
    W.Tests = $.Callbacks();
    W.debug = 1;
    C.groupCollapsed('load routines');

    $.extend(G, { /// all stubs terminated
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
        loc: ROOT.dir + '/lib/',
        src: ROOT.dir + '/scripts/',
        dat: ROOT.dir + '/data/',
        postfix: function () {},
    });

    Load.base = {
        test: W.isIE,
        yep: [
        G.lib + 'ie/nwmatcher.min.js', /*       css3 selector help      */
        G.lib + 'ie/rem.min.js', /*             css rem polyfill        */
        G.lib + 'ie/selectivizr-min.js', /*     css3 polyfill           */
        G.lib + 'ie/split.js', /*               string.regexp polyfill  */
        ],
        both: [
        G.lib + 'underscore/string-2.3.0/underscore.string.js',
        G.loc + '_utils.js',
        ],
        complete: function () {
            if ($.browser.msie) {
                var vers = parseInt($.browser.version, 10);
                if (vers < 10) {
                    W.location = 'images/plates/broke.png';
                } else {
                    W.setTimeout(function () {
                        W.Platter.broke();
                    }, 999);
                }
            }
            if (W.location.hash || W.location.search) {
                W.location = W.location.pathname;
            }
        },
    };

    Load.lib = {
        both: [
        G.lib + 'jq/jq-pubsub.js',
        G.loc + 'blobo.js',
        G.loc + 'if_cycle.js',
        G.loc + 'jq-bg.js',
        G.loc + 'jq-debounce.js',
        G.loc + 'jq-inview.js',
        G.loc + 'jq-porter.js',
        ],
        complete: function () {},
    };

    Load.data = {
        both: [
        G.dat + 'init.js',
        G.dat + 'ground.js',
        G.dat + 'models.js',
        G.dat + 'sky.js',
        G.dat + 'stats.js',
        ],
        complete: function () {},
    };

    Load.src = {
        test: W.location.host !== 'localhost:8000',
        yep: [
            '//cloud.typography.com/6819872/620964/css/fonts.css', /* Normal */
            /*'//cloud.typography.com/6819872/633184/css/fonts.css',  ScrnSmrt */
        ],
        nope: [
            G.dir + 'fonts/archer.css',
            G.dir + 'fonts/archer.itl.css',
        ],
        both: [
            G.src + 'banner.js', /*     + css    */
            G.src + 'backer.js',
            G.src + 'signs.js', /*      + css    */
            G.src + 'platter.js', /*    + css    */
            G.src + 'player.js',
            G.src + 'region.js',
            G.src + 'seasons.js', /*    + css    */
            G.src + 'space.js',
            G.src + 'stage.js', /*      + css    */
            G.src + 'vehicle.js', /*    + css    */
            G.src + 'points.js', /*     + css    */
        ],
        complete: function () {
            if ($.browser.mozilla) {
                W.setTimeout(function () {
                    $('#Platter td').wrapInner('<div class="relative">'); // HACK!
                    C.warn('fftd');
                }, 999);
            }
        },
    };

    Load.main = {
        both: [
        G.src + '_main.js',
        G.src + 'hacks.js',
        ],
        complete: function () {
            C.groupEnd();
            C.info('Load.main init @ ' + Date() + ' debug:', W.debug); //, self.mode
            $(W.inits);
        },
    };

    M.load([Load.base, Load.lib, Load.data, Load.src, Load.main]);

}(jQuery, Globs, Modernizr));
