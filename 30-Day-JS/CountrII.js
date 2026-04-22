// Problem Link: https://leetcode.com/studyplan/30-days-of-javascript/

// Inherit from previous counter concept

/**
 * @param {integer} init
 * @return { increment: Function, decrement: Function, reset: Function }
 */
var createCounter = function(init) {
    
    let initial = init;
    return {

        increment: ()=>{
            return ++init;
        },

        decrement: ()=>{
            return --init;
        },
       
       reset: ()=>{
          return init=initial;
       }
    }
};

/**
 * const counter = createCounter(5)
 * counter.increment(); // 6
 * counter.reset(); // 5
 * counter.decrement(); // 4
 */