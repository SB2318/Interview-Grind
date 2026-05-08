// Link: https://leetcode.com/problems/execute-asynchronous-functions-in-parallel/

/**
 * @param {Array<Function>} functions
 * @return {Promise<any>}
 */
 /**
 The goal is to take an array of asynchronous functions and to either 
 (A) return an array of all their resolved values in order, or 
 (B) reject on the first promise's rejection (not every time for every function)
  */
var promiseAll = function(functions) {
    

    return new Promise((resolve, reject)=>{
         let result = new Array(functions.length);
         let count =0;

         functions.forEach((fn, i)=>{
            fn()
            .then((data)=> {
                result[i] = data;
                count++;

                if(count== functions.length) resolve(result);
            })
            .catch((err)=> reject(err))
         });

        // resolve(result);
    })
    
};

/**
 * const promise = promiseAll([() => new Promise(res => res(42))])
 * promise.then(console.log); // [42]
 */
