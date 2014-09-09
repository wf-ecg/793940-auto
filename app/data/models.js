/*jslint white:false */
/*globals Data */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
Data.models = {
    types: ['compact', 'midsize', 'minivan', 'utility'],
    defaults: {
        css: {
            height: 250,
            marginLeft: -290,
            width: 580,
        }
    },
    compact: {
        css: {},
    },
    midsize: {
        css: {},
    },
    minivan: {
        css: {},
    },
    utility: {
        css: {},
    },
};

Data.xRefParts = [{ // parts 1 - 9 (in order)
    name: 'Alternator',
    icon: 'battery',
}, {
    name: 'BrakePads',
    icon: 'brake',
}, {
    name: 'FuelPump',
    icon: 'fuel',
}, {
    name: 'IgnitionSwitch',
    icon: 'ignition',
}, {
    name: 'PowerSteering',
    icon: 'steering',
}, {
    name: 'Radiator',
    icon: 'radiator',
}, {
    name: 'SparkPlugs',
    icon: 'sparkplug',
}, {
    name: 'StarterMotor',
    icon: 'starter',
}, {
    name: 'WindowMotor',
    icon: 'window',
}];

Data.xRefStage = [{
    key: 'intro',
    sec: '1',
    typ: 'platters',
}, {
    key: 'welcome',
    btn: 'Get started',
}, {
    key: 'choice',
    btn: 'Let’s go',
}, {
    key: 'help',
    btn: '[go]',
}, {
    sec: '2',
    typ: 'driving',
    btn: 'Start over',
}, {
    sec: '2a',
    beg: 'summer',
}, {
    key: 'start',
}, {
    key: 'sign1',
    prt: 'Alternator',
}, {
    sec: '2b',
    beg: 'fall',
}, {
    key: 'sign2',
    prt: 'BrakePads',
}, {
    key: 'sign3',
    prt: 'FuelPump',
}, {
    sec: '2c',
    beg: 'winter',
}, {
    key: 'sign4',
    prt: 'IgnitionSwitch',
}, {
    key: 'sign5',
    prt: 'PowerSteering',
}, {
    key: 'sign6',
    prt: 'Radiator',
}, {
    sec: '2d',
    beg: 'spring',
}, {
    key: 'sign7',
    prt: 'SparkPlugs',
}, {
    key: 'sign8',
    prt: 'StarterMotor',
}, {
    sec: '2e',
    beg: 'summer',
}, {
    key: 'sign9',
    prt: 'WindowMotor',
}, {
    key: 'sign10',
    act: 'stop and fade to outro',
}, {
    key: 'outro',
    sec: '3',
    typ: 'platters',
}, {
    key: 'finish',
    btn: ['Restart', 'Credits'],
}, {
    key: 'sources',
    btn: 'Back'
}];
