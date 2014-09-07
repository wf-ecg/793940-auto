/*jslint es5:true, white:false */
/*globals $, globals, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Pager;

(function (W) { //IIFE
    var name = 'Pager',
        C = W.console,
        G = W.globals,
        self = {},
        def = {},
        methods, div, X;

    C.debug('load', name, '(show advance mech)');
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // DEFAULTS
    def.host = '#Toc';
    def.left = {
        css: {
            left: '22px',
//            WebkitTransform: 'rotate(180deg)',
        },
        src: 'images/misc/left-off.png',
    };
    def.right = {
        css: {
            right: '22px',
        },
        src: 'images/misc/right-off.png',
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // INTERNAL

    function _flipImage(b) {
        var $me = $(this),
            src = $me.attr('src');

        if (b) {
            src = src.replace('-off', '-on');
        } else {
            src = src.replace('-on', '-off');
        }

        $me.attr('src', src);
    }

    function _doClick(evt) {
        var num = (evt.data.side === 'left') ? - 1 : 1;
        $('#Scroll').scrubLeft('+=' + 5000 * num);
    }

    function _doHover(evt) {
        _flipImage.call(this, evt.data.active);
        if (evt.data.active) {
            _doClick(evt);
        }
    }

    function _makeArrow(side) {
        var img = $('<img class="nav arrow">').addClass(side) //
        .on('mouseover.' + name, {
            active: true,
            side: side
        }, _doHover) //
        .on('mouseout.' + name, {
            active: false,
            side: side
        }, _doHover) //
        .on('click.' + name, {
            side: side
        }, _doClick);
        return img;
    }

    function addArrows() {
        var img;

        _makeArrow('left').css(def.left.css) //
        .attr('src', def.left.src).appendTo(def.host);

        _makeArrow('right').css(def.right.css) //
        .attr('src', def.right.src).appendTo(def.host);
    }

    function scrub(num) {
        $('#Scroll').scrubLeft('+=' + 5000 * num);
    }

    function init() {
        addArrows();
        // bind events
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    methods = {
        init: init,
        flip: _flipImage,
    };
    W[name] = $.extend(self, methods);

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*



 */
