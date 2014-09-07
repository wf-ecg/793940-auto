
function timeToGoofOff() {
    // if first run, no
    // if random 30% random chance
    // if dev mode, 200% more likely
    // is item is blessed, 1000% more likely

    // add Class goof_off + goof_on
}

function testTmpl() {
    var tmpl, dat,
    C = window.console;

    dat = {
        epithet: 'bond company stooge!',
        fake : '< & >',
        names: [ 'Moe', 'Curly', 'Larry'],
        name: 'Shemp',
    };

    //  <%= …   (interpolate variables)
    tmpl = _.template('Hey, <%= name %>.');
    C.log( tmpl(dat) );

    //  <%- …   (to be HTML-escaped)
    tmpl = _.template('<%- fake %>');
    C.log( tmpl(dat) );

    //  <% …    (execute javascript)
    tmpl = '<% _.each(names, function(name, idx) { %><%= 1 + idx %>: <%= name %> \n<% }); %>';
    C.log( _.template(tmpl, dat) );

    //  print from code...instead of using <%=
    tmpl = _.template('<% print("Beat it, " + epithet); %>');
    C.log( tmpl(dat) );
}

function stickyClick(delegate, trigger, filter) {
    var name = '.stickyClick',
    last;

    filter = RegExp( filter || 'btn_' );

    delegate.on('mousedown' + name, function (evt) {
        // if target class passes filter, store target element
        var tele = evt.target;
        last = (tele.className.match(filter)) ? tele : undefined;
    });

    delegate.on('mouseup' + name, function () {
        // redelegate click to last sub-delegate mousedown target
        if (last) {
            $(last).trigger(trigger || ('click' + name));
        }
    });
}

function tallyFill(obj) {
    var div, tmp, dat,
        self = tallyFill;

    div = $('.boxed');
    tmp = self.tmp;
    dat = Region.tally(W.remember().model, W.remember().region) || {
        total: 340.55,
        model: 'compact car',
        region: 'Western',
        Alternator: 12.34,
        BrakePads: 34.56,
        FuelPump: 15,
        IgnitionSwitch: 34.56,
        PowerSteering: 10,
        Radiator: 12.34,
        SparkPlugs: 12.34,
        StarterMotor: 5,
        WindowMotor: 34.56,
    };

    if (!tmp) { // reconstitute from markup
        tmp = div.html();
        tmp = tmp.replace(/&lt;%/g,'<%');
        tmp = tmp.replace(/%&gt;/g,'%>');
        self.tmp = tmp;
    }

    return div.html(_.template(tmp, dat));
}
