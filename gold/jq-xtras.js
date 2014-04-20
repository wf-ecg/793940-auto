/*jslint es5:true, white:false */
/*globals $, jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function ($) {
    $.fn.exempt = function (bool) {
        var ret = $();
        if (!bool) {
            ret = $(this);
        }
        ret.prevObject = this;
        return ret;
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // EASY ELEMENT IDENTITY
    $.fn.toString = function () {
        var out = [];

        this.each(function () {
            var tag, nom, eid, ecn;

            tag = (this.tagName || '???');
            nom = (this.name ? ('"' + this.name + '"') : 0);
            eid = (this.id ? ('#' + this.id) : 0);
            ecn = (this.className ? ('.' + this.className) : 0);
            nom = (nom || eid || ecn || '(anon)');

            out.push('<' + tag + nom + '>');
        });
        return ('jQuery:[' + (out.join(', ') || '(empty)') + ']');
    };
    $.nameSpace = function (str, nom) {
        var arr;

        if (!nom) {
            throw new Error('no namespace given');
        }
        arr = str.split(' ');

        // add dot and name to each event type
        str = _.map(arr, function (e) {
            return e + '.' + nom;
        }).join(' ');

        if (!str) {
            C.warn('namespace error');
        }
        return str;
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    // $erpent eats tail
    $.reify = function (host) {
        $.each(host, function (i, e) {
            host[i] = $(e);
        });
    };

}(jQuery));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
