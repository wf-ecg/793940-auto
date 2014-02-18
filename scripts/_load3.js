/*jslint es5:true, white:false */
/*globals Modernizr, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
Modernizr.load([{
    test: window.location.host !== 'localhost:8000',
    yep: [
        //cloud.typography.com/6819872/620964/css/fonts.css', // Normal
        '//cloud.typography.com/6819872/633184/css/fonts.css', // ScrnSmrt
    ],
    nope: [
        'lib/archer.ssm.css',
        'lib/archer.ssm.itl.css',
    ],
    both: [
        'styles/banner.css',
        'styles/signs.css',
        'styles/platter.css',
        'styles/seasons.css',
        'styles/stage.css',
        'styles/vehicle.css',
        'styles/points.css',
        'styles/fixes.css',

        'scripts/banner.js', //     + css
        'scripts/backer.js',
        'scripts/signs.js', //      + css
        'scripts/platter.js', //    + css
        'scripts/player.js',
        'scripts/region.js',
        'scripts/seasons.js', //    + css
        'scripts/space.js',
        'scripts/stage.js', //      + css
        'scripts/vehicle.js', //    + css
        'scripts/points.js', //     + css
        'scripts/fixes.js', //      + css
        ],
    }]);
