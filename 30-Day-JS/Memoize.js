
/**
 * @param {Function} fn
 * @return {Function}
 */

/**
 * 
 * Use fn(...args) → if this doesn’t matter
   Use fn.apply(this, args) → if you want safe, reusable utility
   this → preserves the calling context -> useful in case of memoization
   this → preserves the calling context
   args → passed as an array
 */

function memoize(fn) {
    
    const cache = {};
    return function(...args) {
        const key = JSON.stringify(args);

        if(key in cache){
            return cache[key];
        }

        const result = fn.apply(this,args);

        cache[key] = result;

        return result;
    }
}


/** 
 * let callCount = 0;
 * const memoizedFn = memoize(function (a, b) {
 *	 callCount += 1;
 *   return a + b;
 * })
 * memoizedFn(2, 3) // 5
 * memoizedFn(2, 3) // 5
 * console.log(callCount) // 1 
 */