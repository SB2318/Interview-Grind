// Problem Link: https://leetcode.com/problems/allow-one-function-call/

/**
 * @param {Function} fn
 * @return {Function}
 */

/** 
 * Imagine a payment button:
 * const makePaymentOnce = once(makePaymentAPI);
*/
var once = function(fn) {
     let isCalled = false;
    return function(...args){
         
        if(isCalled) return undefined;

        isCalled = true;
        return fn(...args);
    }
};

/**
 * let fn = (a,b,c) => (a + b + c)
 * let onceFn = once(fn)
 *
 * onceFn(1,2,3); // 6
 * onceFn(2,3,6); // returns undefined without calling fn
 */
