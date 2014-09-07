/*jslint es5:true, white:false */
/*globals $, Global, _, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function (W) {
    var name = 'Banner',
        self = new Global(name, '(roll out statistics on point)'),
        C = W.console,
        G = W.Globals,
        Df, Div;

    Df = { // DEFAULTS
        div: null,
        host: '#View',
        empty: true,
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _makeDiv() {
        Div = Df.div = $('<div id="Banner">');
        var band = {
            div: $('<div class="band">'),
            heading: {
                div: $('<div class="heading">'),
            },
            content: {
                div: $('<div class="content">'),
            },
            dangler: {
                div: $('<div class="dangler">'),
            },
        };
        band.div.append(band.dangler.div, band.content.div, band.heading.div);
        band.heading.div.html('<h2>...</h2>');
        band.content.div.html('<p>...</p>');

        Div.append(band.div);
        $(Df.host).append(Div);
    }

    function _justHide() {
        Div.removeClass('show');
    }

    function _justShow() {
        Div.addClass('show');
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function toggleShow(force) {
        C.error('tracing', 'togshow');
        if (Df.empty) {
            return _justHide();
        }
        if (force === true) {
            return _justShow();
        }
        if (force === false) {
            return _justHide();
        }
        if (Div.is('.show')) {
            return _justHide();
        } else {
            return _justShow();
        }
    }

    function enterData(heading, content, type) {
        if (_.isNull(heading)) {
            C.debug(name, 'enterData', 'null');
            Div.removeClass('show');
            Df.empty = true;
            //            heading = ' ';
            //            content = ' ';
        } else {
            // C.error(name, 'enterData', 'filling');
            Df.empty = false;
        }
        if (heading) {
            Div.find('.heading').html(heading).end() //
            .find('h2').addClass(type);
        }
        if (content) {
            Div.find('.content').html(content);
        }
        if (type) {
            Div.find('.heading').css({
                backgroundImage: 'url(./images/tags/' + type + '.png)',
            });
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        _makeDiv();
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        make: _makeDiv,
        togg: toggleShow,
        show: _justShow,
        hide: _justHide,
        fill: enterData,
    });

    self.init();

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*



 */
