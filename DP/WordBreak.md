
```
class Solution {
    public boolean wordBreak(String s, List<String> wordDict) {
        int n = s.length();
        Boolean[] dp = new Boolean[301];
        
        Set<String> container = new HashSet<>();

        for(String word: wordDict){
            container.add(word);
        }

        return isPossible(s, 0, s.length(), container, dp);

    }

    private boolean isPossible(String s, int ind, int n, Set<String> container, Boolean[] dp){

        if(ind == n) return true;
        if(dp[ind] != null) return dp[ind];
        
        for(int i=ind+1; i<=n; i++){
            String temp = s.substring(ind, i);

            if(container.contains(temp) && isPossible(s, i,n, container, dp)){
                return dp[ind] = true;
            }
        }
        return dp[ind] = false;
    }
}
```
