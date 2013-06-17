/*jslint es5:true, white:false */
/*globals $, console, debug, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

$(function () {
    $('body').on('click', 'button', function () {
        var me = $(this);
        console.warn(me.find('a').first().attr('href'));
    });
});

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
