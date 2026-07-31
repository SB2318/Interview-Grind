
> **Instead of checking whether a queen can be placed by scanning the board every time (`O(n)`), we maintain three arrays so that the validity check becomes `O(1)`.**

Let's build the intuition step by step.

---

# Step 1: The Rule of N-Queens

A queen attacks in:

* Same row
* Same column
* Upper-left diagonal
* Lower-left diagonal

Example:

```text
. . . Q .
. . / | \
. /  |  \
Q----Q---Q
. \  |  /
. . \|/
```

---

# Step 2: Why do we only recurse column by column?

Notice:

```java
solve(col + 1, ...)
```

We are placing **exactly one queen per column**.

Example for `n = 4`:

```text
Column

0
1
2
3
```

We first fill column 0, then column 1, then column 2...

Since we never revisit a previous column, there can never be two queens in the same column.

So we **don't need to track columns**.

The only conflicts left are:

* Row
* Upper diagonal
* Lower diagonal

---

# Step 3: What does `leftRow[]` do?

```java
int[] leftRow = new int[n];
```

Suppose

```text
n = 4
```

Rows are

```text
0
1
2
3
```

Initially

```text
leftRow

0 0 0 0
```

Means

```text
No row has a queen.
```

Suppose we place

```text
(row=2,col=0)
```

Now

```text
leftRow

0 0 1 0
```

Meaning

```text
Row 2 already contains a queen.
```

Checking a row becomes

```java
leftRow[row] == 0
```

which is **O(1)**.

---

# Step 4: Lower Diagonal

The trick is

```java
row + col
```

Let's see why.

Take a 4×4 board.

```text
      c0 c1 c2 c3

r0     0  1  2  3

r1     1  2  3  4

r2     2  3  4  5

r3     3  4  5  6
```

These numbers are simply

```text
row + col
```

Notice something:

Every cell on the same **↘ (top-left to bottom-right)** diagonal has the same value.

Example

```text
(0,1)

↓

(1,2)

↓

(2,3)
```

Values

```text
1
3
5
```

Different diagonal.

Now

```text
(0,0)
(1,1)
(2,2)
(3,3)
```

All have

```text
row+col

0
2
4
6
```

Wait—that's actually the main diagonal progression; the important property is:

Examples of equal `row+col`:

```text
(0,2)
(1,1)
(2,0)
```

```text
2
2
2
```

These lie on the same **↙ (top-right to bottom-left)** diagonal.

So

```java
lowerDiagonal[row+col]
```

uniquely identifies one diagonal.

Maximum value?

```text
row=n-1

col=n-1

(n-1)+(n-1)

2n-2
```

Need size

```text
2n-1
```

Hence

```java
int[] lowerDiagonal = new int[2*n-1];
```

---

# Step 5: Upper Diagonal

Now the other diagonal.

Observe

```text
row-col
```

For

```text
(0,0)

(1,1)

(2,2)
```

Values

```text
0

0

0
```

Same diagonal.

Another example

```text
(1,0)

(2,1)

(3,2)
```

Values

```text
1

1

1
```

Again same diagonal.

Problem:

```text
row-col
```

can become negative.

Example

```text
(0,3)

0-3=-3
```

Array indices cannot be negative.

So shift everything by

```text
n-1
```

Formula

```java
n-1+col-row
```

This is equivalent to

```text
(n-1) - (row-col)
```

and produces the same unique index.

For `n = 4`:

```text
Index = 3 + col - row
```

Examples:

```text
(0,0)

3+0-0=3
```

```text
(1,1)

3+1-1=3
```

```text
(2,2)

3+2-2=3
```

Same index.

Hence

```java
upperDiagonal[n-1+col-row]
```

---

# Step 6: Placing a Queen

Suppose we place

```text
(row=2,col=1)
```

Board

```text
. . . .

. . . .

. Q . .

. . . .
```

Update

```java
board[row][col]='Q';

leftRow[row]=1;

lowerDiagonal[row+col]=1;

upperDiagonal[n-1+col-row]=1;
```

Meaning

```text
Row occupied

Lower diagonal occupied

Upper diagonal occupied
```

---

# Step 7: Recursive Call

```java
solve(col+1,...)
```

Move to the next column.

---

# Step 8: Backtracking

After returning,

Undo everything.

```java
board[row][col]='.';

leftRow[row]=0;

lowerDiagonal[row+col]=0;

upperDiagonal[n-1+col-row]=0;
```

This restores the board to exactly the previous state so that the next row in the same column can be tried.

---

# Why is the `if` condition enough?

```java
if (leftRow[row] == 0 &&
    lowerDiagonal[row + col] == 0 &&
    upperDiagonal[n - 1 + col - row] == 0)
```

This single condition checks all possible attacks:

* ✅ Same row?
* ✅ Same ↙ diagonal (`row + col`)?
* ✅ Same ↘ diagonal (`col - row` shifted)?

Since there is exactly one queen per recursive column, **same-column attacks are impossible**.

So the placement is safe.

---

# Complete Flow

```text
Column 0
   │
   ▼
Try every row
   │
   ▼
Safe?
   │
 ┌─┴───────────┐
 │             │
No            Yes
 │             │
Skip      Place Queen
               │
               ▼
      Mark row & diagonals
               │
               ▼
     Recurse to next column
               │
               ▼
        Backtrack (undo)
               │
               ▼
        Try next row
```

---

# Time Complexity

There are `n!` possible ways of choosing one row per column in the worst case, and each placement check is **O(1)** because of the three helper arrays.

* **Time:** `O(n!)` (with constant-time safety checks)
* **Space:** `O(n²)` for the board + `O(n)` recursion stack + `O(n)` for the helper arrays.

### The key optimization to remember

The whole optimization comes down to replacing the naive safety check:

```java
isSafe(row, col)   
```

with

```java
leftRow[row] == 0 &&
lowerDiagonal[row + col] == 0 &&
upperDiagonal[n - 1 + col - row] == 0
```

which makes every safety check **O(1)** and is why this solution is much faster than scanning rows and diagonals every time.


```
class Solution {
    public List<List<String>> solveNQueens(int n) {

        List<List<String>> res = new ArrayList<>();
        char[][] board = new char[n][n];


        for (char[] row : board) Arrays.fill(row, '.');
        int[] leftRow = new int[n];

        int[] lowerDiagonal = new int[2 * n - 1];
        int[] upperDiagonal = new int[2 * n - 1];
        
        solve(0, board, n, leftRow, upperDiagonal, lowerDiagonal, res);
        return res;
    }

    public void solve(
        int col, char[][] board, 
        int n,
        int[] leftRow, 
        int[] upperDiagonal, 
        int[] lowerDiagonal,
        List<List<String>> res){

          if(col == n){
             List<String> temp = new ArrayList<>();
             for (int i = 0; i < n; i++) {
                temp.add(new String(board[i]));
            }
            res.add(temp);
            return;
          }

          for(int row=0; row<n; row++){
            if (leftRow[row] == 0 && lowerDiagonal[row + col] == 0 &&
                upperDiagonal[n - 1 + col - row] == 0) {

                board[row][col] = 'Q';
                leftRow[row] = 1;
                lowerDiagonal[row + col] = 1;
                upperDiagonal[n - 1 + col - row] = 1;

                solve(col + 1, board, n, leftRow, upperDiagonal, lowerDiagonal, res);

                board[row][col] = '.';
                leftRow[row] = 0;
                lowerDiagonal[row + col] = 0;
                upperDiagonal[n - 1 + col - row] = 0;
            }
          }
        }
}
```
