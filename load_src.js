/*jslint es5:true, white:false */
/*globals C, W, $, Modernizr */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
Modernizr.load([{
    test: W.location.host !== 'localhost:8000',
    yep: [
        '//cloud.typography.com/6819872/620964/css/fonts.css', /* Normal */
        /*'//cloud.typography.com/6819872/633184/css/fonts.css',  ScrnSmrt */
    ],
    nope: [
        'fonts/archer.css',
        'fonts/archer.itl.css',
    ],
    both: [
        'scripts/banner.js', /*     + css    */
        'scripts/backer.js',
        'scripts/signs.js', /*      + css    */
        'scripts/platter.js', /*    + css    */
        'scripts/player.js',
        'scripts/region.js',
        'scripts/seasons.js', /*    + css    */
        'scripts/space.js',
        'scripts/stage.js', /*      + css    */
        'scripts/vehicle.js', /*    + css    */
        'scripts/points.js', /*     + css    */
    ],
    complete: function () {
        if ($.browser.mozilla) {
            W.setTimeout(function () {
                $('#Platter td').wrapInner('<div class="relative">'); // HACK!
                C.warn('fftd');
            }, 999);
        }
    },
}]);
