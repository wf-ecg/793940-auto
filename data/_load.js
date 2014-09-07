/*jslint es5:true, white:false */
/*globals $, Data:true, globals, Modernizr */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

Modernizr.load([{
    both: [
    'data/ground.js',
    'data/models.js',
    'data/sky.js',
    ],
    complete: function () {
        $.extend(true, globals, Data);
    },
}]);

Data = {
    // LOADING
    //'D':
    'ground': '?', //   DATA file
    'models': '?', //   DATA file
    'sky': '?', //      DATA file
    //
    // MAIN IDs
    featureDiv: '#Features',
    scrollDiv: '#Scroll',
    // GENerated
    'ground_layer_1': '?',
    'ground_layer_2': '?',
    'ground_layer_3': '?',
    'ground_layer_4': '?',
    'sky_layer_1': '?',
    'sky_layer_2': '?',
    'sky_layer_3': '?',
    'sky_layer_4': '?',
    'read3': '?', //    (readout obj)
    'scroll': '?', //   (space obj)
    'scrollJq': '?', // (jq of #Scroll)
    //
    // LIMITS
    fullSize: 1e5,
    maxiSize: 1e5 + $('body').width(),
    stops: 10,
    //
    // ADHOC
    height: '?',
    speed: '?',
    width: '?',
    transend: 'transitionend oTransitionEnd transitionEnd webkitTransitionEnd',
    //
    // DEFAULTS
    userPrefs: {
        devl: 0,
        wind: 1,
        season: 'summer',
        model: 'compact',
        region: 'central',
        setpoint: 1,
        showdash: 0,
    },
    //
    // TOGGLES
    logScroll: false,
    //
    // UNUSED?
    port: [500, 500],
    space: [500, 500],  // theoretical vs tangible ... engendered by contents
    //
    // FUNCTIONS
    //'port0': getter for ...
    calcGeo: function () {
    /*
    stops could change, over all size could change, recalc for 100,000 miles
    stop interval distances change
     */
    },
};
