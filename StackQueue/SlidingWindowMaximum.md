<img width="812" height="518" alt="image" src="https://github.com/user-attachments/assets/87f5de94-00ea-4af8-9a44-6c50406a7726" />

## Algorithm

- Remove expired indexes from first
- Remove smaller elements from back
- Insert the current element into front
- Once window size becomes k, poll the front, as front will always maximum (you have to implement this in this way).
- The deque always maintains indices of elements in decreasing order of their values.
- i = k - 1 onward, every iteration corresponds to exactly one complete window, and we record one maximum.

 If the first complete window is formed
      (i >= k - 1)

      Store nums[dq.front] as the answer.


## Dequeue In Java

In Java, a Deque (pronounced "deck") stands for Double-Ended Queue and is an interface that allows you to insert, remove, and inspect elements from both the front and the back. 
Depending on how it is used, it can function as a standard FIFO Queue (First-In-First-Out) or a LIFO Stack (Last-In-First-Out).

### Common Implementations:
Because Deque is an interface, you must instantiate one of its implementing classes:

**ArrayDeque:** A resizable-array implementation. It is generally faster and more memory-efficient than a LinkedList for adding/removing elements from both ends, but it does not allow null values.
**LinkedList:** A doubly-linked list implementation. 

It allows null elements and is more flexible if you also need standard list operations.

```
class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        int[] ans = new int[n-k+1];

        Deque<Integer> dq = new ArrayDeque<>();
        int idx = 0;

        for(int i=0; i<n; i++){

            // Remove all expired indices
            while(!dq.isEmpty() && dq.peekFirst() <= i-k)
                dq.pollFirst();
            
            // Remove all smaller elements
            while(!dq.isEmpty() && nums[i] >= nums[dq.peekLast()])
              dq.pollLast();

            // insert current index
            dq.offerLast(i);

            // Check for window formation, and front always is maximum
            if(i >= k-1){
                ans[idx++] = nums[dq.peekFirst()];
            }
        }

        return ans;
    }
}
```

