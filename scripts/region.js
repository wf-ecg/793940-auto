/*jslint white:false */
/*globals C, W, Glob, Util, _, jQuery,
    Banner, Data, Region:true, Signs */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var Region = (function ($, G, U) { // IIFE
    'use strict';
    var name = 'Region',
    self = new G.constructor(name, '(gather stats according to region)'),
    Df;

    Df = G['+' + name] = { // DEFAULTS
        regionList: 'east,central,west',
        modelList: 'compact,midsize,minivan,utility',
        partList: 'Alternator,BrakePads,FuelPump,IgnitionSwitch,PowerSteering,Radiator,SparkPlugs,StarterMotor,WindowMotor',
        inits: function () {
            if (U.debug(1)) {
                W['_' + name] = this;
                C.debug(name, this);
            }
            Df.inited = true;
        },
    };

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INTERNAL
    // take obj, key,

    function Seeker(obj, key) {
        var rep = {};

        rep.idx = obj[key].split(',');
        rep.idy = _.invert(rep.idx);
        obj[key] = rep;

        rep.seek = function (arg, type) {
            var max = (rep.idx.length - 1);
            arg = _.purify(arg);

            if (_.isNumber(arg)) {
                if (arg > max) {
                    C.error(name, key + ':seek:' + arg, 'no index after ' + max);
                }
                return (type === 'number' ? arg : rep.idx[arg]);
            } else {
                if (!rep.idy[arg]) {
                    C.error(name, key + ':seek:' + arg, 'no entry');
                }
                return (type === 'string' ? arg : rep.idy[arg]);
            }
        };
    }

    function handleBrakes(part, prices) {
        if (_.isArray(prices[0])) {
            part = 'BrakeBoth';
        } else {
            part = 'BrakeFront';
        }
        return part;
    }

    function priceCheck(num) {
        num = String(num);
        if (num.match(/\.\d$/)) {
            num += '0';
        }
        return num;
    }

    function verbosifyRegion(str) {
        switch (str) {
            case 'east':
                return 'Eastern part of the U.S.';
            case 'west':
                return 'Western part of the U.S.';
            case 'central':
                return 'Central part of the U.S.';
            default:
                return 'this part of the U.S.';
        }
    }

    function querify(obj) {
        var price = _.isArray(obj.price) ? obj.price : [obj.price];

        obj.heading = $(obj.heading);
        obj.content = $(obj.content);
        obj.region = verbosifyRegion(obj.region);

        obj.content.find('.region').html(obj.region) //
        .end().find('.model').text(obj.titled) //
        .end().find('.price').eq(0).html('<strong>$' + priceCheck(price[0]) + '<strong>').end() //
        .end().find('.price').eq(1).html('<strong>$' + priceCheck(price[1]) + '<strong>');

        return obj;
    }

    function compileScenerio(modStr, parStr, regNum) {
        var partobj, prices, stats, titled;

        modStr = Df.modelList.seek((modStr || 0), 'string');
        parStr = Df.partList.seek((parStr || 0), 'string');
        regNum = Df.regionList.seek((regNum || 0), 'number');

        stats = Data.stats[modStr];
        // get before BrakePads becomes either [BrakeBoth or BrakeFront]
        prices = stats[parStr].prices;
        titled = stats[parStr].titled;

        if (parStr === 'BrakePads') {
            parStr = handleBrakes(parStr, prices);
        }
        partobj = Data.blurb[parStr];
        // bundle
        return querify({
            part: parStr,
            model: modStr,
            titled: titled,
            price: prices[regNum],
            region: Df.regionList.seek(regNum),
            // num to nom
            heading: partobj.heading,
            content: partobj.template,
            signtype: partobj.signtype,
            signfile: partobj.signfile,
            subject: partobj.subject,
        });
    }

    function allParts(modStr, regNum) {
        var i, num, tmp, parStr, regStr, obj, tot;

        obj = {};
        tot = 0;
        modStr = Df.modelList.seek((modStr || 0), 'string');
        regNum = Df.regionList.seek((regNum || 0), 'number');
        regStr = Df.regionList.seek((regNum || 0), 'string');

        for (i = 8; i > - 1; i--) {
            parStr = Df.partList.seek((i || 0), 'string');
            tmp = Region.comp(modStr, i, regNum);

            if (parStr === 'Radiator') {
                obj.model = tmp.titled;
            }
            tmp = tmp.price;
            if (_.isArray(tmp)) {
                num = ((tmp[0] | 0) + (tmp[1] | 0));
                tmp = num + '.00';
            } else if (tmp === 'NA') {
                num = 0;
            } else {
                num = tmp || 0;
            }

            tot += num;
            obj[parStr] = tmp;
        }
        obj.total = tot | 0;
        obj.region = verbosifyRegion(regStr);

        return obj;
    }

    function setRegion(nom) {
        C.debug.apply(C, arguments);

        W.remember({
            region: nom
        });
    }

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
    /// INVOKE

    function _init() {
        if (self.isInited(true)) {
            return null;
        }
        Df.inits();

        var foo = [];
        foo.push(new Seeker(Df, 'regionList'));
        foo.push(new Seeker(Df, 'modelList'));
        foo.push(new Seeker(Df, 'partList'));

        return self;
    }

    $.extend(self, {
        _: function () {
            return Df;
        },
        init: _init,
        region: Df.regionList.seek,
        model: Df.modelList.seek,
        part: Df.partList.seek,
        comp: compileScenerio,
        pick: setRegion,
        tally: allParts,
    });

    return self.init();
}(jQuery, Glob, Util));

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

/*

    describe in english
    mock in html
    model in js
    assemble in jq
    animate in css

 */
