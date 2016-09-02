import Rx from "rxjs/Rx";
import { createSubscriber } from "./lib/util";


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
    return new Rx.Observable(observer => {
        let index = 0; 
        let interval = setInterval(() => {
            console.log(`Generating ${index}`);
            observer.next(index++);
        }, time);
        
        return () => {
            clearInterval(interval);
        };
    });
}

function take$(sourceObservable$, amount) {
    return new Rx.Observable(observer => {
        let count = 0;
        const subscription = sourceObservable$.subscribe({
            next(item) {
                observer.next(item);
                if (++count >= amount)
                observer.complete();
            },
            error(error) { observer.error(error); },
            complete() { observer.complete(); }
        });

        return () => subscription.unsubscribe();
    });
}

const everySecond$ = createIntervals$(1000);
const firstFiveSeconds$ = take$(everySecond$, 5);
const subscription = firstFiveSeconds$.subscribe(createSubscriber("one"));


// setTimeout(() => {
//     subscription.unsubscribe();
// }, 3000);