/*jslint white:false */
/*globals window */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

var Keypress = (function (W) {
    var self, u = '',
    keyNomArray;

    keyNomArray = [u, u, u, u, u, u, u, u, "backg", "tab", u, u, u, "enter",
    u, u, "shift", "ctrl", "alt", u, u, u, u, u, u, u, u, "esc", u, u, u, u,
    "space", "pageup", "pagedown", "end", "home", "left", "up", "right", "down", u, u, u, u,
    "insert", "delete", u, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", u, u, u, u, u, u, u,
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
    "command", u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u,
    "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "f10", "f11", "f12",
    u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, "numlock", "scrolllock",
    u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u,
    ",", u, ".", "/", "`", u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, u, "[", "\\", "]", "'"];

    self = {
        transKeyEvt: function (evt) {
            return keyNomArray[evt.which];
        },
        isChoiceEvt: function (evt) {
            if (evt.type === 'keydown' && self.transKeyEvt(evt) !== 'space') {
                return false;
            }
            return true;
        },

    };

    return self;

}(window));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
