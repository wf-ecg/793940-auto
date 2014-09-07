/*jslint es5:true, white:false */
/*globals $, Data:true, Globals, Modernizr */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

Modernizr.load([{
    both: [
    'data/ground.js',
    'data/models.js',
    'data/sky.js',
    'data/stats.js',
    ],
    complete: function () {},
}]);

Data = {
    //
    // LOADING from files
    blurb: 'empty',
    ground: 'empty',
    models: 'empty',
    sky: 'empty',
    stats: 'empty',
    text: {
        Headlines: 'empty',
    },
    xRefParts: 'empty',
    xRefStage: 'empty',
    //
    // MAIN IDs
    // GENerated
    port: {
        element: null,
    },
    layers: {
        ground: $(),
        sky: $(),
        street: $(),
    }, // ground_layer_1-4...sky_layer_1-4
    signs: {
        div: '?',
        jq: '?',
        sel: '#Signs',
        space: '?',
    },
    scroll: {
        div: '?',
        jq: '?',
        sel: '#Scroll',
        space: '?',
    },
    //
    // LIMITS
    fullWidth: 1e5,
    maxiWidth: function () {
        return 1e5 + Globals.port.width();
    },
    stops: 10,
    //
    // ADHOC
    arrowControl: 1,
    speed: 2222,
    transend: 'transitionend oTransitionEnd transitionEnd webkitTransitionEnd',
    //
    // DEFAULTS
    userPrefs: {
        devl: 0,
        nodash: 1,
        wind: 1,
        season: 'summer',
        model: 'compact',
        region: 'central',
    },
    //
    // FUNCTIONS
    calcGeo: function () {
    /*
    stops could change, over all size could change, recalc for 100,000 miles
    stop interval distances change
     */
    },
};
