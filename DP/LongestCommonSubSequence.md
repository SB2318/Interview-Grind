
> It can be consecutive, It cannot be consecutive. as long as its maintains the order,in the string.

In order to print all the subsequence we can use powerset for dp, or we can use Recursion.

1. Express everything in terms of indices
2. Explore Possibility on that index.
3. Take the best among them.

<img width="791" height="360" alt="image" src="https://github.com/user-attachments/assets/ed7604ea-a655-4bff-bb7c-a44b460a25bb" />

## Tabulation

1. Copy the base case
2. Write down the changing parameter in opposite direction
3. Copy the recurrence

We can't write base case here without shifting, because here base case is stop at negative index.


## Recursive Solution

```
class Solution {
    static int lcs(String s1, String s2) {
        // code here
        int n = s1.length(), m = s2.length();
        
        int[][] dp = new int[n+1][m+1];
        
        
        for(int[] d : dp) Arrays.fill(d, -1);
        
        return f(n, m, s1, s2, dp);
    }
    
    private static int f (int i, int j, String s1, String s2, int[][] dp){
        
        if(i == 0 || j == 0) return 0;
        if(dp[i][j] != -1) return dp[i][j];
        
        if(s1.charAt(i-1) == s2.charAt(j-1)) return dp[i][j] = 1 + f(i-1, j-1, s1, s2, dp);
        
        else return dp[i][j] = Math.max(
              f(i, j-1, s1, s2, dp), f(i-1, j, s1, s2, dp)
            );
    }
}
```

## Top Down Approach (DP Solution)

```
class Solution {
    static int lcs(String s1, String s2) {
        // code here
        int n = s1.length(), m = s2.length();
        
        int[][] dp = new int[n+1][m+1];
        
        // Base Case
        for(int i=0; i<=m; i++) dp[0][i] = 0;
        for(int i=0; i<=n; i++) dp[i][0] = 0;
        
        for(int i=1; i<=n; i++){
            
            for(int j=1; j<=m; j++){
                
                if(s1.charAt(i-1) == s2.charAt(j-1)){
                    dp[i][j] =  1+ dp[i-1][j-1];
                }else{
                    
                    dp[i][j] = Math.max(dp[i][j-1], dp[i-1][j]);
                }
            }
        }
        
        
        return dp[n][m];
    }

}
```
