// Problem Link: https://leetcode.com/problems/function-composition/description/

// The function compositions is something like that, you can also pass an array of functions in another function arguments

/**
 * @param {Function[]} functions
 * @return {Function}
 */
var compose = function(functions) {
    
    return function(x) {

       for(let i=functions.length-1; i>=0; i--){
          let fn = functions[i];
          x= fn(x);
       }
       return x;
    }
};

/**
 * const fn = compose([x => x + 1, x => 2 * x])
 * fn(4) // 9
 */
