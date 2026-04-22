// Problem Link: https://leetcode.com/problems/to-be-or-not-to-be
// In Js you can return an object of functions

/**
 * @param {string} val
 * @return {Object}
 */
var expect = function(val) {
    
     return {

        toBe: function(val1){

            if(val === val1) return true;
            else throw new Error("Not Equal");
        },

        notToBe: function(val1){
           if(val !== val1) return true;
            else throw new Error("Equal"); 
        }
     }
};

/**
 * expect(5).toBe(5); // true
 * expect(5).notToBe(5); // throws "Equal"
 */