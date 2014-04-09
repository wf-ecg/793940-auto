/*jslint es5:true, white:false */
/*globals $, Data:true, Globals, Modernizr */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var SVR, CDN;

new Global('Data');
new Global('Globals');

SVR = {
    self: '/lib/',
    disk: 'file:///lib/',
    bithon: '../../../../lib/',
    webdev: 'http://10.89.101.100/lib/',
    mython: 'http://10.89.101.81:8000/lib/',
    python: 'http://localhost:8000/lib/',
    other0: 'http://cdnjs.cloudflare.com/ajax/libs/',
};
CDN = SVR.bithon;
W.debug = 1;

function Init() {
    C.info('Main init @ ' + Date() + ' debug:', W.debug, self.mode);
    $(W.inits);
}

Modernizr.load([
{
    both: [
    CDN + 'underscore/js-1.4.4/underscore.js',
    CDN + 'underscore/string-2.3.0/underscore.string.js',
    'lib/_utils.js',
    ],
},{
    test: W.isIE,
    yep: [
    'styles/ie.css',
    'scripts/fixie.js', //                homebrew bondo
    CDN + 'ie/nwmatcher.min.js', //   css3 selector help
    CDN + 'ie/rem.min.js', //         css rem polyfill
    CDN + 'ie/selectivizr-min.js', // css3 polyfill
    CDN + 'ie/split.js', //           string.regexp polyfill
    ],
    complete: function () {
        if ($.browser.msie) {
            var vers = parseInt($.browser.version);
            if (vers < 10) {
                location = 'images/plates/broke.png';
            } else {
                W.setTimeout(function () {
                    Platter.broke();
                }, 999);
            }
        }
        if (location.hash || location.search) {
            location = location.pathname;
        }
    },
},{
    both: [
    'load_lib.js',
    'load_raw.js',
    'load_src.js',
    '_main.js',
    '_ideas.js',
    ],
    complete: Init,
},
]);
