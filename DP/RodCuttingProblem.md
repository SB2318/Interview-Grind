
## Recursion

```
class Solution {
    public int cutRod(int[] price) {
        // code here
        int n = price.length;
        int[][] dp = new int[n+1][n+1];
        
        for(int[] a: dp) Arrays.fill(a, -1);
        
        return solve(n-1, price, price.length, dp);
    }
    
    private int solve(int ind, int[] price, int length, int[][] dp){
        
        if(ind == 0){
            return length*price[0];
        }
        if(dp[ind][length] != -1) return dp[ind][length];
        
        int rodLength = ind+1;
        
        int skip = solve(ind-1, price, length, dp);
        
        int take = Integer.MIN_VALUE;
        
        if(rodLength <= length){
            take = price[ind] + solve(ind, price, length-rodLength, dp);
        }
        
        return dp[ind][length] = Math.max(take, skip);
    }
}
```

## DP

```
class Solution {
    public int cutRod(int[] price) {
        // code here
        int n = price.length;
        int[][] dp = new int[n+1][n+1];
        
        for(int i=0; i<=n; i++) dp[0][i] = i*price[0];
        
        for(int i=1; i<price.length; i++){
            
            for(int j=0; j<=n; j++){
                
                int rodLength = i+1;
        
                int skip = dp[i-1][j];
                
                int take = Integer.MIN_VALUE;
                
                if(rodLength <= j){
                    take = price[i] + dp[i][j -rodLength];
                }
                
                dp[i][j] = Math.max(take, skip);
            }
        }
        return dp[n-1][n];
    }
    
    private int solve(int ind, int[] price, int length, int[][] dp){
        
        if(ind == 0){
            return length*price[0];
        }
        if(dp[ind][length] != -1) return dp[ind][length];
        
        int rodLength = ind+1;
        
        int skip = solve(ind-1, price, length, dp);
        
        int take = Integer.MIN_VALUE;
        
        if(rodLength <= length){
            take = price[ind] + solve(ind, price, length-rodLength, dp);
        }
        
        return dp[ind][length] = Math.max(take, skip);
    }
}
```
