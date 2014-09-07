/*jslint es5:true, white:false */
/*globals $, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function (W) {

    $.fn.scrubLeft = function (amount, speed) {
        speed = (speed || W.globals.speed || 250);

        var me = $(this);

        me.stop(1, 1).animate({
            scrollLeft: amount,
        }, speed);
    };

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
