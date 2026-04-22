// Problem Link: https://leetcode.com/problems/add-two-promises/

// A Promise in JavaScript is a way to handle asynchronous operations (things that don’t finish immediately) 
// in a cleaner, more predictable way.
// A Promise is an object that represents the future result of an async operation.

// A Promise has 3 states:
// Pending → still running
// Fulfilled → success (resolve)
// Rejected → failure (reject)

// We create a Promise when:
// We have an async task and you want to control when it finishes (success/failure)

/**
 * function createDBPromise() {
    let resolveFn;
    let rejectFn;

    const promise = new Promise((resolve, reject) => {
        resolveFn = resolve;
        rejectFn = reject;
    });

    return {
        promise,
        resolve: resolveFn,
        reject: rejectFn
    };
  }

  // Usage
  const dbCall = createDBPromise();

  dbCall.promise.then(data => {
    console.log("DB Result:", data);
  });

  .then() does not resolve a Promise
   it only registers what to do after it resolves
 */

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