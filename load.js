/*jslint es5:true, white:false */
/*globals ROOT, C, D, W, Global, Modernizr, jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Data, Load, Test, Glob;

(function ($, M) {
    'use strict';
    var G, Load = {};

    G = W.G = new Global('Globals');
    W.Data = new Global('Data');
    W.Test = $.Callbacks();
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
        both: [
        G.lib + 'underscore/js-1.4.4/underscore.js',
        G.lib + 'underscore/string-2.3.0/underscore.string.js',
        G.loc + '_utils.js',
        ],
    };

    Load.prep = {
        test: W.isIE,
        yep: [
        G.lib + 'ie/nwmatcher.min.js', /*       css3 selector help      */
        G.lib + 'ie/rem.min.js', /*             css rem polyfill        */
        G.lib + 'ie/selectivizr-min.js', /*     css3 polyfill           */
        G.lib + 'ie/split.js', /*               string.regexp polyfill  */
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

    Load.main = {
        both: [
        G.dir + 'load_lib.js',
        G.dir + 'load_raw.js',
        G.dir + 'load_src.js',
        G.src + '_main.js',
        G.src + 'hacks.js',
        ],
        complete: function () {
            C.groupEnd();
            C.info('Load.main init @ ' + Date() + ' debug:', W.debug); //, self.mode
            $(W.inits);
        },
    };

    M.load([Load.base, Load.prep, Load.main]);
    Glob = G;

}(jQuery, Modernizr));
