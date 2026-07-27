Maintain a sliding window containing only distinct elements.
Expand the right pointer while all elements remain unique.
Compute the current window length len = j - i.
Add len × (len + 1) / 2 to the answer. (gives the number of all possible contiguous subarrays inside a window of length len.)
Remove the leftmost element and continue for the next starting index.

<img width="847" height="636" alt="image" src="https://github.com/user-attachments/assets/7a53f96d-75c7-4162-83ae-878ccf8373fc" />

```
class Solution {
    public int sumOfLengths(int arr[]) {
        // code here
        Set<Integer> set = new HashSet<>();
        
        int left = 0, right = 0;
        long ans = 0;
        long mod = 1_00_00_00_00_7;
        
        while(right < arr.length){
            
            while(left< arr.length && set.contains(arr[right])){
                set.remove(arr[left]);
                left++;
            }
            
            long len = right -left +1;
            long a = len;
            long b = len+1;
            
            if(a%2 == 0) a= a/2; 
            else b = b/2;

            // a and b are consecutive element, it is sure, if one is odd other even
            
            long r = (a%mod)*(b%mod);
            
            ans = (ans+r)%mod;
            
            set.add(arr[right]);
            right++;
        }
        
        return (int) ans;
    }
}


```
