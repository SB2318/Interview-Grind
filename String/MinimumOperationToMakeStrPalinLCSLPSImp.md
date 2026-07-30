
```
class Solution {
    public int minInsertions(String s) {
        
        int n = s.length();
        return n - lPS(s);
    }

    private int lPS(String s) {
        // code here
        StringBuilder sb = new StringBuilder(s);
        int n = s.length();
        int[][] dp = new int[n+1][n+1];
        
        for(int[] a: dp) Arrays.fill(a, -1);
        
        return lcs(n, n, s, sb.reverse().toString(), dp);
    }
    
     private static int lcs(int i, int j, String s1, String s2, int[][] dp){
        
        if(i == 0 || j == 0) return 0;
        if(dp[i][j] != -1) return dp[i][j];
        
        if(s1.charAt(i-1) == s2.charAt(j-1)) return dp[i][j] = 1 + lcs(i-1, j-1, s1, s2, dp);
        
        else return dp[i][j] = Math.max(
              lcs(i, j-1, s1, s2, dp), lcs(i-1, j, s1, s2, dp)
            );
    }

}

```
