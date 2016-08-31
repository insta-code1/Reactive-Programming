import $ from "jquery";
import Rx from "rxjs/Rx";

const $title = $("#title");
const $results = $("#results");

Rx.Observable.fromEvent($title, "keyup")
    .map(e => e.target.value)
    .distinctUntilChanged()
    .debounceTime(500)
    .switchMap(getItems)
    .subscribe(items => {
        $results.empty();
        $results.append(items.map(i => $(`<li />`).text(i)));
    });





// const keyups$ = Rx.Observable.fromEvent($title, "keyup");
// const queries$ = keyups$
//     .map(e => e.target.value)
//     .distinctUntilChanged()
//     .debounceTime(250)
//     .switchMap(query => getItems(query));

// queries$.subscribe(query => {
//     $results.empty();
//     $results.append(query.map(r => $(`<li />`).text(r)));
// });

//-----------------
// API
function getItems(title) {
    console.log(`Querying ${title}`);
    return new Promise((resolve, reject) => {
        window.setTimeout(() => {
            resolve([title, "Item 2", `Another ${Math.random() }`]);
        }, 500 + (Math.random() * 1000));
    });
}
// mocking up api, having the abilty to make 2 querys but may not return in sequential order.