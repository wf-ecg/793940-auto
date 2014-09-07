/*jslint es5:true, white:false */
/*globals Data */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
Data.text = {};

// COMPACT CARS:
Data.text.Headlines = [
    'Your vehicle maintenance journey',
    'Don’t panic at the mechanic',
    'The fix',
    'All the fixings',
    'Driver’s Ed',
    'Off the road again?',
    'Billboard Copy:',
];

Data.blurb = {
    Alternator: {
        subject: 'Alternator',
        heading: '<h2>Need an alternative <br>alternator?</h2>',
        template: '<p>On average, it’ll cost you '
        + '<span class="price">$</span> for parts and labor to replace your '
        + '<span class="model" title="">vehicle</span>’s alternator in the '
        + '<span class="region">region.</span></p>',
        signtype: 'caution',
        signfile: 'battery',
    },
    BrakeFront: {
        subject: 'Brake Pads',
        heading: '<h2 class="oneline">Need a brake?</h2>',
        template: '<p>On average, you’ll pay '
        + '<span class="price">$</span> for parts and labor to get your '
        + '<span class="model" title="">vehicle</span>’s front pads replaced in the '
        + '<span class="region">region.</span></p>',
        signtype: 'work',
        signfile: 'brake',
    },
    BrakeBoth: {
        subject: 'Brake Pads',
        heading: '<h2 class="oneline">Need a brake?</h2>',
        template: '<p>On average, you’ll pay '
        + '<span class="price">$</span> for parts and labor to get your '
        + '<span class="model" title="">vehicle</span>’s front pads replaced in the '
        + '<span class="region">region</span>, and '
        + '<span class="price">$</span> for the back.</p>',
        signtype: 'work',
        signfile: 'brake',
    },
    FuelPump: {
        subject: 'Fuel Pump',
        heading: '<h2>You’re not <br>fueling anybody</h2>',
        template: '<p>A new electric fuel pump for your '
        + '<span class="model" title="">vehicle</span> will cost '
        + '<span class="price">$</span> in parts and labor on average in the '
        + '<span class="region">region.</span></p>',
        signtype: 'caution',
        signfile: 'fuel',
    },
    IgnitionSwitch: {
        subject: 'Ignition Switch',
        heading: '<h2>Is your ignition in <br>working condition?</h2>',
        template: '<p>Replacing the ignition switch on your '
        + '<span class="model" title="">vehicle</span> in the '
        + '<span class="region">region</span> will cost you an average of '
        + '<span class="price">$</span> for parts and labor.</p>',
        signtype: 'notice',
        signfile: 'ignition',
    },
    PowerSteering: {
        subject: 'Power Steering Pump',
        heading: '<h2>Can you steer <br>me now?</h2>',
        template: '<p>In the '
        + '<span class="region">region</span>, you’ll pay an average of '
        + '<span class="price">$</span> in parts and labor to replace your '
        + '<span class="model" title="">vehicle</span>’s power steering pump.</p>',
        signtype: 'work',
        signfile: 'steering',
    },
    Radiator: {
        subject: 'Radiator',
        heading: '<h2>See you later, <br>radiator?</h2>',
        template: '<p>Replacing the radiator in your '
        + '<span class="model" title="">vehicle</span> will cost an average of '
        + '<span class="price">$</span> for parts and labor in the '
        + '<span class="region">region.</span></p>',
        signtype: 'work',
        signfile: 'radiator',
    },
    SparkPlugs: {
        subject: 'Spark Plugs',
        heading: '<h2>Not feeling that <br>“spark” anymore?</h2>',
        template: '<p>The average cost in parts and labor to replace your '
        + '<span class="model" title="">vehicle</span>’s spark plugs in the '
        + '<span class="region">region</span> is '
        + '<span class="price">$</span>.</p>',
        signtype: 'caution',
        signfile: 'sparkplug',
    },
    StarterMotor: {
        subject: 'Starter Motor',
        heading: '<h2>Is your starter <br>finished?</h2>',
        template: '<p>The average cost in parts and labor to replace your '
        + '<span class="model" title="">vehicle</span>’s starter in the '
        + '<span class="region">region</span> is '
        + '<span class="price">$</span>.</p>',
        signtype: 'stop',
        signfile: 'starter',
    },
    WindowMotor: {
        subject: 'Window Regulator Motor (front driver’s side)',
        heading: '<h2>Money out <br>the window</h2>',
        template: '<p>In the '
        + '<span class="region">region</span>, you’ll pay an average of '
        + '<span class="price">$</span> in parts and labor to replace the front driver’s side regulator motor of your '
        + '<span class="model" title="">vehicle</span>’s power windows.</p>',
        signtype: 'stop',
        signfile: 'window',
    },
};

