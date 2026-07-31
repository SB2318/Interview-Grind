The **Super Egg Drop** problem is one of the most famous DP optimization problems. Most people initially think it's about eggs, but it is actually about **minimizing the worst-case number of experiments**.

---

# Problem Statement

You are given:

* `k` eggs
* `n` floors

Find the **minimum number of moves** required to determine the **critical floor**.

### Critical Floor

There exists some floor `f` such that

* Egg does **not break** from floors `<= f`
* Egg **breaks** from floors `> f`

Need to find `f` in the worst case.

---

## Example

```
2 Eggs
6 Floors
```

Possible critical floor

```
0
1
2
3
4
5
6
```

Need minimum attempts to identify it.

---

# First Intuition

Suppose

```
2 Eggs
10 Floors
```

Where should we throw first?

```
1?
2?
5?
8?
10?
```

Every choice creates two situations.

---

Suppose we throw from floor **x**

Two possibilities

## Case 1

Egg breaks

```
      x
      |
      *
     / \
BREAKS
```

Then

```
Need to search below x
```

Eggs decrease by one.

Problem becomes

```
(k-1 eggs, x-1 floors)
```

---

## Case 2

Egg survives

```
      x
      |
      *
      |
SAFE
```

Need to search above x.

Egg count remains same.

Problem becomes

```
(k eggs, n-x floors)
```

---

So one decision creates

```
            Throw at x

          /           \
      Break         Doesn't Break

(k-1,x-1)          (k,n-x)
```

---

# Why Worst Case?

Suppose

```
Throw from floor 5
```

Break case needs

```
3 moves
```

Safe case needs

```
6 moves
```

Nature can always force you into

```
6 moves
```

Therefore

```
Worst =
max(break,safe)
```

We cannot control what happens.

So

```
Worst =
1 + max(left,right)
```

The +1 is current throw.

---

# Recursive Formula

Try every floor.

```
for x = 1 to n

break =
solve(k-1,x-1)

safe =
solve(k,n-x)

worst =
1 + max(break,safe)
```

Take minimum among all choices.

```
answer =
min(all worst cases)
```

Hence

```
dp(k,n)=

min over x

1 + max(
dp(k-1,x-1),
dp(k,n-x)
)
```

This is the original recurrence.

---

# Base Cases

## No floors

```
0 floors

Need 0 attempts
```

```
dp(k,0)=0
```

---

## One floor

```
Need only one throw
```

```
dp(k,1)=1
```

---

## One egg

Only one option.

```
1
2
3
4
5
...
```

Must check sequentially.

```
Worst = n
```

So

```
dp(1,n)=n
```

---

# Why Brute Force is Slow

For every state

```
(k,n)
```

We try

```
1...
n
```

floors.

Number of states

```
k*n
```

Each state

```
O(n)
```

Therefore

```
O(k*n²)
```

For

```
100 eggs
10000 floors
```

Impossible.

---

# Observe Something Interesting

Suppose

```
Break

dp(k-1,x-1)
```

As x increases

```
More floors below

Answer increases
```

Example

```
1
2
3
4
5
```

```
1
2
3
4
...
```

Increasing.

---

Now look at

```
Safe

dp(k,n-x)
```

As x increases

Remaining floors become smaller.

```
10 floors

x=2

Need solve(8)

x=7

Need solve(3)
```

So

```
Safe decreases.
```

---

Therefore

```
Break
      /
     /
    /

Safe
    \
     \
      \
```

One increasing.

One decreasing.

---

The worst

```
max(break,safe)
```

forms a **V-shaped curve**.

```
          max

          *
         ***
       **   **
     **       **
```

Minimum lies near where both become equal.

---

This monotonicity allows **Binary Search**.

---

# Binary Search Optimization

Instead of trying

```
1
2
3
4
...
n
```

We binary search.

Take

```
mid
```

Compute

```
left

dp(k-1,mid-1)

right

dp(k,n-mid)
```

---

If

```
left < right
```

Means

```
Safe dominates.
```

Need to move upward.

```
low = mid+1
```

---

If

```
left > right
```

Break dominates.

Need to move downward.

```
high = mid-1
```

---

Complexity becomes

```
States

k*n

Each state

log n
```

Total

```
O(k*n log n)
```

Much faster.

---

# The Genius Optimization (Moves-Based DP)

Instead of asking:

> **With `k` eggs and `n` floors, how many moves do we need?**

Reverse the question:

> **With `m` moves and `k` eggs, how many floors can we test?**

Define:

```
dp[m][k]
=
Maximum floors that can be checked
using
m moves
and
k eggs.
```

---

Suppose we throw an egg.

Two possibilities:

```
Break

↓

m-1 moves
k-1 eggs
```

or

```
Safe

↓

m-1 moves
k eggs
```

Current floor itself also gets determined.

Hence

```
dp[m][k]
=
1
+
dp[m-1][k-1]
+
dp[m-1][k]
```

This beautiful recurrence comes from combining:

* Floors below (break case)
* Current floor
* Floors above (safe case)

---

Keep increasing `m` until:

```
dp[m][k] >= n
```

The first such `m` is the answer.

### Complexity

* Time: `O(k × answer)`
* Space: `O(k)` with optimization.

This is the optimal solution used for the LeetCode **Super Egg Drop** problem.

---

# Complete Progression (Striver Roadmap)

