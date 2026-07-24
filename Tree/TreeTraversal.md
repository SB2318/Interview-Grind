## Inorder Traversal
// Left Root Tree
<img width="965" height="602" alt="image" src="https://github.com/user-attachments/assets/52365d64-e285-4a6a-925e-e50ec80875b4" />

// Recursion way
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
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        inorder(root, ans);
        return ans;
    }

    private void inorder(TreeNode root, List<Integer> ans){
       // This is the place where we process root, no need to process root separately
        if(root == null) return;
        inorder(root.left, ans);
        ans.add(root.val);
      //  inorder(root, ans);
        inorder(root.right, ans);
    }
}
```

//Iteration way
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
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> inorder = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode node = root;

        while(true){
            
          if(node != null){
            // you don't proces it yet
            stack.add(node); // Last In first out
            node = node.left;
          }else{
             // You already process the current node
             // Check there are any node left from stack, (last in first out)
             if(!stack.isEmpty()){
                  node = stack.pop();
                  inorder.add(node.val);
                  node = node.right;
             }else{
                // no node left to process
                break;
             }
          }
        }

        return inorder;
    }
}

##  Pre Order Traversal
// Root, Left, Right

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
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> inorder = new ArrayList<>();
        inorder(root, inorder);
        return inorder;
    }

    private void inorder(TreeNode root, List<Integer> inorder){

        if(root == null) return;
        inorder(root.left, inorder);
        inorder.add(root.val);
        inorder(root.right, inorder);
    }
}
```

## Postorder Traversal
// Left, Right, Root

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
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        postorder(root, ans);
        return ans;
    }

    private void postorder(TreeNode root, List<Integer> ans){

         if(root == null) return;
         postorder(root.left, ans);
         postorder(root.right, ans);
         ans.add(root.val);
    }
}
```
All the above traversal technique takes O(N) time and O(N) space for both in preorder and inorder


##  Morris Inorder Traversal

- Takes O(N) time and space O(1) (No extra space)
- Use the concept of Threaded Binary Tree

<img width="1255" height="638" alt="image" src="https://github.com/user-attachments/assets/8a1541b5-88e5-43a4-903e-60664e89c23e" />

// Concept Inorder (Left, Root, Tree)

// Take a TreeNode named curr = root.

// Traverse while curr != null.

// Case 1:
// If curr.left == null:
//     Visit (print/store) curr.(no root.left left, visit root)
//     Move curr = curr.right.

// Case 2:
// Otherwise:
//     Find the rightmost node in curr's left subtree.
//     (This node is called the inorder predecessor.)

//     If predecessor.right == null:
//         Create a thread:
//         predecessor.right = curr.
//         Move curr = curr.left.

//     Else (predecessor.right == curr):
//         The thread already exists, which means
//         the left subtree has been completely visited.
//
//         Remove the thread:
//         predecessor.right = null.
//
//         Visit (print/store) curr.
//         Move curr = curr.right.

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
    public List<Integer> inorderTraversal(TreeNode root) {
        // Morris Traversal Inorder , Left Root Right
        List<Integer> ans = new ArrayList<>();
        TreeNode curr = root;

        while(curr != null){

            if(curr.left == null){

                // left is already visited
                ans.add(curr.val);
                curr = curr.right;
            }else{
                // Store the left pointer
                TreeNode right = curr.left;
                // Find the rightmost leaf node, predecessor
                while(right.right != null && right.right != curr){
                    right = right.right;
                }
                // Two cases, right.right is null, left is not visited yet
                if(right.right == null){
                    // create a thread, store the subtree root (curr) pointer
                    right.right = curr;
                    // go to more left
                    curr = curr.left;
                }else{
                    // left subtree already visited, store it to ans
                    // break the previous thread
                    right.right = null;
                    ans.add(curr.val);
                    // move curr to right
                    curr = curr.right;
                }
            }
        }

        return ans;
    }
}
```
## Morris Preorder Traversal
// Concept (Root, Left, Right)

// Take a TreeNode named curr = root.

// Traverse while curr != null.

// Case 1:
// If curr.left == null:
//     Visit (print/store) curr. (print root, before going left, preorder)
//     Move curr = curr.left.

