/*jslint es5:true, white:false */
/*globals Data */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - */
Data.sky = [{},{
    id: 'Bkgr-1',
    role: 'sky',
    css: {
        backgroundPosition: '5px 5px',
        //border: '1px dotted yellow', // TEST COLOR
        minHeight: '400px',
        opacity: 0.2,
        top: 0,
        zIndex: 1,
    },
    ratio: [-33, 11],
},{
    id: 'Bkgr-2',
    role: 'sky',
    css: {
        backgroundPosition: '55px 25px',
        //border: '1px dotted green', // TEST COLOR
        minHeight: '400px',
        opacity: 0.2,
        top: 50,
        zIndex: 1,
    },
    ratio: [33, 11],
},{
    id: 'Bkgr-3',
    role: 'sky clouds blowSlow',
    css: {
        backgroundPosition: '555px 5px',
        //border: '1px dotted red', // TEST COLOR
        opacity: 0.5,
        top: 50,
        zIndex: 1,
    },
    //    ratio: [10, 11], controlled in transition
},{
    id: 'Bkgr-4',
    role: 'sky clouds blowFast',
    css: {
        backgroundPosition: '5555px 5px',
        //border: '1px dotted blue', // TEST COLOR
        opacity: 0.4,
        top: 120,
        zIndex: 2,
    },
    //    ratio: [7, 11], controlled in transition
}];
