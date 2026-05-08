// Link: https://leetcode.com/problems/debounce/?envType=study-plan-v2&envId=30-days-of-javascript

/**

A debounced function is a function whose execution is delayed by t milliseconds and whose execution is cancelled if it is called again within that window of time. 
The debounced function should also receive the passed parameters.

30ms -> call A
schedule A for 80ms

60ms -> call B (inside A's 50ms waiting window)
cancel A
schedule B for 110ms

100ms -> call C (inside B's waiting window)
cancel B
schedule C for 150ms
*/

/**
 * @param {Function} fn
 * @param {number} t milliseconds
 * @return {Function}
 */
var debounce = function(fn, t) {
    
    let timer;
    return function(...args) {
       clearTimeout(timer);
       timer = setTimeout(()=> fn(...args), t);
    }
};
