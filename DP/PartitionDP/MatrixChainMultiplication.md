<img width="1015" height="566" alt="image" src="https://github.com/user-attachments/assets/0d147453-df87-4a0b-9983-b926fb9ad1ab" />

## Partition DP
Solve a problem in multiple ways, and there will be different solution for each way.

<img width="883" height="508" alt="image" src="https://github.com/user-attachments/assets/b4c92c99-daa5-4707-8aed-eb27adc18e4b" />

For any given matrix the dimension will be A[i-1] * A[i]

<img width="965" height="472" alt="image" src="https://github.com/user-attachments/assets/b14a9055-29c7-40a7-a84b-73626fbfd75e" />

<img width="1107" height="502" alt="image" src="https://github.com/user-attachments/assets/90858199-2ac7-4271-afae-53580206cc30" />

# Partition DP Notes (Theory Only)

Partition DP is used when a problem asks:

> **"Where should I split (partition) a range so that the total cost/value becomes optimal?"**

Unlike 1D DP (LIS, House Robber, etc.), here **every state is an interval**.

---

# 1. When to Identify Partition DP?

Look for these keywords:

* Partition
* Split
* Cut
* Parenthesize
* Break into parts
* Divide into subproblems

Examples:

* Matrix Chain Multiplication (MCM)
* Minimum Cost to Cut a Stick
* Burst Balloons
* Palindrome Partitioning II
* Boolean Parenthesization

---

# 2. State Definition

The state is almost always

```text
dp(i, j)
```

meaning

> **Answer for the interval from i to j.**

Examples

### Matrix Chain Multiplication

```text
dp(i,j)

Minimum multiplication cost
from matrix Ai to Aj.
```

---

### Burst Balloons

```text
dp(i,j)

Maximum coins
from balloons i...j.
```

---

### Palindrome Partition

```text
dp(i,j)

Minimum cuts
needed for substring i...j.
```

---

# 3. Base Case

Ask yourself

> **When does this interval become too small to partition?**

Usually

```text
i == j
```

or

```text
i > j
```

Examples

Matrix Chain

```text
One matrix

No multiplication needed

Cost = 0
```

Palindrome

```text
Single character

Already palindrome

Cuts = 0
```

Burst Balloons

```text
No balloons

Coins = 0
```

---

# 4. The Partition Idea

For every interval

```text
(i.............j)
```

try every possible split

```text
i   k   j
```

```text
(i.....k)

(k+1.....j)
```

Every partition produces

```text
Left answer

+

Right answer

+

Current partition cost
```

Then choose the optimum.

---

# 5. Generic Recurrence

For every

```text
k = i → j-1
```

compute

```text
Answer from left interval

+

Answer from right interval

+

Cost of making this partition
```

Finally

```text
Take

Minimum

or

Maximum

depending on problem.
```

---

# 6. Think Like This

Never think

> "I'm solving the whole problem."

Instead think

> "Suppose I split here."

Then ask

### What happens on left?

Solve recursively.

### What happens on right?

Solve recursively.

### What remains?

Combine both answers.

That combine cost is usually given in the problem.

---

# 7. Matrix Chain Multiplication

Interval

```text
Ai.....Aj
```

Suppose split at

```text
k
```

Now

```text
Ai.....Ak

Ak+1.....Aj
```

Need

* Left multiplication cost
* Right multiplication cost
* Final multiplication of both resulting matrices

Choose minimum over all

```text
k
```

---

# 8. Common Thinking Pattern

Every Partition DP follows

```text
For every possible partition

↓

Solve Left

↓

Solve Right

↓

Merge/Combine

↓

Keep Best Answer
```

---

# 9. Complexity

If

```text
State = (i,j)
```

then

Number of states

```text
O(n²)
```

For each state

```text
Try every k

O(n)
```

Overall

```text
O(n³)
```

Most partition DP problems have this complexity.

---

# 10. How to Recognize in an Interview

Ask yourself these three questions:

### Q1. Is the problem asking to split an interval?

If yes

↓

### Q2. Does every split create two independent subproblems?

If yes

↓

### Q3. Am I checking every possible split?

If yes

↓

**It is Partition DP.**

---

# 11. General Mental Formula

```text
Choose a partition

↓

Solve Left

↓

Solve Right

↓

Pay the cost of combining them

↓

Repeat for every partition

↓

Return the Best (Min/Max)
```

---

# 12. Classic Problems to Practice (Easy → Hard)

