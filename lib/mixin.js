/*jslint es5:true, white:false */
/*globals console, require */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
var _ = (_ || require('underscore')), // nodejs
    compiled, list, template;

_.mixin({
    weave: function (x) {
        var a = _.keys(x),
            b = _.values(x);
        return _.map(a, function (key) {
            return [key, b.shift(), '<hr>'];
        });
    },
    spliceArray: function (a, b, c, d) {
        return a.splice.apply(a, [b, c].concat(d));
    },
});

function ___test() {

    function run(a, b) {
        if (a === b) console.log('pass:', b);
        else console.assert(a === b, arguments);
    }

    function runTest1() {
        console.log('runTest1');
        //  <%= %>  interpolate variables
        compiled = _.template("hello: <%= name %>");
        run(compiled({
            name: 'moe'
        }), 'hello: moe');
        //  <%  %>  execute arbitrary JavaScript code
        list = "<% _.each(people, function(name) { %><li><%= name %></li><% }); %>";
        run(_.template(list, {
            people: ['moe', 'curly', 'larry']
        }), '<li>moe</li><li>curly</li><li>larry</li>');
        //  <%- %>  evaluate a template function
        template = _.template("<b><%- value %></b>");
        run(template({
            value: '<script>'
        }), '<b>&lt;script&gt;</b>');
    }
    runTest1();
    //  _.templateSettings
    //      interpolate:     /<%=([\s\S]+?)%>/g
    //      evaluate:         /<%([\s\S]+?)%>/g
    //      escape:          /<%-([\s\S]+?)%>/g
    _.templateSettings = {
        interpolate: /\=\{\{(.+?)\}\}/g,
        evaluate: /\{\{(.+?)\}\}/g,
        escape: /\-\{\{(.+?)\}\}/g,
    };

    function runTest2() {
        console.log('runTest2');
        //  <%= %>  interpolate variables
        compiled = _.template("hello: ={{name}}");
        run(compiled({
            name: 'moe'
        }), 'hello: moe');
        //  <%  %>  execute arbitrary JavaScript code
        list = "\{\{_.each(people, function(name) {\}\}<li>{{name}}</li>\{\{});\}\}";
        run(_.template(list, {
            people: ['moe', 'curly', 'larry']
        }), '<li>moe</li><li>curly</li><li>larry</li>');
        //  <%- %>  evaluate a template function
        template = _.template("<b>{{-value}}</b>");
        run(template({
            value: '<script>'
        }), '<b>&lt;script&gt;</b>');
    }
    runTest2();

    /* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */

    //_.each(people, function (name) { % > < li > < %= name % > < /li> <% });

    function injectTest() {
        function spliceArray(a, b, c, d) {
            return a.splice.apply(a, [b, c].concat(d));
        }
        var arr = [11, 22, 55];
        spliceArray(arr, 2, 0, [33, 44]);
        run(arr.join(), '11,22,33,44,55');
    }
    injectTest();

    console.log('done')
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
