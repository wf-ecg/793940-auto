/*jslint white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function jqPorter() {
    this.hook.apply(this, arguments);
}

(function ($, W) {
    var name = 'jqPorter',
        self = W[name],
        C = W.console,
        G = W.Globals;

    C.debug('load', name, '(wrap a scrolling container)');
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function Construct(jq) {
        jq = $(jq).first(); // JQ singular only

        var el = jq.get(0),
            Limit = {
            desc: 'Farthest bottom-right object edge',
        },
            Port = {
            desc: 'Size of container on screen',
        },
            Range = {
            desc: 'Max value for scroll (top left)',
        },
            Scroll = {
            desc: 'Current top-left offset from 0,0',
        };

        function showSettings() {
            return {
                port: Port,
                limit: Limit,
                range: Range,
                scroll: Scroll,
            };
        }

        function updateLimits() { // caches semi-static values
            Limit.w = el.scrollWidth;
            Limit.h = el.scrollHeight;
            Port.w = el.clientWidth; //  div right
            Port.h = el.clientHeight; // div bottom
            Range.x = Limit.w - Port.w; //  max x
            Range.y = Limit.h - Port.h; // max y
        }

        function updateOffsets() { // caches dynamic values
            Scroll.x = el.scrollLeft;
            Scroll.y = el.scrollTop;
        }

        function refresh() {
            updateLimits();
            updateOffsets();
        }

        function getPortPercents() {
            updateOffsets();
            return {
                x: (Scroll.x / Range.x) || 0,
                y: (Scroll.y / Range.y) || 0,
            };
        }

        // TODO // calc viewable/viewing area

        function getPort(divulge) {
            if (divulge) {
                refresh();
                return showSettings();
            }
            return getPortPercents();
        }

        $.extend(true, this, {
            inited: null,
            jq: jq,
            dom: el,
            get: getPort,
            set: refresh,
            show: function (){
                return getPort(true);
            },
            height: function () {
                return this.dom.clientHeight;
            },
            width: function () {
                return this.dom.clientWidth;
            },
            save: function () {
                var item = this;
                if (item.inited) {
                    return;
                }
                item.inited = true;
                jq.data(name, item);
                if ($.PS_sub) {
                    $.PS_sub('resize', refresh);
                }

                $(function () {
                    refresh();
                    C.debug('live', name, item.dom, item.show());
                });
            },
        });
        this.save();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // EXPOSE

    function _scrub(amount, speed) {
        var me = $(this);

        me.stop(1, 1).animate({
            scrollLeft: amount,
        }, (speed || G.speed || 666));
    }

    function _porter() {
        var me = $(this),
            dat, tmp;
        dat = me.data(name);
        tmp = ( dat || new self( me ) );
        return tmp;
    }

    self.prototype = {
        hook: Construct,
    };

    // become jQuery methods
    $.fn.porter = _porter;
    $.fn.scrubLeft = _scrub;

}(jQuery, window));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
