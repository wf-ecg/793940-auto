/*jslint white:false */
/*globals C, W, Glob, Util, _, jQuery,
    Hacks, Platter:true, Points, Region, Stage, Vehicle, iF_Cycle */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Platter = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Platter',
    self = new G.constructor(name, '(tray for plates)'),
    Df, Div;

    Df = G['+' + name] = { // DEFAULTS
        div: null,
        time: 22222,
        jqCache: null,
        evts: 'keydown.' + name + ' click.' + name,
        modal: 0,
        partsUrl: 'data/parts.html',
        host: '#Platter',
        wasHidden: null,
        // cycle
        nomList: ['welcome', 'phonie', 'legalbs', 'choice', 'help', 'finish', 'sources', 'upgrade'],
        inits: function () {
            if (U.debug(1)) {
                W['_' + name] = this;
                C.debug(this);
            }
            $.extend(true, self, iF_Cycle(Df, this.nomList));
            Df.inited = true;
        },
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _scrollBox(b) {
        Stage.cover(b);
    }

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
            if (Keypress.isChoiceEvt(evt)) {
                sibs.removeClass(cnom);
                $me.addClass(cnom);
                obj[meth](dat);
            }
        });
    }

    function _becomeChoice(evt) {
        var $me = $(evt.target),
            sibs = $me.closest('tr').find('img');

        // choice handlers
        if ($me.is('.model')) {
            _choose($me, sibs, 'model', Vehicle, 'type');
        } else if ($me.is('.region')) {
            _choose($me, sibs, 'region', Region, 'pick');
        }
    }

    function _legalbs() {
        _show('legalbs');
    }
    function _phonie() {
        _show('phonie');
    }
    function _welcome() {
        if (W.innerWidth < 700 && !G.mem.peek('screen')) {
            _phonie();
        } else if (!G.mem.peek('legal')) {
            _legalbs();
        } else {
            _show('welcome');
        }
    }
    function _choice() {
        _show('choice');
    }
    function _help() {
        _show('help'); // dismiss on any click or key no covering?
    }
    function _finish() {
        Hacks.tallyFill();
        _show('finish');
    }
    function _sources() {
        _show('sources');
    }
    function _upgrade() {
        _show('upgrade');
    }
    function _yesLegal() {
        G.mem.poke('legal', 1);
        _welcome();
    }
    function _yesScreen() {
        G.mem.poke('screen', 1);
        _welcome();
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
        Div.on(evts, '.btn_yesLegal', _yesLegal);
        Div.on(evts, '.btn_yesScreen', _yesScreen);
        Div.on(evts, '.btn_welcome', Points.restart);
        Div.on(evts, '#Ih8ie', function () {
            W.setTimeout(function () {
                _welcome();
            }, 999);
            W.open('https://www.google.com/intl/en/chrome/browser/');
        });

        Hacks.stickyClick(Div, evts, 'btn_');

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
            $('.primary').on('inview', function (evt, visi) {
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
    /// INVOKE

    function _init() {
        if (self.inited(true)) {
            return null;
        }
        Df.inits();

        _makeDiv();
        _load();

        return self;
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        init: _init,
        broke: _upgrade,
        hide: _hide,
        finish: _finish,
        help: _help,
        legal: _legalbs,
        phonie: _phonie,
        show: _show,
        test: _advance,
        toggle: _toggle,
        go: _welcome,
        isShowing: function () {
            return !Df.wasHidden;
        },
        // iF_Cycle
        // // ic_look // ic_name // ic_next // ic_numb // ic_pick // ic_prev
    });

    return self;
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*


 */
