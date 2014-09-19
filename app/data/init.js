/*jslint white:false */
/*globals $, Data:true, Glob, Modernizr */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

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
        return 1e5 + Glob.port.width();
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
        time: (new Date().valueOf() / 36e5 | 0),
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
