
```
dp[i] =maximum sum of an increasing subsequence ending at index i
```


```
class Solution {
    public int maxSumIS(int arr[]) {
        // code here
        int n = arr.length;
        int[] dp = new int[n];
        
        int ans = 0;
        
        for(int i=0; i< n; i++){
            
            dp[i] = arr[i];
            
            for(int j=0; j<i; j++){
                
                if(arr[j] < arr[i]){
                    dp[i] = Math.max(arr[i]+dp[j], dp[i]);
                }
            }
            
            ans = Math.max(ans, dp[i]);
        }
        
        return ans;
    }
}

```
