# Heap Data Structure – Complete Notes

## What is a Heap?

A **Heap** is a **Complete Binary Tree (CBT)** that satisfies the **Heap Property**.

A Complete Binary Tree means:

* All levels are completely filled except possibly the last.
* The last level is filled from **left to right**.

Because of this property, heaps are efficiently stored in an **array** without pointers.

---

## Types of Heap

### 1. Max Heap

Every parent node is **greater than or equal to** its children.

```
          100
        /     \
      50       80
     /  \     /  \
   20   40   60  70
```

* Root contains the **largest element**.

---

### 2. Min Heap

Every parent node is **smaller than or equal to** its children.

```
          10
        /    \
      20      30
     /  \    /  \
   40   50  60  70
```

* Root contains the **smallest element**.

---

# Array Representation

Suppose the heap is

```
        90
      /    \
    70      50
   /  \    /
 40  60  20
```

Stored as

```
Index : 0  1  2  3  4  5
Value :90 70 50 40 60 20
```

---

## Index Formula (0-Based)

For any node at index **i**

```
Left Child  = 2*i + 1

Right Child = 2*i + 2

Parent      = (i-1)/2
```

Example

```
Index = 2

Left = 5

Right = 6

Parent = 0
```

---

# Operations

| Operation   | Time     |
| ----------- | -------- |
| Insert      | O(log n) |
| Delete Root | O(log n) |
| Peek        | O(1)     |
| Build Heap  | O(n)     |
| Heapify     | O(log n) |

---

# Heapify

Heapify fixes the heap property from a node downward.

Example

```
        20
      /    \
    50      40
```

Not a Max Heap.

Compare with children.

Largest = 50

Swap

```
        50
      /    \
    20      40
```

Heap property restored.

Time Complexity

```
O(log n)
```

---

# Insertion in Max Heap

### Step 1

Insert at the last position.

Example

```
        90
      /    \
    70      50

Insert 80

        90
      /    \
    70      50
   /
 80
```

---

### Step 2

Bubble Up (Percolate Up)

Compare with parent.

```
80 > 70

Swap
```

```
        90
      /    \
    80      50
   /
 70
```

Done.

Time Complexity

```
O(log n)
```

---

# Deletion in Max Heap

Delete only the **root**.

Example

```
        90
      /    \
    80      70
   /  \
 50   40
```

### Step 1

Replace root with last element.

```
        40
      /    \
    80      70
   /
 50
```

---

### Step 2

Remove last node.

---

### Step 3

Bubble Down

Compare with larger child.

```
40 < 80

Swap
```

```
        80
      /    \
    40      70
   /
 50
```

Again

```
40 < 50

Swap
```

```
        80
      /    \
    50      70
   /
 40
```

Done.

Time Complexity

```
O(log n)
```

---

# Heap Construction

Given an array

```
[5,4,3,2,1]
```

Start heapifying from the **last non-leaf node**.

Last non-leaf

```
n/2 - 1
```

For

```
n = 5

Last non-leaf = 1
```

Heapify

```
1
0
```

Entire heap built.

Complexity

```
O(n)
```

---

# Why Build Heap is O(n)?

Although each heapify takes **O(log n)**, most nodes are leaves or near the bottom and require very little work. Summing the work across all levels gives an overall complexity of **O(n)**.


# Applications of Heap

* Priority Queue
* Dijkstra's Algorithm
* Prim's Algorithm
* Huffman Coding
* Heap Sort
* Kth Largest / Kth Smallest Element
* Merge K Sorted Lists
* Median from Data Stream
* Scheduling and CPU task management

---

# Important Interview Points

* Heap is a **Complete Binary Tree**, **not** a Binary Search Tree.
* A heap only guarantees the relationship between a node and its children; siblings are not ordered.
* In a Max Heap, the largest element is always at the root. In a Min Heap, the smallest element is always at the root.
* Insertion uses **bubble up (percolate up)**.
* Deletion uses **bubble down (heapify down)**.
* `PriorityQueue` in Java implements a **Min Heap** by default.
* To create a Max Heap using `PriorityQueue`:

```java
PriorityQueue<Integer> maxHeap =
    new PriorityQueue<>(Collections.reverseOrder());
```

This covers the core concepts, implementation, and interview-relevant details needed to understand and use a Max Heap effectively.

Unlike a BST, a heap is not searched or processed using inorder/preorder/postorder. Most heap operations rely on the array representation, where a simple iteration corresponds to level-order traversal, 
and structural operations (insert/delete) move only along a single root-to-leaf or leaf-to-root path.

## Implement Max Heap

