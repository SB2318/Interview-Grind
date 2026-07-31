The difference between **Subsets (LeetCode 78)** and **Subsets II (LeetCode 90)** is just **one extra condition**, but understanding *why* it's needed is important.

---

# Subsets I (LeetCode 78)

### Input

```text
nums = [1,2,3]
```

All elements are **distinct**.

Output:

```text
[]
[1]
[2]
[3]
[1,2]
[1,3]
[2,3]
[1,2,3]
```

There are exactly

```text
2^n
```

subsets.

### Standard Backtracking

```java
backtrack(index){

    ans.add(new ArrayList<>(list));

    for(int i=index;i<n;i++){

        list.add(nums[i]);

        backtrack(i+1);

        list.remove(list.size()-1);
    }
}
```

No duplicate handling is needed.

---

# Subsets II (LeetCode 90)

### Input

```text
nums = [1,2,2]
```

Now elements **can be duplicated**.

If we use the same code, let's see what happens.

---

## Recursion Tree

```text
                []
          /       |       \
        1         2        2
```

From the first `2`:

```text
[]
 └──2
      └──2
```

produces

```text
[2]
[2,2]
```

From the second `2`:

```text
[]
 └──2
```

again produces

```text
[2]
```

Duplicate!

---

## Why?

The two `2`s are identical.

Choosing the first `2` or the second `2` at the **same recursion level** creates the same subset.

---

# Step 1: Sort

Always sort first.

```text
[2,1,2]

↓

[1,2,2]
```

Now duplicates become adjacent.

---

# Step 2: Skip duplicates at the same level

Inside the loop:

```java
if(i > index && nums[i] == nums[i-1])
    continue;
```

This single line removes duplicate subsets.

---

# Why `i > index`?

Suppose

```text
nums = [1,2,2]
```

At the root level:

```text
index = 0

i = 0 → 1

i = 1 → first 2

i = 2 → second 2
```

When

```text
i = 2
```

we have

```text
nums[2] == nums[1]
```

and

```text
i > index
```

So skip it.

Why?

Because starting from the second `2` generates exactly the same subsets as starting from the first `2`.

---

# But why NOT simply write

```java
if(nums[i]==nums[i-1])
```

Because we'd skip valid subsets.

Example:

```text
[1,2,2]
```

Suppose we've already chosen the first `2`.

Current path:

```text
[1,2]
```

Now

```text
index = 2

i = 2
```

We should be allowed to take the second `2` and form:

```text
[1,2,2]
```

If we wrote

```java
if(nums[i]==nums[i-1])
```

we would wrongly skip it.

That's why we check

```java
i > index
```

This means:

> Skip duplicates **only when they appear as siblings (same recursion level)**.

---

# Visual Intuition

Without skip:

```text
Level 0

        []
      /  |  \
     1  2a 2b
```

Both branches generate

```text
[2]
```

Duplicate.

So remove

```text
2b
```

At deeper level:

```text
[2a]
   |
   2b
```

This produces

```text
[2,2]
```

which is **not** a duplicate and should be kept.

---

# Difference Summary

| Feature         | Subsets I         | Subsets II                                           |
| --------------- | ----------------- | ---------------------------------------------------- |
| Input           | Distinct elements | May contain duplicates                               |
| Sort required?  | ❌ No              | ✅ Yes                                                |
| Duplicate check | ❌ No              | ✅ `if (i > index && nums[i] == nums[i-1]) continue;` |
| Time Complexity | `O(2^n)`          | `O(2^n)` (after sorting)                             |

### Interview intuition

The key idea to remember is:

* **Subsets I:** Every element represents a unique choice.
* **Subsets II:** Equal-valued elements can create identical branches. By sorting and skipping duplicate values **only at the same recursion level**, you eliminate duplicate subsets while still allowing duplicates to appear together in a subset (like `[2,2]`).


```
class Solution {
    public List<List<Integer>> subsetsWithDup(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> list = new ArrayList<>();
        Arrays.sort(nums);

        solve(0, nums, list, ans);

        return ans;
    }

    private void solve(int ind, int[] nums, List<Integer> list, List<List<Integer>> ans){

        ans.add(new ArrayList<>(list));

        for(int i=ind; i<nums.length; i++){

            if(i > ind && nums[i] == nums[i-1]) continue;
            list.add(nums[i]);
            solve(i+1, nums, list, ans);
            list.remove(list.size()-1);
        }
    }
}

```
