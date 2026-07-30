
# Recursion

```
class Solution {
    static int palPartition(String s) {
        // code here
        int n = s.length();
        int[] dp = new int[n+1];
        
        Arrays.fill(dp, -1);
        
        return f(0, n, s, dp)-1;
        
    }
    
    private static int f(int ind, int length, String s, int[] dp){
        
         if(ind >= length) return 0;
         
         if(dp[ind] != -1) return dp[ind];
         
         int minCost = Integer.MAX_VALUE;
         
         for(int j=ind; j<length; j++){
             
             if(isPalindrome(ind, j, s)){
                 int cost = 1 + f(j+1, length, s, dp);
                 minCost = Math.min(cost, minCost);
             }
         }
         
         return dp[ind] = minCost;
    }
    
    private static boolean isPalindrome(int i, int j, String s){
        
        while(i < j){
            
            if(s.charAt(i) != s.charAt(j)) return false;
            i++; j--;
        }
        
        return true;
    }
}
```

# DP

```
class Solution {
    static int palPartition(String s) {
        // code here
        int n = s.length();
        int[] dp = new int[n+1];
        
        dp[n] = 0;
        
        for(int i=n-1; i>=0; i--){
            
             int minCost = Integer.MAX_VALUE;
         
             for(int j=i; j<n; j++){
                 
                 if(isPalindrome(i, j, s)){
                     int cost = 1 + dp[j+1];
                     minCost = Math.min(cost, minCost);
                 }
             }
             dp[i] = minCost;
        }
        
        return dp[0]-1;
        
    }
    
    
    private static boolean isPalindrome(int i, int j, String s){
        
        while(i < j){
            
            if(s.charAt(i) != s.charAt(j)) return false;
            i++; j--;
        }
        
        return true;
    }
}
```
