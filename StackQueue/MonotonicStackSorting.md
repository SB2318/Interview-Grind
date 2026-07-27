
## Monotonic Stack
A monotonic stack is a specialized stack data structure that keeps its elements in a strict sorted order—either continuously increasing or decreasing.
It solves "next greater" or "previous smaller" element problems in linear time (O(n)).

Take a monotonic stack in decreasing order.

## Next Greater Element

```
class Solution {
    public ArrayList<Integer> nextLargerElement(int[] arr) {
        // code here
        ArrayList<Integer> ans = new ArrayList<>();
        Stack<Integer> stack = new Stack<>();
       // int[] temp = new int[arr.length];
       
       for(int num: arr) ans.add(-1);
        
        stack.add(arr[arr.length-1]);
        
        for(int i=arr.length-2; i>=0; i--){
            
            while(!stack.isEmpty() && arr[i] >= stack.peek()) stack.pop();
            
            if(stack.isEmpty()){
               // arr[i] = -1;
               ans.set(i, -1);
            }else{
               // arr[i] = stack.peek();
               ans.set(i, stack.peek());
            }
            
            stack.add(arr[i]);
        }
       
       return ans; 
    }
}
```

## Next Greater Element I

```
class Solution {
    public int[] nextGreaterElement(int[] nums1, int[] nums2) {
        Stack<Integer> stack = new Stack<>();
        HashMap<Integer, Integer> map = new HashMap<>();

        // Find NGE for nums2 array
        map.put(nums2[nums2.length-1], -1);
        stack.add(nums2[nums2.length-1]);

        for(int i=nums2.length-2; i>=0; i--){

            while(!stack.isEmpty() && nums2[i] >= stack.peek()) stack.pop();

            if(stack.isEmpty()){
                map.put(nums2[i], -1);
            }else{
                map.put(nums2[i], stack.peek());
            }

            stack.add(nums2[i]);
        }

        // add it to nums1 

        for(int i=0; i<nums1.length; i++)
          nums1[i] = map.getOrDefault(nums1[i], -1);

       return nums1;
    }
}
```

## Next Smaller Element

```
class Solution {
    static ArrayList<Integer> nextSmallerEle(int[] arr) {
        // code here
        ArrayList<Integer> ans = new ArrayList<>();
        Stack<Integer> stack = new Stack<>();
        
        for(int num : arr) ans.add(-1);
        
        stack.add(arr[arr.length-1]);
        
        for(int i=arr.length-2; i>=0; i--){
            
            while(!stack.isEmpty() && arr[i] <= stack.peek())
              stack.pop();
              
            if(stack.isEmpty()){
                ans.set(i, -1);
            }else{
                ans.set(i, stack.peek());
            }
            
            stack.add(arr[i]);
        }
        
        return
    }
}
```

## Previous Greater Element

```
class Solution {
    public ArrayList<Integer> preGreaterEle(int[] arr) {
        // code here
        ArrayList<Integer> ans = new ArrayList<>();
        
        Stack<Integer> stack = new Stack<>();
        
        for(int num: arr) ans.add(-1);
        
        stack.add(arr[0]);
        
        for(int i=1; i<arr.length; i++){
            
            while(!stack.isEmpty() && arr[i] >= stack.peek()) stack.pop();
            
            if(!stack.isEmpty()) ans.set(i, stack.peek());
            
            stack.add(arr[i]);
        }
        
        return ans;
    }
}
```

## Previous Smaller Element

```
class Solution {
    public static ArrayList<Integer> prevSmaller(int[] arr) {
        // code here
        ArrayList<Integer> ans = new ArrayList<>();
        Stack<Integer> stack = new Stack<>();
        
        for(int num: arr) ans.add(-1);
        
        stack.add(arr[0]);
        
        for(int i=1; i<arr.length; i++){
            
            while(!stack.isEmpty() && arr[i] <= stack.peek()) stack.pop();
            
            if(!stack.isEmpty()) ans.set(i, stack.peek());
            
            stack.add(arr[i]);
        }
        
        return ans;
    }
}
```

## Sort a Stack

- If the stack is empty, stop.
- Remove the top element of the stack.
- Sort the remaining stack recursively.
- Insert the removed element back into the stack while maintaining descending order.
- Use a helper function to place the element in its correct position.

```
class Solution {
    public void sortStack(Stack<Integer> st) {
        // code here
        if(st.isEmpty()) return;
        
        int top = st.pop();
        sortStack(st);
        insert(st, top);
    }
    
    private void insert(Stack<Integer> st, int top){
        
        if(st.isEmpty() || st.peek() <= top){
            st.add(top);
            return;
        }
        
        int temp = st.pop();
        insert(st, top);
        st.add(temp);
    }
}
```
