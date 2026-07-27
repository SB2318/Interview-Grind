### Intuition

The main idea is to **always split the numbers into two halves**.

* **Left Half (`small`)** → stores the **smaller half** of the numbers.
* **Right Half (`large`)** → stores the **larger half** of the numbers.

We maintain these two conditions:

1. Every element in `small` ≤ every element in `large`.
2. `small` has either:

   * the same number of elements as `large`, or
   * one extra element.

Why?

Because the median always lies in the middle.

* If there are an **odd** number of elements, the middle element is the **largest element of the left half** (`small.peek()`).
* If there are an **even** number of elements, the median is the average of:

  * the largest element of the left half (`small.peek()`), and
  * the smallest element of the right half (`large.peek()`).

---

### Why Max Heap and Min Heap?

Suppose the numbers are:

```
1 2 3 4 5 6
```

We divide them as:

```
small (Max Heap)       large (Min Heap)

1 2 3                  4 5 6
      ↑                  ↑
   largest            smallest
```

The median is simply:

```
(3 + 4) / 2
```

Notice that we only need:

* the **largest** element from the left half,
* the **smallest** element from the right half.

A **Max Heap** gives the largest element in `O(1)`, and a **Min Heap** gives the smallest element in `O(1)`.

---

### How insertion works

Suppose we insert:

```
5, 2, 8, 1, 7
```

#### Insert 5

```
small = [5]
large = []

Median = 5
```

---

#### Insert 2

```
Numbers = 2 5

small = [2]
large = [5]

Median = (2 + 5)/2
```

---

#### Insert 8

```
Numbers = 2 5 8

small = [5,2]
large = [8]

Median = 5
```

---

#### Insert 1

```
Numbers = 1 2 5 8

small = [2,1]
large = [5,8]

Median = (2+5)/2
```

---

#### Insert 7

```
Numbers = 1 2 5 7 8

small = [5,2,1]
large = [7,8]

Median = 5
```

---

### Why do we always insert into `small` first?

Instead of deciding whether the new number belongs to the left or right half, we use a simple three-step process:

1. Insert the new number into `small`.
2. Move the largest element from `small` to `large`.
3. If `large` becomes larger than `small`, move its smallest element back to `small`.

These steps automatically maintain both invariants:

* All elements in `small` remain less than or equal to those in `large`.
* The heap sizes stay balanced.

This avoids writing multiple `if` conditions to determine where the new element should go, making the algorithm simpler and less error-prone.


```
class MedianFinder {
    private PriorityQueue<Integer> maxHeap, minHeap;
    public MedianFinder() {
        maxHeap = new PriorityQueue<>(Collections.reverseOrder()); // store min element in decreasing order
        minHeap = new PriorityQueue<>(); // store max element in increasing order
    }
    
    public void addNum(int num) {
        maxHeap.offer(num);

        minHeap.offer(maxHeap.poll());

        if(minHeap.size() > maxHeap.size()){
            maxHeap.offer(minHeap.poll());
        }
    }
    
    public double findMedian() {
         if(maxHeap.size() == minHeap.size()){
            // even sized 
            double sum = maxHeap.peek() + minHeap.peek();
            return sum/2;
         }

         return maxHeap.peek(); // largest element in smallest array
    }
}

/**
 * Your MedianFinder object will be instantiated and called as such:
 * MedianFinder obj = new MedianFinder();
 * obj.addNum(num);
 * double param_2 = obj.findMedian();
 */

```
