## Intution

> PSE (Previous Smaller Element) and NSE (Next Smaller Element) tell us the maximum range in which an element can remain the minimum.

## Why exactly "previous smaller" and "next smaller"?

Imagine you're standing on an element.

You keep expanding left.

```
← ← ←
```

As long as every element is greater, your element is still the minimum.

The first smaller element stops you.

Similarly, expand right.

```
→ → →

```

Again, the first smaller element stops you.

Next, we are checking in `ans` array it is already computed or not.

```
class Solution {
    public ArrayList<Integer> maxOfMins(int[] arr) {
        // code here
        ArrayList<Integer> ans = new ArrayList<>();
        
        for(int i: arr) ans.add(0);
        
        int[] prev = findPrevSmaller(arr);
        int[] next = findNextSmaller(arr);
        
        for(int i=0; i<arr.length; i++){
            
            int pi = prev[i];
            int ni = next[i];
            
            int len = ni-pi-1;
            int res = Math.max(ans.get(len-1), arr[i]);
            ans.set(len-1, res);
        }
        
        for (int i = arr.length - 2; i >= 0; i--) {
         ans.set(i, Math.max(ans.get(i), ans.get(i + 1)));
        }
        
        return ans;
    }
    
    private int[] findPrevSmaller(int[] arr){
        Stack<Integer> stack = new Stack<>();
        int[] prev = new int[arr.length];
        
        for(int i=0; i<arr.length; i++){
            
            while(!stack.isEmpty() && arr[stack.peek()] >= arr[i]) stack.pop();
            
            if(stack.isEmpty()) prev[i] = -1;
            else prev[i] = stack.peek();
            
            stack.push(i);
            
        }
        
        return prev;
    }
    
    private int[] findNextSmaller(int[] arr){
        Stack<Integer> stack = new Stack<>();
        int[] next = new int[arr.length];
        
        for(int i=arr.length-1; i>=0; i--){
            
            while(!stack.isEmpty() && arr[stack.peek()] >= arr[i]) stack.pop();
            
            if(stack.isEmpty()) next[i] = arr.length;
            else next[i] = stack.peek();
            stack.push(i);
        }
        
        return next;
    }
}
```


Those two smaller elements are exactly the boundaries of the largest interval where your element remains the smallest.
