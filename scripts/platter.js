/*jslint es5:true, white:false */
/*globals $, Vehicle, globals, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Platter;

(function (W) { //IIFE
    var name = 'Platter',
        C = W.console,
        G = W.globals,
        self = {},
        def = {},
        methods, Div, X;

    C.debug('load ' + name + '(show goodies)');

    def.time = 22222;
    def.ids = 0;

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL

    function _makeDiv() {
        Div = $('<div id="Platter">');
        def._div = Div;
        return Div;
    }

    function _show() {
        Div.fadeIn();
        def._hidden = 0;
    }

    function _hide() {
        Div.fadeOut();
        def._hidden = 1;
    }

    function _toggle() {
        X = (def._hidden) ? _show() : _hide();
        return self;
    }

    function _addButtonAct(nom, act) {
        var btn = $('<button class="red exit">');

        btn.text(nom).on('click', act);
        btn.appendTo(Div);
    }

    function _clean() {
        C.debug(name);
        Div.empty();
        _addButtonAct('Exit', _toggle);
    }

    function _style(obj) {
        Div.css(obj);
    }

    function _detach() {
        Div.remove();
    }

    function _resize(w, h) {
        _style({
            width: w,
            height: h,
        });
    }

    function _size(w, h) {
        _resize(w || '90%', h || '90%');
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// EITHER

    function attach() {
        Div.appendTo('body');
        _size('90%', 'auto');
        _hide();
        _clean();
    }

    function load(urlsel) {
        _clean();

        var tmp = $('<div>');
        // inject using jquery
        tmp.empty().load(urlsel, function () {
            tmp = tmp.children().fadeOut();
            tmp.appendTo(Div).fadeIn();
        });
    }

    function becomeChoice() {
        var $me = $(this),
            sibs = $me.closest('table').find('.option'),
            cnom = 'selected';

        $me.on('mouseup.' + name, function () {
            sibs.removeClass(cnom);
            $me.addClass(cnom);
            Vehicle.type(this.dataset.model);
        });
    }

    function toggle() {
        _toggle();
    }

    function test() {
        def.ids += 1;

        if (def.ids > 3) {
            def.ids = 1;
            _clean();
        }
        var sel = '/wf-ecg/793940-auto/parts.html #part' + def.ids;
        load(sel);
        return self;
    }

    self.init = function () {
        if (Div) {
            return self;
        }
        Div = _makeDiv(); // "private"
        attach();
        $('#Platter').on('mouseover', '.option', becomeChoice);

        return self;
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// EXTERNAL
    methods = {
        def: def,
        load: load,
        test: test,
        toggle: _toggle,
    };

    W[name] = $.extend(self, methods);
}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*

 set html contents from ...
 recenter


 */
