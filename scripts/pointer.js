/*jslint es5:true, white:false */
/*globals $, Odom, globals, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Pointer;

(function (W) { //IIFE
    var name = 'Pointer',
        C = W.console,
        G = W.globals,
        self = {},
        points, def = {},
        methods, div, X;

    C.debug('load', name, '(scroll to named point)');

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    def.time = 22222;
    def.all = ['summer', 'autumn', 'winter', 'spring'];

    function changeTo(name) { // jump to point
    }

    function getName(num) {
        // name of closest waypoint
    }

    function advance() { // next point
    }

    function scrollNum(num) {
        $('#Scroll').scrollLeft(num);
    }

    function nom2num(nom) { // parse num from id
        var num;

        if (typeof nom === 'object') {
            nom = nom.id;
        }
        num = nom.match(/\d+/g);

        return parseInt(num ? num[0] : 0, 10);
    }

    function scrollTo(ele) {
        var num = nom2num(ele);
        scrollNum(num * 10000 + G.width);
    }

    function makeLink(jq) {
        var ele, wrap, link, off, num;

        ele = jq[0];
        wrap = $('<span>').addClass('pointer');
        off = jq.offset().left;
        link = $('<a>');

        link.attr('href', ('#' + ele.id)) //
        .text(nom2num(ele));

        link.on('click.' + name, function (evt) {
            evt.preventDefault();
        });

        link.on('mousedown.' + name, function (evt) {
            div.find('a').removeClass('active');
            link.addClass('active');

            Odom.digs[0].setTo(nom2num(ele));

            // TODO subscribe to 'mileage'
            C.debug(name, off); // put client width into global and keep updated
            scrollNum(off);
        });

        wrap.append(link);
        return wrap;
    }

    function makeNav(jqs) {
        div = $('<div class="waypoints">').appendTo('#Toc');
        jqs.each(function () {
            var me = makeLink($(this));
            div.append(me);
        });
    }

    function init() {
        if (def.inited) {
            return;
        }
        points = $('#Features .feature.signs').slice(1);
        makeNav(points);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    methods = {
        init: init,
    };

    W[name] = $.extend(self, methods);
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