Data.stats = {
    compact: {
        Alternator: {
            prices: [414.08, 417.38, 412.98],
            titled: 'compact car',
        },
        BrakePads: {
            prices: [175.28, 179.19, 174.29],
            titled: 'compact car',
        },
        FuelPump: {
            prices: [721.56, 726.06, 720.06],
            titled: 'compact car',
        },
        IgnitionSwitch: {
            prices: [137.24, 139.54, 136.47],
            titled: 'compact car',
        },
        PowerSteering: {
            prices: [332.85, 339.15, 330.75],
            titled: 'compact vehicle',
        },
        Radiator: {
            prices: [381.65, 385.55, 380.01],
            titled: 'compact car',
        },
        SparkPlugs: {
            prices: [97.20, 99.50, 96.44],
            titled: 'compact car',
        },
        StarterMotor: {
            prices: [407.55, 410.35, 406.62],
            titled: 'compact car',
        },
        WindowMotor: {
            prices: [230.29, 232.89, 229.42],
            titled: 'compact car',
        },
    },
    midsize: {
        Alternator: {
            prices: [464.88, 467.28, 464.08],
            titled: 'car',
        },
        BrakePads: {
            prices: [[119.25, 126.10], [121.75, 128.60], [118.42, 125.27]],
            titled: 'car',
        },
        FuelPump: {
            prices: ['NA', 'NA', 'NA'],
        },
        IgnitionSwitch: {
            prices: [132.65, 134.05, 132.18],
            titled: 'car',
        },
        PowerSteering: {
            prices: [268.13, 272.23, 266.77],
            titled: 'vehicle',
        },
        Radiator: {
            prices: [381.33, 388.53, 378.93],
            titled: 'car',
        },
        SparkPlugs: {
            prices: [100.94, 102.84, 100.30],
            titled: 'car',
        },
        StarterMotor: {
            prices: [484.14, 487.34, 483.07],
            titled: 'car',
        },
        WindowMotor: {
            prices: [367.07, 369.77, 366.17],
            titled: 'car',
        },
    },
    minivan: {
        Alternator: {
            prices: [486.62, 489.62, 485.62],
            titled: 'minivan',
        },
        BrakePads: {
            prices: [[119.66, 132.71], [123.19, 135.01], [120.26, 131.94]],
            titled: 'minivan',
        },
        FuelPump: {
            prices: ['NA', 'NA', 'NA'],
        },
        IgnitionSwitch: {
            prices: ['NA', 'NA', 'NA'],
        },
        PowerSteering: {
            prices: [266.72, 273.47, 264.47],
            titled: 'minivan',
        },
        Radiator: {
            prices: [356.76, 363.66, 354.46],
            titled: 'minivan',
        },
        SparkPlugs: {
            prices: [204.19, 210.13, 202.26],
            titled: 'minivan',
        },
        StarterMotor: {
            prices: [314.74, 317.74, 313.74],
            titled: 'minivan',
        },
        WindowMotor: {
            prices: [304.76, 308.26, 303.59],
            titled: 'minivan',
        },
    },
    utility: {
        Alternator: {
            prices: [569.57, 573.17, 568.37],
            titled: 'SUV',
        },
        BrakePads: {
            prices: [[117.89, 113.33], [120.39, 115.88], [117.06, 112.48]],
            titled: 'SUV',
        },
        FuelPump: {
            prices: [494.45, 500.46, 492.46],
            titled: 'SUV or crossover',
        },
        IgnitionSwitch: {
            prices: [149.00, 150.80, 148.40],
            titled: 'SUV or crossover',
        },
        PowerSteering: {
            prices: ['NA', 'NA', 'NA'],
        },
        Radiator: {
            prices: [322.42, 328.12, 320.52],
            titled: 'SUV or crossover',
        },
        SparkPlugs: {
            prices: [78.25, 80.05, 77.65],
            titled: 'SUV',
        },
        StarterMotor: {
            prices: [368.15, 370.65, 367.32],
            titled: 'SUV',
        },
        WindowMotor: {
            prices: [213.54, 215.74, 212.81],
            titled: 'SUV',
        },
    },
};
