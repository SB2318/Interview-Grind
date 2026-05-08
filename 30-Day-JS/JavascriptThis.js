// Link: https://leetcode.com/problems/array-prototype-last/

/**
 * @return {null|boolean|number|string|Array|Object}
 */

/**

This is primarily a function-level keyword in JavaScript. It can be used inside regular functions, object methods, constructor functions, and class methods. Its value depends on how the function is invoked. In classes, it usually refers to the current instance; in object methods, the calling object; and in standalone functions, global object or undefined in strict mode.

It can be used inside:

Regular functions
Object methods
Constructor functions
Class methods

Its value depends on how the function is invoked.
Invocation	this value
func()	window / undefined
obj.func()	calling object
new Func()	new object
class method	current instance
arrow function	inherited from outer scope

*/

Array.prototype.last = function() {
    
    if(this.length === 0) return -1;

    return this[this.length-1];
};

/**
 * const arr = [1, 2, 3];
 * arr.last(); // 3
 */