// Case 2:
// Otherwise:
//     Find the rightmost node in curr's left subtree.
//     (This node is called the inorder predecessor.)

//     If predecessor.right == null:
//         Create a thread:
//         predecessor.right = curr.
 //        Visit (print/store) curr. (print root, before going left, preorder)
//         Move curr = curr.left.

//     Else (predecessor.right == curr):
//         The thread already exists, which means
//         the left subtree has been completely visited.
//       
//         Remove the thread:
//         predecessor.right = null.
//         Move curr = curr.right.

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
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        TreeNode curr = root;

        while(curr != null){

              if(curr.left == null){
                 ans.add(curr.val);
                 curr = curr.right;
              }else{

                  TreeNode prev = curr.left;
                  while(prev.right != null && prev.right != curr){
                       prev = prev.right;
                  }

                  if(prev.right == null){
                       prev.right = curr;
                       ans.add(curr.val);
                       curr = curr.left;
                  }else{
                    prev.right = null;
                    curr = curr.right;
                  }
              }
        }

        return ans;
    }
}
```

## Vertical order Traversal

# Vertical Order Traversal of a Binary Tree (BFS + TreeMap + PriorityQueue)

## Intuition

The problem asks us to print the binary tree **column by column**.

If multiple nodes belong to the:

- **same column** → print them from **top to bottom**.
- **same row and same column** → print them in **ascending order of their values**.

To satisfy all these conditions simultaneously, we use:

- **BFS** → visits nodes level by level (top to bottom).
- **TreeMap** → automatically keeps columns and rows sorted.
- **PriorityQueue** → sorts nodes having the same `(row, column)`.

---

# Coordinate System

Assume the root starts at:

```
(row = 0, col = 0)
```

For every node,

```
Left Child
row = row - 1
col = col + 1

Right Child
row = row + 1
col = col + 1
```

Example

```
        3
       / \
      9   20
         /  \
        15   7
```

Coordinates become

```
        (0,0)
          3

(-1,1)9      20(1,1)

        15(0,2)     7(2,2)
```

Notice

- Horizontal movement changes the **row**.
- Vertical movement changes the **column**.

---

# What does the Tuple store?

```java
class Touple{
    TreeNode root;
    int row;
    int col;
}
```

Every queue element stores three things:

| Variable | Meaning |
|----------|---------|
| root | Current TreeNode |
| row | Horizontal position (column index) |
| col | Vertical level (depth) |

Example

```
Queue

(Node 3, row=0, col=0)

↓

(Node 9, row=-1, col=1)

(Node 20, row=1, col=1)

↓

(Node 15, row=0, col=2)

(Node 7, row=2, col=2)
```

Without storing these coordinates we would never know where each node belongs.

---

# Understanding the TreeMap

Our data structure is

```java
TreeMap<Integer,
        TreeMap<Integer,
                PriorityQueue<Integer>>> map;
```

Think of it as

```
Column
   ↓
TreeMap<
    column,

        TreeMap<
            row,

            PriorityQueue<
                node values
            >
        >
>
```

or

```
Column
   ↓
Row
   ↓
Sorted Node Values
```

---

## Outer TreeMap

```java
TreeMap<Integer, ...>
```

Key = Horizontal position

```
-2
-1
 0
 1
 2
```

TreeMap automatically stores them as

```
-2
-1
0
1
2
```

Therefore we never need to sort columns manually.

---

## Inner TreeMap

```java
TreeMap<Integer, PriorityQueue<Integer>>
```

Inside one column,

```
Column = 0

Row 0
Row 2
Row 4
```

Again TreeMap automatically keeps rows ordered from top to bottom.

---

## PriorityQueue

Suppose two nodes reach exactly the same position.

Example

```
      1
     / \
    2   3
     \ /
      4 5
```

Both

```
4
5
```

are located at

```
(row=0,col=2)
```

According to the problem,

```
4
5
```

must appear in ascending order.

PriorityQueue automatically gives

```
4
5
```

even if

```
5
```

was inserted first.

---

# How the TreeMap looks

Suppose we have

```
        3
       / \
      9   20
         / \
        15  7
```

After BFS finishes,

```
map

-1
 |
 +--1
     |
     +--[9]

