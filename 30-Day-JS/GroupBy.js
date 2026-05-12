// Link: https://leetcode.com/problems/group-by/

/**
 * @param {Function} fn
 * @return {Object}
 */
// reduce() is used when you want to convert an array into one final value.
// That final result can be:
// number → sum
// object → grouping
// array → transformed array
// string → concatenated string
// Parameters of reduce
// accumulator -> This stores the running result.
// currentValue -> Current array item.
// initialValue -> Starting value of accumulator.
// index -> index position of array element

Array.prototype.groupBy = function(fn) {
    //const result ={};

    return  this.reduce((grouped, item)=>{
        let key = fn(item);

        if(!grouped[key]){
            grouped[key] = [];
        }

        grouped[key].push(item);

        return grouped;
    }, {});

    //return result;
};



/**
 * [1,2,3].groupBy(String) // {"1":[1],"2":[2],"3":[3]}
 */
