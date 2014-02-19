/*jslint es5:true, white:false */
/*globals $, Global, Points, Region, Signs, Stage, Vehicle,
    _, iF_Cycle, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Platter;

(function (W) { //IIFE
    var name = 'Platter',
        self = new Global(name, '(tray for plates)'),
        C = W.console,
        G = W.Globals,
        Df, Div;

    Df = { // DEFAULTS
        div: null,
        time: 22222,
        jqCache: null,
        evts: 'keydown.' + name + ' click.' + name,
        modal: 0,
        partsUrl: 'parts.html',
        host: '#Platter',
        wasHidden: null,
        // cycle
        nomList: ['welcome', 'legalbs', 'choice', 'help', 'finish', 'sources', 'upgrade'],
        inits: function () {
            $.extend(true, self, iF_Cycle(Df, this.nomList));
        },
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _scrollBox(b) {
        Stage.cover(b);
    }
    function getgoing() {
        // load page
        // count plates by getting each name for a list
    }
    function idPlates(jq) {}

    function _restore(key, jqs) {
        var str = W.remember()[key];
        str = '.' + str;
        jqs.filter(str).trigger('click');
    }

    function _hide() {
        $.PS_pub('platter', false);
        Div.fadeOut();
        _scrollBox(0);
        Df.wasHidden = 1;
    }

    function _dismisser() {
        $('#Scroll').on('click', function () {
            if (!Df.modal) {
                _hide();
            }
        });
    }

    function _show(x) {
        /// get platter class
        $.PS_pub('platter', true);
        self.ic_pick(x);
        if (x !== undefined) {
            _dismisser();
            Df.modal = x;
        }
        Div.fadeIn();
        _scrollBox(1);
        Df.wasHidden = 0;
    }

    function _choose($me, sibs, prop, obj, meth) {
        var dat = $me.data()[prop],
            cnom = 'selected';

        cnom = [cnom, dat].join(' ');

        $me.addClass(cnom);
        $me.on(Df.evts, function (evt) {
            if (_.isChoiceEvt(evt)) {
                sibs.removeClass(cnom);
                $me.addClass(cnom);
                obj[meth](dat);
            }
        });
    }

    function _becomeChoice() {
        var $me = $(this),
            sibs = $me.closest('tr').find('img');

        // choice handlers
        if ($me.is('.model')) {
            _choose($me, sibs, 'model', Vehicle, 'type');
        } else if ($me.is('.region')) {
            _choose($me, sibs, 'region', Region, 'pick');
        }
    }

    function _welcome() {
        _show('welcome');
    }
    function _choice() {
        _show('choice');
    }
    function _help() {
        _show('help'); // dismiss on any click or key no covering?
    }
    function _finish() {
        tallyFill();
        _show('finish');
    }
    function _sources() {
        _show('sources');
    }
    function _upgrade() {
        _show('upgrade');
    }
    function _legalbs() {
        _show('legalbs');
    }

    function _attach(jq) {
        var imgs, evts = 'click';

        Div.append(jq.find('.plate'));

        Div.on('mouseover', '.option', _becomeChoice);
        Div.on(evts, '.btn_choice', _choice);
        Div.on(evts, '.btn_help', _help);
        Div.on(evts, '.btn_hide', _hide);
        Div.on(evts, '.btn_finish', _finish);
        Div.on(evts, '.btn_sources', _sources);
        Div.on(evts, '.btn_welcome', Points.restart);
        Div.on(evts, '#Ih8ie', function () {
            setTimeout(function () {
                _welcome();
            }, 999);
            W.open('https://www.google.com/intl/en/chrome/browser/');
        });

        stickyClick(Div, evts, 'btn_');

        imgs = Div.find('#_choice img') //
        .trigger('mouseover') // the "options" just became choices
        .removeClass('option');

        _restore('model', imgs);
        _restore('region', imgs);
    }

    function _load() {
        C.debug('Platter._load');

        Df.jqCache = $('<div>').load(Df.partsUrl, function (html, stat) {
            if (stat !== 'success') {
                throw new Error('Cannot load from parts.html');
            }
            _attach(Df.jqCache);
            _welcome();
            $('.primary').on('inview', function (evt, visi){
                if (visi) {
                    $(this).focus();
                    C.log(evt);
                }
            });
        });
    }

    function _toggle() {
        if (Df.wasHidden) {
            _show();
        } else {
            _hide();
        }
    }

    function _makeDiv() {
        Div = Df.div = $('<div>').attr({
            id: 'Platter',
            'class': "welcome",
        }).appendTo('body');
    }

    function _advance() {
        self.ic_next();
        _toggle(Df.wasHidden);
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();
        _makeDiv();
        _load();
        return self;
    }

    W[name] = $.extend(true, self, {
        _: function () {
            return Df;
        },
        init: _init,
        broke: _upgrade,
        hide: _hide,
        finish: _finish,
        help: _help,
        legal: _legalbs,
        show: _show,
        test: _advance,
        toggle: _toggle,
        // iF_Cycle
        // // ic_look // ic_name // ic_next // ic_numb // ic_pick // ic_prev
    });

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


*/
