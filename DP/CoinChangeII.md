

## Recursion

```
class Solution {
    public int change(int amount, int[] coins) {
        int[][] dp = new int[coins.length][amount+1];

        for(int[] a: dp){
            Arrays.fill(a, -1);
        }

        return solve(coins.length-1, amount, coins, dp);
    }

    private int solve(int ind, int amount, int[] coins, int[][] dp){

        if(ind == 0){

            if(amount % coins[ind] == 0) return 1;
            return 0;
        }
        if(dp[ind][amount] != -1) return dp[ind][amount];

        int skip = solve(ind-1, amount, coins, dp);
        int take = 0;
        if(coins[ind] <= amount){
            take =  solve(ind, amount-coins[ind], coins, dp);
        } 
        return dp[ind][amount] = take + skip;
    }
}
```

## DP

```
class Solution {
    public int change(int amount, int[] coins) {
        int[][] dp = new int[coins.length][amount+1];

        for(int a =0; a<=amount; a++)
          dp[0][a] = a%coins[0] == 0 ? 1 : 0;

        for(int ind=1; ind<coins.length; ind++){

            for(int a=0; a<=amount; a++){
                int skip = dp[ind-1][a];
                int take = 0;
                if(coins[ind] <= a){
                    // infinite supply
                    take =  dp[ind][a-coins[ind]];
                } 

                dp[ind][a] = take+ skip;
            }
        }
        return dp[coins.length-1][amount];
    }

    private int solve(int ind, int amount, int[] coins, int[][] dp){

        if(ind == 0){

            if(amount % coins[ind] == 0) return 1;
            return 0;
        }
        if(dp[ind][amount] != -1) return dp[ind][amount];

        int skip = solve(ind-1, amount, coins, dp);
        int take = 0;
        if(coins[ind] <= amount){
            take =  solve(ind, amount-coins[ind], coins, dp);
        } 
        return dp[ind][amount] = take + skip;
    }
}
```