1. **Recursion**

   * Try every floor.
   * `1 + max(break, safe)`

2. **Memoization**

   * Cache `(eggs, floors)` states.
   * Time: `O(k × n²)`

3. **Binary Search Optimization**

   * Use monotonicity of break/safe cases.
   * Time: `O(k × n log n)`

4. **Moves-Based DP (Optimal)**

   * Change the state definition.
   * Recurrence: `dp[m][k] = 1 + dp[m-1][k-1] + dp[m-1][k]`
   * Time: `O(k × answer)` (the standard optimal approach).


## DRY RUN

Suppose there are **10 floors**, and the unknown critical floor is `f`.

```
Floors

10
9
8
7
6
5
4
3
2
1
```

Assume we throw the egg from **floor 6**.

## Case 1: Egg Breaks

```
10
9
8
7
6  💥 Breaks
5
4
3
2
1
```

What do we learn?

Since it broke at 6,

```
Critical floor < 6
```

So the answer can only be among

```
1, 2, 3, 4, 5
```

There is **no need to search above 6** because every floor above 6 will also break.

Remaining problem:

```
5 floors
1 egg less
```

That's why:

```
dp(k-1, 5)
```

---

## Case 2: Egg Does NOT Break

```
10
9
8
7
6  ✅ Safe
5
4
3
2
1
```

What do we learn?

Since the egg survived,

```
Critical floor ≥ 6
```

We now know:

* Floors `1` through `6` are definitely safe.
* The critical floor cannot be below 6.

So why search above?

Because we still don't know **where it starts breaking**.

Maybe the critical floor is:

```
6
```

or

```
7
```

or

```
8
```

or

```
9
```

or even

```
10
```

All these are still possible.

So the only unexplored floors are:

```
7
8
9
10
```

Exactly **4 floors**, which is:

```
10 - 6 = 4
```

Egg count remains the same because it didn't break.

Remaining problem:

```
dp(k, 4)
```

---

## Think Like a Detective 🕵️

Imagine you're searching for the highest floor from which an egg **doesn't** break.

You test floor 6.

### Egg breaks

```
❌ Too high.

Search lower.
```

### Egg survives

```
✅ Great!

Now we already know every floor up to 6 is safe.

The answer, if it exists higher, must be above 6.
```

There is nothing left to learn below 6—they've already been proven safe.

---

## Visual Example

Suppose the actual critical floor is **8**.

```
10 ❌
 9 ❌
 8 ✅  ← Critical Floor
 7 ✅
 6 ✅  ← We tested here
 5 ✅
 4 ✅
 3 ✅
 2 ✅
 1 ✅
```

After testing floor 6:

```
6 survives
```

We immediately know:

```
1..6 are safe.
```

But we **don't know** whether:

* 7 is safe,
* 8 is safe,
* 9 breaks,
* or 10 breaks.

So we must continue searching **above 6**.

---

### The DP intuition

Whenever you throw an egg from floor `x`:

* **Breaks** → Search below `x` with **one fewer egg**:

  ```
  dp(k-1, x-1)
  ```

* **Doesn't break** → Search above `x` with **the same number of eggs**:

  ```
  dp(k, n-x)
  ```

The egg surviving tells you that all floors up to `x` are safe, so the only uncertainty that remains is in the floors **above** `x`. This is why the "safe" branch always searches the upper part.


## Recursion

```
class Solution {
    public int superEggDrop(int k, int n) {
        
        int[][] dp = new int[k+1][n+1];

        for(int[] a: dp) Arrays.fill(a, -1);

        return solve(k, n, dp);
    }

    private int solve(int eggs, int floors, int[][] dp){

        if(eggs == 1 || floors <=1) return floors;
        if(dp[eggs][floors] != -1) return dp[eggs][floors];

        int ans = Integer.MAX_VALUE;

        int low = 1, high = floors;

        while(low <= high){

            int mid = low + (high-low)/2;

            int breakCase = solve(eggs-1, mid-1, dp);
            int safeCase =  solve(eggs, floors-mid, dp);

            ans = Math.min(ans, 1 + Math.max(breakCase, safeCase));

            if(breakCase > safeCase) high = mid-1;
            else low = mid+1;
        }

        return dp[eggs][floors] =ans;
    }
}
```

# DP

```
class Solution {
    public int superEggDrop(int k, int n) {
        
        int[][] dp = new int[k+1][n+1];

        // base case
        // floors = 1, eggs =1 , ans = floor
        // floors = 0, eggs = 1 . ans = floor
        for(int egg = 0; egg <= k; egg++){
            for(int floor = 0; floor <= n; floor++){
                if(floor == 0 || floor == 1 || egg == 1) dp[egg][floor] = floor;
            }
        }

        for(int egg = 2; egg <= k; egg++){
            for(int floor = 2; floor <= n; floor++){
                int ans = Integer.MAX_VALUE;

                int low = 1, high = floor;

                while(low <= high){

                    int mid = low + (high-low)/2;

                    int breakCase = dp[egg-1][mid-1];
                    int safeCase =  dp[egg][floor-mid];

                    ans = Math.min(ans, 1 + Math.max(breakCase, safeCase));

                    if(breakCase > safeCase) high = mid-1;
                    else low = mid+1;
                }
                dp[egg][floor] = ans;
            }
        }

        return dp[k][n];
    }
}
```
