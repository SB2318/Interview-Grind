// Link: https://leetcode.com/problems/flatten-deeply-nested-array/description/
/**
 * @param {Array} arr
 * @param {number} depth
 * @return {Array}
 */
var flat = function (arr, n) {
    
    const result = [];

    function dfs(a, depth){

        for(const item of a){
        if(Array.isArray(item) && depth < n){
            dfs(item, depth+1);
        }else{
            result.push(item);
        }
        }
    }

    dfs(arr, 0);
    return result;

};
