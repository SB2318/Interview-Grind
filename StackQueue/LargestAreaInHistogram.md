

## Way 1

```
class Solution {
    public int largestRectangleArea(int[] heights) {
        
        int[] nse = findNse(heights);
        int[] pse = findPse(heights);

        int maxArea = 0;

        for(int i=0; i<heights.length; i++){
            maxArea = Math.max(maxArea, heights[i]*(nse[i] - pse[i]-1));
        }
        return maxArea;
    }

    private int[] findNse(int[] heights){
        int[] nse = new int[heights.length];
        Stack<Integer> stack = new Stack<>();

        for(int i=heights.length-1; i>=0; i--){
            
            while(!stack.isEmpty() && heights[i] <= heights[stack.peek()]) stack.pop();

            nse[i] = stack.isEmpty() ? heights.length : stack.peek();

            stack.add(i);
        }

        return nse;
    }

    private int[] findPse(int[] heights){
        int[] pse = new int[heights.length];
        Stack<Integer> stack = new Stack<>();

        for(int i=0; i<heights.length; i++){
            
            while(!stack.isEmpty() && heights[i] <= heights[stack.peek()]) stack.pop();

            pse[i] = stack.isEmpty() ? -1 : stack.peek();

            stack.add(i);
        }

        return pse;
    }
}
```

## Way 2

```
class Solution {
    public int largestRectangleArea(int[] heights) {
        int nse = heights.length, pse = -1, maxArea = 0, maxIndex = 0;
        Stack<Integer> stack = new Stack<>();

        for(int i=0; i<heights.length; i++){

            while(!stack.isEmpty() && heights[i] <= heights[stack.peek()]){
                maxIndex = stack.pop();
            
            nse = i; // we are going to add ith element to stack
            pse = stack.isEmpty() ? -1 : stack.peek();
            maxArea = Math.max(maxArea, heights[maxIndex]*(nse-pse-1));
            }
            stack.add(i);
        }

        while(!stack.isEmpty()){
            maxIndex = stack.pop();
            nse = heights.length; // they are left element, they have no next greater element
            pse = stack.isEmpty()? -1 : stack.peek();
            maxArea = Math.max(maxArea, heights[maxIndex]*(nse-pse-1));
        }

        return maxArea;
    }
}
```
