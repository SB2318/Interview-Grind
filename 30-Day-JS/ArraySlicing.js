// Link: https://leetcode.com/problems/chunk-array/


/**
 * @param {Array} arr
 * @param {number} size
 * @return {Array}
 */
 // Slice In Js
 // In JavaScript, the slice() method is a powerful, non-destructive tool used to extract a portion of an array or a string without modifying the original source. It creates a "shallow copy" of the selected section and returns it as a new object
// parameter: start (optional, default 0), end (optional, default array_len-1)

var chunk = function(arr, size) {
    let result = [];

    for(let i=0; i<arr.length; i+=size){
   
        result.push(arr.slice(i, i+size));
    }
    return result;
};
