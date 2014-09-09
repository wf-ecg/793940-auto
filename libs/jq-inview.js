/*jslint white:false */
/*globals jQuery, window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function (W, $) {
    var name = 'inview',
        vSiz, vOff, C, D, DE, Df;
    //
    function _def() {
        return (typeof arguments[0] !== 'undefined');
    }

    C = W.console;
    D = W.document;
    DE = D.documentElement;
    Df = {
        cache: {},
        speed: 100,
        count: 0,
        inits: function () {},
    };
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function getPortOffset() {
        return {
            left: W.pageXOffset || DE.scrollLeft || D.body.scrollLeft,
            top: W.pageYOffset || DE.scrollTop || D.body.scrollTop
        };
    }

    function getPortSize() {
        var mode, domObject, size = {
            height: W.innerHeight,
            width: W.innerWidth
        };

        // if this is correct then return it.
        // iPad has compat Mode, so will go into check clientHeight/clientWidth
        // (which has the wrong value).
        if (!size.height) {
            mode = D.compatMode;
            if (mode || !$.support.boxModel) { // IE, Gecko
                domObject = mode === 'CSS1Compat' ? DE : // Standards
                D.body; // Quirks
                size = {
                    height: domObject.clientHeight,
                    width: domObject.clientWidth
                };
            }
        }

        return size;
    }

    (function () {
        var Dust, _dirty = true,
            _delay = 333;

        Dust = function (time) {
            if (time === - 1) {
                _dirty = false;

            } else if (time !== null) {
                time = (time || _delay);

                W.setTimeout(function () {
                    _dirty = true;

                    C.log('dust in', time);
                }, time);
            }
        };

        Dust.valueOf = function () {
            return _dirty;
        };

        W.dust = Dust;
    }());

    function checkInView() {
        if (!W.dust) {
            return;
        }
        var $eles = $();

        $.each(Df.cache, function (i, inviewObject) {
            var selector = inviewObject.data.selector,
                $ele = inviewObject.$ele;
            $eles = $eles.add(selector ? $ele.find(selector) : $ele);
        });

        if ($eles.length) {
            vOff = vOff || getPortOffset();
            vSiz = vSiz || getPortSize();

            $eles.each(function (i, e) {
                var $ele, eSiz, eOff, inView, visiX, visiY, visiMerged;

                // Ignore elements that are not in the DOM tree
                if (!$.contains(DE, $eles[i])) {
                    return;
                }

                $ele = $($eles[i]);
                eSiz = {
                    height: $ele.height(),
                    width: $ele.width(),
                };
                eOff = $ele.offset();
                inView = $ele.data(name);

                /*
                For unknown reasons:
                    viewportOffset and viewportSize are sometimes suddenly null in Firefox 5.
                    It seems that the execution of this function is interferred
                        by the onresize/onscroll event where viewportOffset and viewportSize are unset
                */
                if (!vOff || !vSiz) {
                    return;
                }

                if (eOff.top + eSiz.height > vOff.top && //
                    eOff.top < vOff.top + vSiz.height && //
                    eOff.left + eSiz.width > vOff.left && //
                    eOff.left < vOff.left + vSiz.width) {
                    visiX = (vOff.left > eOff.left ? //
                        'right' : (vOff.left + vSiz.width) < (eOff.left + eSiz.width) ? //
                        'left' : 'both');
                    visiY = (vOff.top > eOff.top ? //
                        'bottom' : (vOff.top + vSiz.height) < (eOff.top + eSiz.height) ? //
                        'top' : 'both');
                    visiMerged = visiX + "-" + visiY;
                    if (!inView || inView !== visiMerged) {
                        $ele.data(name, visiMerged).trigger(name, [true, visiX, visiY]);
                    }
                } else if (inView) {
                    $ele.data(name, false).trigger(name, [false]);
                }
            });
        }
        W.dust(-1);
    }

    function _forceCheck() {
        if (W.debug > 1) {
            C.debug('_forceCheck');
        }
        checkInView();
        Df.count++;
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    $.event.special[name] = {
        add: function (data) {
            Df.cache[data.guid + "-" + this[$.expando]] = {
                data: data,
                $ele: $(this)
            };
        },
        remove: function (data) {
            try {
                delete Df.cache[data.guid + "-" + this[$.expando]];
            } catch (e) {}
        }
    };

    function _init() {
        Df.inits();
        W.INVIEW = Df;

        $(W).bind("scroll resize", function () {
            vSiz = vOff = null;
        });

        // IE < 9 scrolls to focused elements without firing the "scroll" event
        if (!DE.addEventListener && DE.attachEvent) {
            DE.attachEvent("onfocusin", function () {
                vOff = null;
            });
        }
        /*
            Use setInterval to ensure this captures elements within "overflow:scroll" elements
            or elements that appeared in the dom tree due to dom manipulation and reflow
            old: $(window).scroll(checkInView);

            BTW, iOS seems to not execute (or delay) intervals while the user scrolls.
            Therefore the inview event might fire a bit late there

            Don't set interval until we get at least one element that has bound to the inview event.
        */

        $(function () {
            (W.debug > 1) && C.warn('kickstart jquery.' + name);
            $(W).scroll();
        });
        if (Df.speed > 10) {
            W.setInterval(_forceCheck, Df.speed);
        }
    }

    $(_init);

}(window, jQuery));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
