
# Maximum Product Subarray – Complete Notes

## Problem Statement

Given an integer array `nums`, find the **contiguous subarray** that has the **largest product**, and return that product.

---

# Intuition

For the **Maximum Sum Subarray (Kadane's Algorithm)**, we only track the maximum sum because:

* Positive numbers increase the sum.
* Negative numbers decrease the sum.

For **products**, things become interesting because:

```text
Negative × Negative = Positive
```

A very **small (negative)** product today can become the **largest (positive)** product tomorrow.

Therefore, tracking only the maximum product is **not enough**.

---

# Why do we track `minProduct`?

Suppose we have:

```text
[-2, 3]
```

At index `1`:

```text
maxProduct = 3
minProduct = -6
```

Now suppose the next number is:

```text
-4
```

If we only use `maxProduct`:

```text
3 × (-4) = -12
```

But if we also remember the minimum:

```text
-6 × (-4) = 24
```

Suddenly,

```text
24
```

becomes the new maximum product.

**Conclusion:**

> We keep `minProduct` because **the most negative product can become the largest positive product after multiplying by another negative number.**

---

# Role Reversal

Whenever the current number is negative,

```text
Maximum × Negative → Minimum
Minimum × Negative → Maximum
```

Example:

```text
Current

maxProduct = 8
minProduct = -12

nums[i] = -3
```

After multiplication:

```text
8 × (-3) = -24
-12 × (-3) = 36
```

Result:

```text
Old Maximum → New Minimum
Old Minimum → New Maximum
```

This is why we **swap** before updating.

```java
if (nums[i] < 0) {
    int temp = maxProduct;
    maxProduct = minProduct;
    minProduct = temp;
}
```

---

# Why compare with `nums[i]`?

At every index, we have **two choices**.

### Option 1: Start a new subarray

```text
nums[i]
```

### Option 2: Continue the previous subarray

```text
nums[i] * maxProduct
```

Hence,

```java
maxProduct = Math.max(nums[i], nums[i] * maxProduct);
```

Similarly,

```java
minProduct = Math.min(nums[i], nums[i] * minProduct);
```

This also naturally handles **zeros**, since multiplying by zero resets both products.

---

# Algorithm

1. Initialize

```text
maxProduct = nums[0]
minProduct = nums[0]
answer = nums[0]
```

2. Traverse from index `1`.

3. If current number is negative:

   * Swap `maxProduct` and `minProduct`.

4. Update

```java
maxProduct = Math.max(nums[i], nums[i] * maxProduct);
minProduct = Math.min(nums[i], nums[i] * minProduct);
```

5. Update answer.

```java
answer = Math.max(answer, maxProduct);
```

---

# Dry Run

## Example

```text
nums = [-2, 3, -4]
```

### Initially

```text
max = -2
min = -2
ans = -2
```

---

### Current = 3

Positive, no swap.

```text
max = max(3, -2×3)
    = 3

min = min(3, -2×3)
    = -6

ans = 3
```

---

### Current = -4

Negative → Swap first.

Before swap

```text
max = 3
min = -6
```

After swap

```text
max = -6
min = 3
```

Now update

```text
max = max(-4, -6×-4)
    = 24

min = min(-4, 3×-4)
    = -12

ans = 24
```

Final Answer

```text
24
```

---

# Correct Java Code

```java
class Solution {
    public int maxProduct(int[] nums) {

        int maxProduct = nums[0];
        int minProduct = nums[0];
        int ans = nums[0];

        for (int i = 1; i < nums.length; i++) {

            if (nums[i] < 0) {
                int temp = maxProduct;
                maxProduct = minProduct;
                minProduct = temp;
            }

            maxProduct = Math.max(nums[i], nums[i] * maxProduct);
            minProduct = Math.min(nums[i], nums[i] * minProduct);

            ans = Math.max(ans, maxProduct);
        }

        return ans;
    }
}
```

---

# Complexity

* **Time Complexity:** `O(n)`
* **Space Complexity:** `O(1)`

---

# Key Takeaways

* Track **both** maximum and minimum products ending at the current index.
* A **negative number flips the roles** of maximum and minimum.
* Always **swap** when the current element is negative.
* Compare with the current element to decide whether to **start a new subarray** or **extend the previous one**.
* `minProduct` is **not** stored because we want the minimum answer—it is stored because it may become the **maximum** after multiplying by a negative number.

> **Golden Rule:**
> **Today's maximum can become tomorrow's minimum, and today's minimum can become tomorrow's maximum.** This single idea is the heart of the Maximum Product Subarray algorithm.


```
class Solution {
    public int maxProduct(int[] nums) {
        int maxProduct = nums[0], minProduct = nums[0], ans = nums[0];

        for(int i=1; i<nums.length; i++){

            if(nums[i] < 0){
                int t = minProduct;
                minProduct = maxProduct;
                maxProduct = t;
            }

            maxProduct = Math.max(nums[i], nums[i]*maxProduct);
            minProduct = Math.min(nums[i], nums[i]*minProduct);

            ans = Math.max(maxProduct, ans);
        }

        return ans;
    }
}
```
