# Recursion (TLE)
```
class Solution {
    static boolean isSubsetSum(int arr[], int sum) {
        // code here
        int[][] dp = new int[arr.length][sum+1];
        
        for(int[] a: dp) Arrays.fill(a, -1);
    
        return solve(arr, arr.length-1, sum, dp);
        
    }
    
    private static boolean solve(int[] arr, int ind, int target, int[][] dp){
        
        if(target == 0) return true;
        
        if(ind == 0)  return arr[0] == target;
        if(dp[ind][target] != -1) return dp[ind][target] == 1;
        
        boolean skip = solve(arr, ind-1, target, dp);
        
        boolean take = false;
        
        if(arr[ind] <= target){
            take = solve(arr, ind-1, target-arr[ind], dp);
        }
        
        if(take || skip) dp[ind][target] = 1;
        else dp[ind][target] = 0;
        
        return  take || skip;
    }
}

```

## DP

```
class Solution {
    static boolean isSubsetSum(int arr[], int sum) {
        // code here
        boolean[][] dp = new boolean[arr.length][sum+1];
        // base case
        for(int i=0; i<arr.length; i++){
           dp[i][0] = true;
        }
        
        // We cannot form a sum larger than the target using only the first element.
        if(arr[0] <= sum) dp[0][arr[0]] = true;
        
        for(int i=1; i<arr.length; i++){
            
            for(int j = 1; j<= sum; j++){
                
                boolean skip = dp[i-1][j];
        
                boolean take = false;
                
                if(arr[i] <= j){
                    take = dp[i-1][j-arr[i]];
                }
                
                dp[i][j] = skip || take;
            }
        }
     
    
        return dp[arr.length-1][sum];
        
    }
    
    private static boolean solve(int[] arr, int ind, int target, int[][] dp){
        
        if(target == 0) return true;
        
        if(ind == 0)  return arr[0] == target;
        if(dp[ind][target] != -1) return dp[ind][target] == 1;
        
        boolean skip = solve(arr, ind-1, target, dp);
        
        boolean take = false;
        
        if(arr[ind] <= target){
            take = solve(arr, ind-1, target-arr[ind], dp);
        }
        
        if(take || skip) dp[ind][target] = 1;
        else dp[ind][target] = 0;
        
        return  take || skip;
    }
}
```
