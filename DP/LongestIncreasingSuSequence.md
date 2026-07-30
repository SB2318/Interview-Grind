
## Lower Bound

<img width="1002" height="607" alt="image" src="https://github.com/user-attachments/assets/008d5bbc-686e-457c-99aa-221d146101bd" />

The **O(n log n)** LIS algorithm is one of those algorithms that feels magical until you understand **what `temp` actually represents**.

---

# Step 1: What is LIS?

Given

```text
3 4 2 8 10 5 1
```

The LIS is

```text
3 4 8 10
```

Length = **4**

The brute-force DP solution is `O(n²)`.

We want `O(n log n)`.

---

# Step 2: The biggest observation

Suppose we have two increasing subsequences of the same length.

Example

```text
2 9
```

and

```text
2 5
```

Both have length **2**.

Which one is better?

Obviously

```text
2 5
```

because it ends with a smaller number.

It can be extended more easily.

For example, if the next number is

```text
6
```

then

```text
2 5 6
```

works.

But

```text
2 9 6
```

doesn't.

**Smaller ending value = more future possibilities.**

This is the key idea.

---

# Step 3: What does `temp` store?

It **does not store the LIS itself.**

It stores

> the smallest possible tail of an increasing subsequence of every length.

Meaning

```text
temp[0]
```

= smallest ending value of a subsequence of length 1.

```text
temp[1]
```

= smallest ending value of a subsequence of length 2.

```text
temp[2]
```

= smallest ending value of a subsequence of length 3.

and so on.

---

# Step 4: Example

Take

```text
3 4 2 8 10 5
```

Initially

```text
temp = [3]
```

Meaning

Length 1 can end with 3.

---

Next = 4

Since

```text
4 > 3
```

append

```text
temp = [3,4]
```

Now

Length 2 can end with 4.

---

Next = 2

Can we make length 3?

No.

Instead,

replace

```text
3
```

with

```text
2
```

Now

```text
temp = [2,4]
```

Notice

```text
2 4
```

is better than

```text
3 4
```

because it starts smaller.

---

Next = 8

Append

```text
temp = [2,4,8]
```

---

Next = 10

Append

```text
temp = [2,4,8,10]
```

---

Next = 5

Cannot append.

Find first value ≥5.

That is

```text
8
```

Replace.

```text
temp = [2,4,5,10]
```

Length remains

```text
4
```

But now the subsequence ending with 5 is much easier to extend than one ending with 8.

---

# Step 5: Why replacement never decreases the answer

Suppose

```text
temp = [2,4,8]
```

Replace

```text
8
```

with

```text
5
```

Now

```text
temp = [2,4,5]
```

We still have a subsequence of length 3.

We've simply improved its ending value.

So we've **kept the same length but increased our chances of extending it later**.

---

# Step 6: Why binary search?

Observe that

```text
temp
```

is always sorted.

Example

```text
2 4 5 10
```

It can never become

```text
2 10 5
```

because every longer increasing subsequence must end with a value greater than or equal to the tail of a shorter one.

Since `temp` is sorted, we can binary search.

---

# Step 7: Why first element ≥ target?

Suppose

```text
temp = [2,4,8,10]
```

Incoming value

```text
5
```

We search

First value

```text
>=5
```

That is

```text
8
```

Replace

```text
8
```

with

```text
5
```

Result

```text
2 4 5 10
```

Why not replace 10?

Because then

```text
2 4 8 5
```

would no longer represent valid increasing tails.

We must replace the **first** element that's at least the target to keep the smallest possible tails for every subsequence length.

---

# Step 8: Visual intuition

Suppose

```text
3 10 2 1 20
```

Process one by one.

```
3
temp = [3]
```

```
10
temp = [3,10]
```

```
2
temp = [2,10]
```

```
1
temp = [1,10]
```

```
20
temp = [1,10,20]
```

Answer

```
3
```

Notice

```text
1 10 20
```

wasn't actually built from the original order as the maintained sequence. That's okay.

`temp` is **not** intended to be the actual LIS. It's a compact summary of the best possible tail values.

---

# Step 9: Why does `index + 1` equal the LIS length?

Each time

```java
if (arr[i] > temp[index])
```

we've found a longer increasing subsequence, so we extend `temp` and increment `index`.

Every replacement only improves an existing tail without changing the subsequence length.

Therefore:

* **Append** → LIS length increases.
* **Replace** → LIS length stays the same.

At the end,

```java
index + 1
```

is exactly the length of the longest increasing subsequence.

---

## The core idea in one sentence

Think of `temp` as maintaining **the smallest possible ending value for an increasing subsequence of every length**. When a new number arrives, you either:

* **append** it if it extends the longest subsequence, or
* **replace** the first tail that is greater than or equal to it, making that subsequence easier to extend later.

That single greedy idea is what reduces the time complexity from **O(n²)** to **O(n log n)**.

```
class Solution {
    static int lis(int arr[]) {
        // code here
        int[] temp = new int[arr.length];
        int index =0;
        temp[0] = arr[0];
        
        for(int i=0; i<arr.length; i++){
            
            if(temp[index] < arr[i]){
                temp[++index] = arr[i];
            }else{
                
                int ind = lowerBound(arr[i], temp, 0, index);
                temp[ind] = arr[i];
            }
        }
        
        return index+1;
    }
    
    private static int lowerBound(int target, int[] arr, int low, int high){
        
        while(low <= high){
            
            int mid = low + (high-low)/2;
            
            if(arr[mid] >= target){
                high = mid-1;
            }else{
                low = mid+1;
            }
        }
        
        return low;
    }
}
```
