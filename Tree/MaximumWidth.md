//width: No Of possible nodes between any 2 nodes 

<img width="1131" height="736" alt="image" src="https://github.com/user-attachments/assets/d481d0d3-6cae-419b-bdd5-ab57cf7307e5" />
<img width="1015" height="537" alt="image" src="https://github.com/user-attachments/assets/fd01f526-ef79-463c-b9a1-caebd11d651a" />

#### index the node first
<img width="1147" height="672" alt="image" src="https://github.com/user-attachments/assets/e34f1467-1a91-4acd-9cd8-9f29f6c93161" />


#### Cons
Overflow

#### Solution:

<img width="1102" height="568" alt="image" src="https://github.com/user-attachments/assets/95b71b91-5579-494c-a423-160156533685" />

The Maximum Width of Binary Tree problem (LeetCode 662) is one of those questions where the trick is not about counting nodes, but about preserving their positions as if the tree were a complete binary tree.

Width is the distance between the leftmost and rightmost non-null nodes including all null positions between them.

This is one of the most **important BFS problems** because it teaches you a technique that appears in many tree problems: **assigning virtual indices to nodes**.

Let's understand it as if you're seeing the problem for the first time.

---

# Problem Statement

Given a binary tree, return the **maximum width** among all levels.

The confusing part is the definition of **width**.

It is **NOT**:

> Number of nodes in a level.

It is:

> The distance between the leftmost and rightmost non-null nodes **including all null positions between them**.

---

# Step 1: What is Width?

Consider this tree.

```text
        1
      /   \
     2     3
```

Level 0

```text
1
```

Width = 1

Level 1

```text
2   3
```

Width = 2

Easy.

---

Now look at this.

```text
        1
      /   \
     2     3
    /
   4
```

Many beginners think

```text
Level 2

4
```

Width = 1

Wrong.

Why?

---

## Imagine the Complete Binary Tree

Every binary tree can be imagined inside a complete binary tree.

```
                 1
             /       \
           2           3
         /   \       /   \
       4      N     N     N
```

There are actually four positions on level 2.

```
Position:

4   N   N   N
```

The leftmost node is at position 0.

The rightmost node is also at position 0.

Width = 1.

Still correct.

---

Now look carefully.

```
            1
         /     \
        2       3
       /         \
      4           7
```

Now the complete tree becomes

```
                 1
             /       \
           2           3
         /   \       /   \
       4      N     N      7
```

Level 2

```
4   N   N   7
```

How many positions?

```
4
```

Even though there are only two nodes.

Therefore

```
Width = 4
```

This is exactly why counting nodes is wrong.

---

# Step 2: How can we know these positions?

We assign every node an **index**.

Exactly like a Binary Heap.

Suppose root starts from index **0**.

```
               0
            /      \
           1        2
         /  \     /   \
        3    4   5     6
```

The formulas become

```
Left Child

2*i + 1
```

```
Right Child

2*i + 2
```

---

Let's assign indices.

```
          1(0)
        /      \
     2(1)      3(2)
    /            \
 4(3)            7(6)
```

Notice

Node 4 gets index **3**

Node 7 gets index **6**

---

# Step 3: How do we calculate width?

Suppose one level contains

```
(4,3)

(7,6)
```

The leftmost node is at index

```
3
```

The rightmost node is at

```
6
```

Between them there are

```
3
4
5
6
```

Total positions

```
6 - 3 + 1

= 4
```

Hence

```
Width = LastIndex - FirstIndex + 1
```

This is the entire trick of the problem.

---

# Step 4: Why BFS?

Width is defined **for each level**.

BFS naturally processes

```
Level 0

↓

Level 1

↓

Level 2

↓

Level 3
```

At every iteration,

the queue contains **exactly one level**.

So we can easily know

```
First index

Last index
```

of that level.

---

# Step 5: Dry Run

```
            1
          /   \
         2     3
        /       \
       4         7
```

Initially

Queue

```
(1,0)
```

Answer

```
1
```

---

## Level 0

Queue

```
(1,0)
```

First Index

```
0
```

Last Index

```
0
```

Width

```
0-0+1

=1
```

Children

```
Left

2*0+1

=1
```

```
Right

2*0+2

=2
```

Queue

```
(2,1)

(3,2)
```

---

## Level 1

Queue

```
(2,1)

(3,2)
```

First

```
1
```

Last

```
2
```

Width

```
2-1+1

=2
```

Children

```
4

index

2*1+1

=3
```

```
7

index

2*2+2

=6
```

Queue

```
(4,3)

(7,6)
```

---

## Level 2

Queue

```
(4,3)

(7,6)
```

Width

```
6-3+1

=4
```

Maximum becomes

```
4
```

Done.

---

# Step 6: Overflow Problem

Suppose the tree is

```
1
 \
  2
   \
    3
     \
      4
       \
        5
```

Indices become

```
0

2

6

14

30

62

126

254

...
```

After many levels

```
2^100
```

Even a `long` can overflow for very deep trees.

---

# Step 7: Striver's Normalization Trick

Suppose one level has indices

```
100

101

102
```

Subtract the first index of the level.

```
100-100=0

101-100=1

102-100=2
```

Now use

```
0

1

2
```

instead.

Children become

```
1

2

3

4
```

instead of

```
201

202

205

206
```

Huge difference.

---

### Why does it still work?

Original width

```
102-100+1

=3
```

Normalized

```
2-0+1

=3
```

Subtracting the same number from both ends never changes their distance.

So the width remains correct while keeping indices small.

---

# Algorithm

1. If the tree is empty, return `0`.
2. Perform BFS using a queue of `(node, index)`.
3. For each level:

   * Store the first index as `minIndex`.
   * Normalize every index by subtracting `minIndex`.
   * Record the first normalized index and the last normalized index.
   * Enqueue the left child with index `2 * curr + 1`.
   * Enqueue the right child with index `2 * curr + 2`.
   * Update the answer with `last - first + 1`.
4. Return the maximum width.

```
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int widthOfBinaryTree(TreeNode root) {
        int sum = 0;
        Queue<Pair> queue = new LinkedList<>();
        queue.offer(new Pair(root, 0));

        while(!queue.isEmpty()){
            int size = queue.size();
            long minIndex = queue.peek().index;
            long first = 0, last = 0;
            for(int i=0; i<size; i++){
                Pair current = queue.poll();

                long currIndex = current.index - minIndex;

                if(i == 0){
                    first = currIndex;
                }
                if(i == size-1){
                    last = currIndex;
                }

                TreeNode node = current.node;

                if(node.left != null){
                    queue.offer(new Pair(node.left, 2*currIndex+1));
                }

                if(node.right != null){
                    queue.offer(new Pair(node.right, 2*currIndex+2));
                }
                  
            }
            sum = Math.max(sum, (int) (last-first+1));
        }
        return sum;
    }
     class Pair {
        TreeNode node;
        long index;
      
        public Pair(TreeNode root, long index){
            this.node = root;
            this.index = index;

        }
    }
}
```
