# Merge K Sorted Arrays (Min Heap) – Complete Notes

## Problem

You are given **K sorted arrays**. Merge them into a single sorted array.

### Example

```text
Input:
[
  [1,4,7],
  [2,5,8],
  [3,6,9]
]

Output:
[1,2,3,4,5,6,7,8,9]
```

---

# Brute Force Approach

### Idea

* Put **all elements** from every array into a single list.
* Sort the list.

### Algorithm

1. Traverse every array.
2. Insert every element into a list.
3. Sort the list.
4. Return the sorted list.

### Complexity

* **Time:** `O(T log T)`
* **Space:** `O(T)`

where `T = total number of elements`.

---

# Optimal Approach (Min Heap)

## Intuition

Each array is already sorted.

We **don't need every element inside the heap**.

Instead,

* Keep **only one element from each array**.
* That element is the **smallest unprocessed element** of that array.

Whenever we remove one element from an array, only then do we insert its next element.

---

## Why only the first element?

Suppose

```text
A = [1,5,9]
B = [2,3,7]
C = [4,6,8]
```

Initially insert

```text
1 2 4
```

Heap

```text
      1
    /   \
   2     4
```

Remove **1**

Now the next smallest element from A is **5**.

Insert only **5**

Heap becomes

```text
2 4 5
```

Again,

Remove 2

Insert 3

Heap becomes

```text
3 4 5
```

Continue until the heap becomes empty.

---

# Why don't we insert all remaining elements?

Suppose after removing `1`, we do

```java
while(next element exists)
    insert into heap;
```

Then heap becomes

```text
2 4 5 9
```

Eventually every element enters the heap.

Now heap size becomes

```text
Total Elements
```

instead of

```text
K
```

Complexity changes from

```text
O(T log K)
```

to

```text
O(T log T)
```

which is worse.

---

# Key Observation

At any time,

**Heap stores exactly one candidate from every array.**

That candidate is the **smallest remaining element** of that array.

Since arrays are sorted,

If

```text
1 5 9
```

is the current array,

after removing **5**, only **9** can become the next candidate.

There is no need to insert **9** before **5** is removed.

---

# Algorithm

### Step 1

Create a Min Heap.

Each heap node stores

* value
* row (array index)
* col (element index)

---

### Step 2

Insert the first element of every array.

```text
for every array
    insert arr[i][0]
```

Heap size = K

---

### Step 3

Repeat until heap becomes empty

* Remove minimum element.
* Add it to answer.
* Move to the next element of the same array.
* If next element exists, insert it.

---

### Step 4

Return the merged array.

---

# Dry Run

Input

```text
A = [1,4,7]
B = [2,5,8]
C = [3,6,9]
```

### Initial Heap

```text
1 2 3
```

Answer

```text
[]
```

---

Pop 1

Answer

```text
[1]
```

Insert 4

Heap

```text
2 3 4
```

---

Pop 2

Answer

```text
[1,2]
```

Insert 5

Heap

```text
3 4 5
```

---

Pop 3

Answer

```text
[1,2,3]
```

Insert 6

Heap

```text
4 5 6
```

---

Continue

```text
Pop 4 → Insert 7

Pop 5 → Insert 8

Pop 6 → Insert 9

Pop 7

Pop 8

Pop 9
```

Final Answer

```text
1 2 3 4 5 6 7 8 9
```

---

# Correctness

The heap always contains the smallest unprocessed element from each array.

The minimum among these is guaranteed to be the smallest overall remaining element.

After removing it, only the next element from that same array can become a future candidate.

Thus, the merged order is always correct.



---

# Complexity Analysis

Let:

* `K` = Number of arrays
* `N` = Number of elements in each array
* `T = N × K` = Total elements

### Time Complexity

* Initial insertion: `O(K log K)`
* Each of the `T` elements is inserted and removed once: `O(T log K)`

Overall:

```text
O(T log K)
```

or

```text
O(N × K × log K)
```

### Space Complexity

Heap stores at most one element from each array.

```text
O(K)
```

Answer array:

```text
O(T)
```

---

# Interview Takeaways

* A heap should contain **only the current smallest candidate** from each sorted array.
* Never insert all remaining elements from an array at once; it increases the heap size from `K` to `T` and degrades the time complexity from `O(T log K)` to `O(T log T)`.
* The heap node must store:

  * `value`
  * `row` (which array)
  * `col` (index within that array)
* After removing an element, insert **only the next element from the same array**. This maintains the invariant that the heap always contains the smallest unprocessed element from each array.


```
class Solution {
    public ArrayList<Integer> mergeArrays(int[][] mat) {
        // Code here
        ArrayList<Integer> ans = new ArrayList<>();
        PriorityQueue<Node> pq = new PriorityQueue<>(
          (a, b)-> a.value- b.value
        );
        
        // Add first column into the queue
        for(int i=0; i<mat.length; i++)
           pq.offer(new Node(mat[i][0], i, 0));
           
        // Traverse through queue
        
        while(!pq.isEmpty()){
            Node node = pq.poll();
            ans.add(node.value);
            
          
            if(node.col+1 < mat[node.row].length){
                pq.offer(new Node(mat[node.row][node.col+1], node.row, node.col+1));
            }
        }
        return ans;
    }
    
    class Node {
        int value, row, col;
        
        public Node(int value, int row, int col){
            this.value = value;
            this.row = row;
            this.col = col;
        }
    }
}
```
