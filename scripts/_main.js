/*jslint es5:true, white:false */
/*globals C, W, Globs, Util, _, jQuery,
    Signs, Backer, Banner, Blobo, Platter, Player, Points, Region, Vehicle, Seasons, Space, Stage */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

(function ($, G) {
    var D = W.Data,
        name = 'MAIN';

    W.G = G;
    G.D = D;
    $.extend(true, G, D);
    G.BPY = Boolean($('body').css('backgroundPositionY'));

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function slideSubscribe(obj) {
        if (obj.role.match('clouds')) {
            return;
        }
        if (obj.role.match('street')) {
            obj.jq.on(G.D.transend, function () {
                $.PS_pub('stopped');
                $.PS_pub('slideTo', G.scroll.div.scrollLeft);
            });
        }
        $.PS_sub('slideTo', function () {
            obj.jq.bgPosition( //
                (arguments[1] / obj.ratio[0] | 0), //
                (G.scroll.div.scrollTop / obj.ratio[1] | 0) //
            );
        });
    }

    function addPlayers() {
        var make = function (grp, idx) {
            var obj = G.D[grp][idx];

            obj.jq = new Player(obj).valueOf();
            slideSubscribe(obj);
            return obj.jq;
        };

        G.skys = $([
            make('sky', 1),
            make('sky', 2),
            make('sky', 3),
            make('sky', 4)]);

        G.grounds = $([
            make('ground', 1),
            make('ground', 2),
            make('ground', 3),
            make('ground', 4)]);
    }

    function openWaypoints() {
        // fadein waypoints
        $('#Points .waypoints').css({
            width: '35rem',
        }).show();
        // Reduce lr-padding
        $('#Points .waypoints .pointwrap').css({
            visibility: 'visible',
        });
    }

    function enableArrowKeys() { // @ huh
        $(W).on('keydown', function (evt) { //  enable arrow Keys
            var arr = _.arrowKeyXY(evt); //     into pix
            if (arr && arr[0]) {
                evt.preventDefault();
                if (G.arrowControl) {
                    C.debug(name, 'arrowControl', G.arrowControl);
                    $('#Scroll').scrubLeft('+=' + 100 * arr[0]);
                }
            }
        });
    }

    function enableWaypoints() {

        $.PS_sub('signview', function (evt, ele) {
            var idx, obj;
            var model, part, region;

            idx = Signs.index(ele); //  get waypoint index

            if (!ele) {
                Banner.fill(null);
                return; // nothing active. end
            }

            if (idx === 10) {
                openWaypoints();
                W.setTimeout(Platter.finish, 1555); // ACTION!
            }

            if (!(idx < 1 || idx > 9)) {
                region = G.mem.peek('region');
                model = G.mem.peek('model');
                // (already have the model and the region)
                part = idx - 1;
                //  with the sign/part number
                obj = Region.comp(model, part, region);

                Banner.show(false);
                //  send data to the alert mechanism
                Banner.fill(obj.heading, obj.content, obj.signtype);
            }

            C.debug(name, idx, obj, 'waypoint', [evt, ele]);
        });
    }

    function publishing() {

        W.setInterval(function () {
            $.PS_pub('refresh', G.signs.space.getPercent_h());
        }, 3333);

        G.scroll.jq.on('scroll', $.throttle(500, false, function () {
            $.PS_pub('slideTo', G.scroll.div.scrollLeft);
            $.PS_pub('stretch', G.scroll.div.scrollTop);
            $.PS_pub('moving');
        }, false));

        $(W).on('resize', $.throttle(500, false, function () {
            $.PS_pub('resize');
            C.debug(name, 'publish', 'resize', G.maxiWidth());
        }, false));

    }

    function watchInputDevice() {
        $('html').on('keydown', function (evt) { // key action
            $(this).removeClass('mouse');
            $(this).addClass('keyboard');
            W.dust();
        }).on('mousedown', function (evt) { // mouse action
            $(this).removeClass('keyboard');
            $(this).addClass('mouse');
            W.dust();
        });
    }

    function subscribing() {
        $.PS_sub('slideTo', function () {
            $('#Signs').scrubLeft(arguments[1]);
        });
        $.PS_sub('stopped', function () {
            Stage.mode('stopped');
            W.dust(1);
        });
        $.PS_sub('moving', function () {
            Stage.mode('moving');
            W.dust(1);
        });

        enableWaypoints();
    }

    function pubSub() {
        C.debug(name, 'pubSub');

        subscribing();
        $('.sign').on('inview', Signs.flip);
        publishing();

        // enableArrowKeys();
    }

    function establishMem() {
        var blob = Blobo.neo('auto-mem'),
            map = blob(),
            hrs = (G.userPrefs.time - (map.time || 0));

        W.remember = function (obj) {
            map = (hrs > 24) ? {} : map;
            map = $.extend(true, G.userPrefs, map, obj);
            return blob(map);
        };
        G._mem = blob;
        G._map = map;
        G.mem = {
            pass: function (prop, fn) { // apply / read
                var okay = this.peek(prop);
                if (fn && okay) {
                    return fn(okay);
                } else {
                    return okay;
                }
            },
            peek: function (prop) { // read
                return (G[prop] = W.remember()[prop]);
            },
            edit: function () { // prompt
                var dat = JSON.stringify(blob());
                dat = W.prompt('Memories:', dat);
                try {
                    dat = JSON.parse(dat);
                    blob(dat);
                } catch (err) {}
            },
            poke: function (prop, val) { // write / delete
                if (val !== undefined) {
                    if (_.isNull(val)){
                        delete W.remember()[prop];
                    } else {
                        W.remember()[prop] = val;
                    }
                }
                return this.peek(prop);
            },
        };
    }

    function handleSize() {
        G.signs.jq = $(D.signs.sel);
        G.signs.div = G.signs.jq[0];
        //
        G.scroll.jq = $(D.scroll.sel);
        G.scroll.div = G.scroll.jq[0];
    }

    function handleSpace() {
        G.signs.jq.bg_Pin([G.maxiWidth(), 1000]); // set outer limit
        G.scroll.jq.bg_Pin([G.maxiWidth(), 700]); // set outer limit
        addPlayers();
        G.signs.space = new Space(G.signs.jq);
        G.scroll.space = new Space(G.scroll.div);
        G.scroll.space.scrollToStart(0, 1);
    }

    function _initDash() {
        G.dash = $('#Dash');
        if (!G.mem.peek('nodash')) {
            G.dash.show();
        }
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function newMemory(key, val) {
        if (!key) {
            throw new Error();
        }
        var savf = function (x) {
            x = x !== undefined ? x : val;
            return G.mem.poke(key, x);
        };
        savf.valueOf = function (x) {
            if (_.isNull(x)) {
                G.mem.poke(key, x);
            }
            return G.mem.peek(key);
        };
        // preserve existing?
        val = val || savf.valueOf();
        return savf;
    }

    function newHider(jq, str) {
        var fn = newMemory(str, 1); // @ huh

        return function () {
            jq.hide();
            fn.valueOf(null);
            W.setTimeout(function () {
                if (W.debug) {
                    // restore
                    jq.show();
                    fn();
                }
            }, 3333);
        };
    }

    function addButtons() {
        var make = function (txt, act) {
            $('<button>').text(txt).addClass('red') //
            .click(act).appendTo(G.dash);
        };
        make('Data', G.mem.edit);
        make('Wind', Stage.wind);
        make('Season', Seasons.ic_next);
        make('Platter', function () {
            if (!Platter.isShowing()) {
                Platter.toggle();
            }
            Platter.ic_next();
        });
        make('Hide', newHider(G.dash, 'nodash'));
        make('Break', newHider(G.scroll.jq, 'noscroll'));
    }

    function primaryInits() {
        C.group(name, '1:primaryInits');
        // activate memories
        establishMem();
        watchInputDevice();
        _initDash();

        // set css on for each item...make divs and load images
        Backer.init();
        Signs.init();

        handleSize();
        G.port = G.signs.jq.porter();
        Signs.auto();
        handleSpace();

        Platter.init();

        C.groupEnd();
        C.group(name, '2:secondaryInits');
        Seasons.init();
        pubSub();
        addButtons(); // @ huh
        G.mem.pass('wind', Stage.wind);

        Points.init();
        Vehicle.init();
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    function finalInits() {
        C.groupEnd();
        C.group(name, '3:finalInits (timed)');
        $.PS_pub('resize');
        Stage.wake(); // Stage.stretch();
    }
    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    Stage.init();

    function main() {
        primaryInits();

        W.setTimeout(function () {
            finalInits();
            C.groupEnd();
        }, 999);
    }

    W.inits = main;

}(jQuery, Globs));
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*


 */