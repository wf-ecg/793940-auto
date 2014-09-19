/*jslint white:false */
/*globals _, C, W, Glob:true, Util, jQuery,
        Global, Modernizr, ROOT, */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, Glob = new Global('Glob'), Tests;

(function ($, M, G) {
    'use strict';
    C.groupCollapsed('load routines');
    W.Data = new G.constructor('Data');
    W.Tests = $.Callbacks();
    G.Load = {};

    _.defaults(G, { /// all stubs terminated
        dat: ROOT.dir + '/data/',
        dir: ROOT.dir + '/',
        lib: ROOT.lib + '/',
        loc: ROOT.dir + '/lib/',
        src: ROOT.dir + '/scripts/',
        top: ROOT.dir + '/',
        postfix: function () {},
    });

    if (W.isIE) {
        $(function () {
            $('html').addClass('msie');
        });
        W.debug--;
    }

    if (ROOT.conf.nom === 'wfmedia' || ROOT.conf.nom === 'mfal') {
        W.debug--;
    }
    if (ROOT.conf.nom === 'localhost') {
        W.debug++;
    }

    G.Load.base = {
        test: W.isIE,
        yep: [
        G.lib + 'ie/nwmatcher.min.js', /*       css3 selector help      */
        G.lib + 'ie/rem.min.js', /*             css rem polyfill        */
        G.lib + 'ie/selectivizr-min.js', /*     css3 polyfill           */
        G.lib + 'ie/split.js', /*               string.regexp polyfill  */
        ],
        both: [
        G.lib + 'underscore/string-2.3.0/underscore.string.js',
        // G.loc + '_mix.js',
        // G.loc + '_util.js',

        // G.lib + 'jq/jq-pubsub.js',
        // G.lib + 'jq/jq-raf.js',
        // G.loc + 'if_cycle.js',
        // G.loc + 'jq-bg.js',
        // G.loc + 'jq-debounce.js',
        // G.loc + 'jq-inview.js',
        // G.loc + 'jq-porter.js',
        // G.loc + 'js-blobo.js',
        // G.loc + 'js-keypress.js',

        'build/lib.js',
        ],
        complete: function () {
            var vers;
            if (W.isIE) {
                vers = parseInt($.browser.version, 10);
                if (vers < 10) {
                    W.location = 'images/plates/broke.png';
                }
            }
            if (W.location.hash || W.location.search) {
                W.location = W.location.pathname;
            }
        },
    };

    G.Load.data = {
        both: [
        G.dat + 'init.js',
        G.dat + 'ground.js',
        G.dat + 'models.js',
        G.dat + 'sky.js',
        G.dat + 'stats.js',
        ],
        complete: function () {},
    };

    G.Load.font = {
        test: ROOT.conf.nom === 'localhost' || ROOT.conf.nom === '127.0.0.1',
        yep: [
            G.lib + 'fonts/archer.ssm.css',
            G.lib + 'fonts/archer.ssm.itl.css',
        ],
        nope: [
            /*'//cloud.typography.com/6819872/620964/css/fonts.css',  Normal */
            '//cloud.typography.com/6819872/633184/css/fonts.css', /* ScrnSmrt */
        ],
    };

    G.Load.main = {
        both: [
            // G.src + 'banner.js', /*     + css    */
            // G.src + 'backer.js',
            // G.src + 'signs.js', /*      + css    */
            // G.src + 'platter.js', /*    + css    */
            // G.src + 'player.js',
            // G.src + 'region.js',
            // G.src + 'seasons.js', /*    + css    */
            // G.src + 'space.js',
            // G.src + 'stage.js', /*      + css    */
            // G.src + 'vehicle.js', /*    + css    */
            // G.src + 'points.js', /*     + css    */

        'build/src.js',
        '_hack.js',
        ],
        complete: function () {
            if ($.browser.mozilla) {
                W.setTimeout(function () {
                    $('#Platter td').wrapInner('<div class="relative">'); // HACK!
                    C.warn('fftd');
                }, 999);
            }

            C.groupEnd();
            C.info('Load.main init @ ' + Date() + ' debug:', W.debug); //, self.mode
            $(W.inits);
        },
    };

    G.Load.test = {
        test: W.debug > 1,
        yep: [
            G.src + '_tests.js'
        ],
        nope: [
            'http://www.wellsfargomedia.com/lib/js/ecg-ga.js',
        ],
    };
    M.load([G.Load.base, G.Load.data, G.Load.font, G.Load.main, G.Load.test]);

}(jQuery, Modernizr, Glob));