1. Matrix Chain Multiplication (Foundation)
2. Minimum Cost to Cut a Stick
3. Burst Balloons
4. Palindrome Partitioning II
5. Boolean Parenthesization
6. Evaluate Expression to True
7. Optimal Binary Search Tree

---

## One-Line Summary

> **Partition DP is all about solving an interval by trying every possible partition, recursively solving the left and right intervals, adding the cost of combining them, and keeping the optimal result.**



## Recursion

```
class Solution {
    static int matrixMultiplication(int arr[]) {
        int[][] dp = new int[arr.length][arr.length];
        // code here
        
        for(int[] a: dp) Arrays.fill(a, -1);
        return partition(1, arr.length-1, arr, dp);
    }
    
    private static int partition(int i, int j, int[] arr, int[][] dp){
        
        if(i==j){
            return 0;
        }
        
        if(dp[i][j] != -1) return dp[i][j];
        
        // (i-1, k) (k+1, j)
        int minSteps = Integer.MAX_VALUE;
        
        for(int k=i; k<j; k++){
            
            int currentSteps = arr[i-1]*arr[k]*arr[j];
            currentSteps += partition(i, k, arr, dp) + partition(k+1, j, arr, dp);
            
            minSteps = Math.min(currentSteps, minSteps);
        }
        
        return dp[i][j] = minSteps;
    }
}
```
# DP

Actually, **`j` is not starting in reverse** in your code.

The loop is:

```java
for (int i = arr.length - 1; i >= 1; i--) {

    for (int j = i + 1; j < arr.length; j++) {
        ...
    }
}
```

* `i` goes **backwards**.
* `j` goes **forwards**.

The reason **`i` goes backwards** is because of the dependencies in the DP.

---

## Dependency of `dp[i][j]`

To compute

```text
dp[i][j]
```

you need

```text
dp[i][k]
dp[k+1][j]
```

where

```text
i ≤ k < j
```

Notice the second dependency:

```text
dp[k+1][j]
```

Its row index (`k+1`) is **greater than `i`**.

Example:

Suppose

```text
dp[2][5]
```

needs

```text
dp[2][2]
dp[3][5]

dp[2][3]
dp[4][5]

dp[2][4]
dp[5][5]
```

To calculate `dp[2][5]`, the values

```text
dp[3][5]
dp[4][5]
dp[5][5]
```

must already exist.

That means **rows 3, 4, and 5 must be computed before row 2**.

Hence we iterate

```text
i = n-1 → 1
```

---

## Why does `j` start from `i+1`?

When

```text
i == j
```

there is only one matrix.

Its cost is

```text
0
```

which you've already initialized:

```java
dp[i][i] = 0;
```

So the first interval that actually needs computation is

```text
(i, i+1)
```

(two matrices).

Hence

```java
for (int j = i + 1; j < n; j++)
```

---

## Visualizing the DP table

Suppose `n = 5`.

```
      j
      0   1   2   3   4
i
0     -
1         0   ?   ?   ?
2             0   ?   ?
3                 0   ?
4                     0
```

We fill the upper triangle.

Order of filling:

```
i = 4

      0
```

↓

```
i = 3

      0  ?
```

↓

```
i = 2

      0  ?  ?
```

↓

```
i = 1

      0  ?  ?  ?
```

When computing `dp[1][4]`, values like `dp[2][4]` and `dp[3][4]` are already available because those rows were filled earlier.

---

### Rule to remember

For interval DP:

* If the recurrence depends on **larger starting indices** (e.g., `dp[k+1][j]`), iterate **`i` backwards**.
* If the recurrence depends on **smaller ending indices** (e.g., `dp[i][k]`), iterate **`j` forwards**.

This ordering guarantees that every subproblem needed to compute `dp[i][j]` has already been solved.

```
class Solution {
    static int matrixMultiplication(int arr[]) {
        // code here
        int n = arr.length;
        
        int[][] dp = new int[n][n];
        
        for(int i=1; i<n; i++) dp[i][i] = 0;
        
        for(int i=arr.length-1; i>=1; i--){
            
            for(int j=i+1; j<n; j++){
                
                int min = Integer.MAX_VALUE;
                
                for(int k=i; k<j; k++){
                    
                    int steps = arr[i-1]*arr[j]*arr[k] + dp[i][k] + dp[k+1][j];
                    
                    if(steps < min) min = steps;
                }
                
                dp[i][j] = min;
            }
        }
        
        return dp[1][n-1];
    }
}
```



