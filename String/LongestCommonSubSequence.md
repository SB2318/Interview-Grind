## Recursion

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

## DP

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
