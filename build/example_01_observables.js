"use strict";

var _Rx = require("rxjs/Rx");

var _Rx2 = _interopRequireDefault(_Rx);

var _util = require("./lib/util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const simple$ = new Rx.Observable(observer => {
//     console.log("Generating Observable");
//     setTimeout(() => {
//         observer.next("An item!");
//         setTimeout(() => {
//             observer.next("Another item");
//             observer.complete();
//         }, 1000);
//     }, 1000);
// });

// const error$ = new Rx.Observable(observer => {
//     Observable.error(new Error("STUFF"));
// })

// simple$.subscribe(
//     item => console.log(`one.next ${item}`),
//     error => console.log(`one.error ${error}`),
//     () => console.log("one.complete"));

// setTimeout(() => {
//     simple$.subscribe({
//         next: item => console.log(`two.next ${item}`),
//         error(error) {
//             console.log(`two.error ${error/stack}`)
//         },
//         complete: function() {
//             console.log("two complete");
//         }
//     });
// }, 3000);

// Part 2


function createIntervals$(time) {
    return new _Rx2.default.Observable(function (observer) {
        var index = 0;
        var interval = setInterval(function () {
            console.log("Generating " + index);
            observer.next(index++);
        }, time);

        return function () {
            clearInterval(interval);
        };
    });
}

function take$(sourceObservable$, amount) {
    return new _Rx2.default.Observable(function (observer) {
        var count = 0;
        var subscription = sourceObservable$.subscribe({
            next: function next(item) {
                observer.next(item);
                if (++count >= amount) observer.complete();
            },
            error: function error(_error) {
                observer.error(_error);
            },
            complete: function complete() {
                observer.complete();
            }
        });

        return function () {
            return subscription.unsubscribe();
        };
    });
}

var everySecond$ = createIntervals$(1000);
var firstFiveSeconds$ = take$(everySecond$, 5);
var subscription = firstFiveSeconds$.subscribe((0, _util.createSubscriber)("one"));

// setTimeout(() => {
//     subscription.unsubscribe();
// }, 3000);