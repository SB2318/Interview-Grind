// Problem Link: https://leetcode.com/problems/counter/description/

// Concept of closures:

// You can declare functions within other functions and return them. 
// The inner function has access to any variables declared above it.

// In JavaScript:

// Functions are first-class citizens
// That means they can:
// Be assigned to variables
// Be passed as arguments
// Have properties and methods (just like objects)

var createCounter = function(n) {
    
    return function() {
        return n++;
    };
};

/** 
 * const counter = createCounter(10)
 * counter() // 10
 * counter() // 11
 * counter() // 12
 * 
 * counter is a function object
   It also carries hidden state (n = 10)
 */