0
 |
 +--0
 |   |
 |   +--[3]
 |
 +--2
     |
     +--[15]

1
 |
 +--1
     |
     +--[20]

2
 |
 +--2
     |
     +--[7]
```

This means

```
Column -1
    Row 1
       9

Column 0
    Row 0
       3

    Row 2
       15

Column 1
    Row 1
       20

Column 2
    Row 2
       7
```

---

# BFS Algorithm

Initially

```
Queue

(root,0,0)
```

While queue is not empty

```
Remove front node

Store it inside TreeMap

Insert left child

Insert right child
```

The coordinates change as

```
Left

(row-1,col+1)

Right

(row+1,col+1)
```

---

# What happens during insertion?

Suppose we remove

```
15

(row=0,col=2)
```

We execute

```java
map.putIfAbsent(0, new TreeMap<>());

map.get(0).putIfAbsent(2, new PriorityQueue<>());

map.get(0).get(2).offer(15);
```

Now

```
Column 0

↓

Row 2

↓

PriorityQueue

15
```

---

# Building the Answer

The TreeMap is already sorted.

We simply traverse

```
Every Column

↓

Every Row

↓

Every PriorityQueue
```

Pseudo code

```text
for every column

    create new list

    for every row

        while priority queue is not empty

            remove smallest node

            add into list

    add list into answer
```

---

# What does the algorithm actually return?

The function returns

```java
List<List<Integer>>
```

Each inner list represents **one vertical column**.

Example

```
        3
       / \
      9   20
         / \
        15  7
```

Output

```
[
 [9],
 [3,15],
 [20],
 [7]
]
```

Meaning

```
Column -1

9

Column 0

3
15

Column 1

20

Column 2

7
```

---

# Time Complexity

Each node is inserted once.

For every insertion

- TreeMap insertion = **O(log N)**
- Inner TreeMap insertion = **O(log N)**
- PriorityQueue insertion = **O(log N)**

Overall

```
O(N log N)
```

---

# Space Complexity

The queue, TreeMap, and PriorityQueues together store every node exactly once.

```
O(N)
```

---

# Key Takeaways

- **Tuple** stores the current node and its coordinates `(row, col)`. (row represents level also)
- **BFS** guarantees nodes are visited level by level.
- **Outer TreeMap** keeps columns sorted from left to right.
- **Inner TreeMap** keeps rows sorted from top to bottom.
- **PriorityQueue** sorts nodes that share the same row and column.
- The final traversal of the nested TreeMap directly produces the required vertical order traversal without any additional sorting.

<img width="960" height="667" alt="image" src="https://github.com/user-attachments/assets/79622ea3-6a00-486a-9cd2-45379207cbaa" />

If there are any overlapping node, take smaller value first.

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
    public List<List<Integer>> verticalTraversal(TreeNode root) {

        TreeMap<Integer, TreeMap<Integer, PriorityQueue<Integer>>> map = new TreeMap<>();
        List<List<Integer>> ans = new ArrayList<>();
        Queue<Touple> queue = new LinkedList<>();

        queue.offer(new Touple(root, 0, 0));

        while(!queue.isEmpty()){
            Touple touple = queue.poll();
            TreeNode node = touple.root;
            int x = touple.row;
            int y = touple.col;

            if(!map.containsKey(x)){
                map.put(x, new TreeMap<>());
            }
            if(!map.get(x).containsKey(y)){
                map.get(x).put(y, new PriorityQueue<Integer>());
            }

            map.get(x).get(y).offer(node.val); 

            if(node.left != null){
                queue.offer(new Touple(node.left, x-1, y+1));
            }
            if(node.right != null){
                queue.offer(new Touple(node.right, x+1, y+1));
            }
        }

        for(TreeMap<Integer, PriorityQueue<Integer>> child: map.values()){
              List<Integer> list = new ArrayList<>();
              for(PriorityQueue<Integer> pq: child.values()){
                  while(!pq.isEmpty()){
                     list.add(pq.poll());
                  }
                  
            }
            ans.add(list);
        }
        return ans;
    }

    class Touple{
        TreeNode root;
        int row, col;

        public Touple(TreeNode root, int row, int col){
            this.root = root;
            this.row = row;
            this.col = col;
        }
    }
}
```
