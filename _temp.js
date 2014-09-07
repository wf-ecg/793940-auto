/*jslint es5:true, white:false */
/*globals $, console, debug, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function (W) {
    var name = 'nudgeEl';

    function self(sel, amt) { // take selector and a float
        var ele = $(sel),
            num, x, y, tmp;
        if (typeof amt !== 'number') {
            throw new Error();
        }
        num = parseFloat(amt);
        tmp = ele.get(0);
        x = tmp.offsetLeft;
        ele.css({
            left: x + num,
            // nudge ele by float
        });
    }

    W[name] = self;

}(window));


function onScrollStop() {
    //    log current position
    console.error('Weeeee Scroll!');

}
//ScrollBuffer.init(onScrollStop);
