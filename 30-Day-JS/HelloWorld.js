// Problem Link:
// https://leetcode.com/problems/create-hello-world-function/

// In Js you can return function

var createHelloWorld = function() {
    
    return function(...args) {
       return "Hello World";
    }
};
