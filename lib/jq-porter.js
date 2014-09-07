/*jslint es5:true, white:false */
/*globals $, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

function jqPorter() {
    this.hook.apply(this, arguments);
}

(function ($, W) {
    var name = 'jqPorter',
        self = W[name],
        C = W.console,
        G = W.globals;

    function Construct(jq) {
        jq = $(jq).first();
        // JQ singular only
        var E = jq.get(0),
            Limit = {},
            Port = {},
            Range = {},
            Scroll = {};

        this.query = jq;
        this.element = E;

        Port.desc = 'Size of container on screen';
        Range.desc = 'Max value for scroll (top left)';
        Limit.desc = 'Farthest bottom-right object edge';
        Scroll.desc = 'Current top-left offset from 0,0';

        function showSettings() {
            return {
                E: E,
                port: Port,
                limit: Limit,
                range: Range,
                scroll: Scroll,
            };
        }

        function measure() { // caches semi-static values
            Limit.w = E.scrollWidth;
            Limit.h = E.scrollHeight;
            G.width = Port.w = E.clientWidth; //  div right
            G.height = Port.h = E.clientHeight; // div bottom
            Range.x = Limit.w - Port.w; //  max x
            Range.y = Limit.h - Port.h; // max y
        }

        function update() { // caches dynamic values
            Scroll.x = E.scrollLeft;
            Scroll.y = E.scrollTop;
        }

        function refresh() {
            if (W.debug > 1) {
                C.debug('refresh', name);
            }
            measure();
            update();
        }

        function getPortPercents() {
            update();
            return {
                x: (Scroll.x / Range.x) || 0,
                y: (Scroll.y / Range.y) || 0,
                e: E,
            };
        }

        function getPort(divulge, freshen) {
            if (freshen) {
                refresh();
            }
            if (divulge) {
                return showSettings();
            }
            return getPortPercents();
        }

        function save() {
            if (this.inited) {
                return;
            } else {
                this.inited = true;
            }
            $.subscribe('resize', refresh);
            jq.data(name, this);
            $(function () {
                refresh();
                C.debug('saved', name, E, getPort());
            });
        }

        getPort['...parent...'] = this;

        this.get = getPort;
        this.set = refresh;
        save();
    }

    function Init() {
        // was this element already done?
        return this.data(name) || new self($(this));
    }

    // EXPOSE
    self.prototype = {
        hook: Construct,
    };

    $.fn.porter = Init; // become jQuery method
    W[name] = self;

}(jQuery, window));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
