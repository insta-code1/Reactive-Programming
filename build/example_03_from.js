"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

var _fs = require("fs");

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// fs.readdir("./src-server", (err, items) => {
//     if (err) console.error(err);
//     else {
//         console.log(items);
//     }
// });

// const readdir$ = Rx.Observable.bindNodeCallback(fs.readdir);
// // console.log(typeof(readdir$));

// readdir$("./src-server")
//     .mergeMap(files => Rx.Observable.from(files))
//     .map(file => `MANIPULATER ${file}`)
//     .subscribe(createSubscriber("readdir"));

function getTime() {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            resolve("Hello");
        }, 1000);
    });
}

_Rx2.default.Observable.fromPromise(getTime()).subscribe((0, _util.createSubscriber)("promise"));