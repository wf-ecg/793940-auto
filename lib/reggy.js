/*jslint es5:true, white:false */
/*globals $, _, console, debug, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function (W) {
    //IIFE
    var name = 'reggy',
        self, $par, $reg, $str, inited;

    console.quebug('load ' + name + ' (searcher)');

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function pull() {
        return {
            reg: $reg.val(),
            str: $str.val(),
        };
    }

    function push(reg, str) {
        $reg.val(reg);
        $str.val(str);
    }

    function output(o) {
        var res, reg = new RegExp(o.reg, 'g');

        console.debug(reg);
        while ( !! (res = reg.exec(o.str))) {
            console.debug(res);
        }
    }

    function addFields() {
        $reg = $('<input id="REG">');
        $str = $('<input id="STR">');

        $reg.add($str).on('change', function () {
            output(pull());
        }).appendTo($par);

        $reg.wrap('<label>').after(' « pattern <br>');
        $str.wrap('<label>').after(' « string <br>');
    }

    function init(sel) {
        $par = $(sel);

        if ($par.length && !inited) {
            addFields(sel);
            push('\\{\\{\\w', '{{{a}}} a{{{bb}}} {{c}}');
            inited = true;
        }
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    self = function (sel) {
        console.debug(name + ' upon', sel);
        init(sel || '#Showbox');
    };
    self.toString = function () {
        return '[closure only]';
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    W[name] = self;

}(window));

/*



*/
