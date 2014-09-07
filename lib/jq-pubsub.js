/*jslint es5:true, white:false */
/*globals jQuery */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
(function ($) {
    var O = $({});

    $.publish = O.trigger.bind(O);
    $.subscribe = O.on.bind(O);
    $.unsub = O.off.bind(O);

}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
