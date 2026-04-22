// Problem Link: https://leetcode.com/problems/sleep/description/

// With this problem we can understand resolve better
// resolve (reject, pending as well) is a function given by JavaScript to finish the Promise successfully
// resolve(value) → marks Promise as fulfilled
// reject(error) → marks Promise as failed

/**
 * @param {Promise} promise1
 * @param {Promise} promise2
 * @return {Promise}
 */
var addTwoPromises = async function(promise1, promise2) {
    
    const [val1, val2] = await Promise.all([promise1, promise2]);

    return (val1+val2);
};

/**
 * addTwoPromises(Promise.resolve(2), Promise.resolve(2))
 *   .then(console.log); // 4
 */