```
class maxHeap {
    
    ArrayList<Integer> heap;
    // Constructor
    public maxHeap() {
        // Initialize your data members
        heap = new ArrayList<>();
    }

    public void push(int x) {
        // Insert x into the heap
        heap.add(x);
        int index = heap.size()-1;
        
        while(index > 0){
            
            int parent = (index-1)/2;
            
            if(heap.get(parent) < heap.get(index)){
                swap(index, parent);
                index = parent;
            }else{
                break;
            }
        }
    }

    public void pop() {
        // Remove the top (maximum) element
        if(heap.isEmpty()) return;
        int first = heap.get(0);
        int last = heap.remove(heap.size()-1);
        
        if(!heap.isEmpty()){
            heap.set(0, last);
            heapify(0);
        }
    }

    public int peek() {
        // Return the top element or -1 if empty
        if(heap.isEmpty()) return -1;
        return heap.get(0);
    }

    public int size() {
        // Return the number of elements in the heap
        return heap.size();
    }
    
    private void heapify(int index){
        int largest = index;
        int left = 2*index+1;
        int right = 2*index + 2;
        
        if(left < heap.size() && heap.get(left) > heap.get(largest)){
            largest = left;
        }
        
        if(right < heap.size() && heap.get(right) > heap.get(largest)){
            largest = right;
        }
        
        if(largest != index){
            swap(index, largest);
            heapify(largest);
        }
    }
    
    private void swap(int i, int j){
        
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }
}
```

# Min Heap

A **Min Heap** is also a **Complete Binary Tree (CBT)**, but it satisfies the following property:

* Every parent node is **smaller than or equal to** its children.
* The **smallest element** is always present at the root.

Example:

```text
          10
        /    \
      20      30
     /  \    /  \
   40   50  60  70
```

---

# How is Min Heap Different from Max Heap?

| Max Heap                             | Min Heap                            |
| ------------------------------------ | ----------------------------------- |
| Parent ≥ Children                    | Parent ≤ Children                   |
| Root contains the largest element    | Root contains the smallest element  |
| Used when highest priority is needed | Used when lowest priority is needed |

---

# Operations in Min Heap

The operations remain exactly the same as Max Heap.

### Insertion (Bubble Up)

* Insert the new element at the last position.
* Compare it with its parent.
* If the child is **smaller** than the parent, swap them.
* Continue until the heap property is restored.

---

### Deletion (Bubble Down)

* Delete the root (minimum element).
* Replace it with the last element.
* Compare with the **smaller child**.
* Swap if necessary.
* Continue until the heap property is restored.

---

# Heapify in Min Heap

Unlike Max Heap, where we swap with the **largest child**, in a Min Heap we swap with the **smallest child**.

Example:

```text
        40
      /    \
    20      30
```

Smallest child = **20**

After Heapify:

```text
        20
      /    \
    40      30
```

---

# Build Min Heap

The process is **exactly the same** as Max Heap.

* Start from the **last non-leaf node** (`n/2 - 1`).
* Perform **Heapify** on each node until the root.
* Time Complexity: **O(n)**.

---

# Java PriorityQueue

Java's `PriorityQueue` implements a **Min Heap** by default.

```java
PriorityQueue<Integer> minHeap = new PriorityQueue<>();
```

No comparator is required.

---

# Where is Min Heap Used?

* Dijkstra's Algorithm
* Prim's Algorithm
* Merge K Sorted Lists
* Kth Largest/Smallest Element
* Event Scheduling
* Task Scheduling
* Median from Data Stream (used together with a Max Heap)

---

```
class minHeap {
    ArrayList<Integer> heap;
    // Constructor
    public minHeap() {
        // Initialize your data members
        heap = new ArrayList<>();
    }

    public void push(int x) {
        // Insert x into the heap
        heap.add(x);
        int index = heap.size()-1;
        
        while(index > 0){
            
            int parent = (index-1)/2;
            
            if(heap.get(parent) > heap.get(index)){
                swap(index, parent);
                index = parent;
            }else{
                break;
            }
        }
    }

    public void pop() {
        // Remove the top (minimum) element
        if(heap.isEmpty()) return;
        
        int first = heap.get(0);
        int last = heap.remove(heap.size()-1);
        
        if(!heap.isEmpty()){
            heap.set(0, last);
            heapify(0);
        }
    }

    public int peek() {
        // Return the top element or -1 if empty
        if(heap.isEmpty()) return -1;
        
        return heap.get(0);
    }

    public int size() {
        // Return the number of elements in the heap
        return heap.size();
    }
    
    private void swap(int i, int j){
        int temp = heap.get(i);
        heap.set(i, heap.get(j));
        heap.set(j, temp);
    }
    
    private void heapify(int index){
        
        int smallest = index;
        int left = 2*index+1;
        int right = 2*index+2;
        
        if(left < heap.size() && heap.get(left) < heap.get(smallest))
          smallest = left;
        
        if(right < heap.size() && heap.get(right) < heap.get(smallest))
          smallest = right; 
          
        if(smallest != index){
            
            swap(index, smallest);
            heapify(smallest);
        }
        
    }
}
```

