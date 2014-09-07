/*jslint es5:true, white:false */
/*globals $, debug, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

$(function () {
    $('body').on('click', 'button', function () {
        var me = $(this),
            W = window,
            C = W.console;

        C.warn(me.find('a').first().attr('href'));
    });
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
