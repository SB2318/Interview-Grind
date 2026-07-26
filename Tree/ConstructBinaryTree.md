
<img width="927" height="556" alt="image" src="https://github.com/user-attachments/assets/36165b6f-176f-4a44-99d1-2d719ebdcbb9" />

Inorder : Left Root Right
Preorder : Root Left Right

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
    public TreeNode buildTree(int[] preorder, int[] inorder) {
        Map<Integer, Integer> map = new HashMap<>();

        for(int i=0; i<inorder.length; i++)
          map.put(inorder[i], i);
        
        TreeNode root = buildBinaryTree(inorder, 0, inorder.length-1,
         preorder, 0, preorder.length-1, map);
        
        return root;
    }

     private TreeNode buildBinaryTree(int[] inorder, int inStart, int inEnd, 
    int[] preorder, int prestart, int preend, Map<Integer, Integer> map){

        if(inStart > inEnd || prestart > preend) return null;

        // First value of preorder array is the root of our binary tree
        
        TreeNode root = new TreeNode(preorder[prestart]);
        int inRoot = map.get(root.val);
        int numsleft = inRoot- inStart;

        root.left = buildBinaryTree(inorder, inStart,inRoot-1, 
        preorder, prestart+1, prestart+numsleft, map );

        root.right = buildBinaryTree(inorder, inRoot+1, inEnd, 
        preorder,prestart+numsleft+1, preend, map);

        return root;
        
    }
}

```

<img width="1208" height="533" alt="image" src="https://github.com/user-attachments/assets/e544576e-5fb8-4c16-8416-6285cfb49251" />

Inorder : Left Root Right
Postorder: Left Right Root

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
    public TreeNode buildTree(int[] inorder, int[] postorder) {
        
       Map<Integer, Integer> map = new HashMap<>();
       for(int i=0; i<inorder.length; i++)
         map.put(inorder[i], i);

       TreeNode root = buildBinaryTree(inorder,0, inorder.length-1,
        postorder, 0, postorder.length-1, map);

       return root;
    }

    private TreeNode buildBinaryTree(int[] inorder, int inStart, int inEnd, 
    int[] postorder, int poststart, int postend, Map<Integer, Integer> map){

        if(inStart > inEnd || poststart > postend) return null;

        // Last value of postorder array is the root of our binary tree
        
        TreeNode root = new TreeNode(postorder[postend]);
        int inRoot = map.get(postorder[postend]);
        int numsleft = inRoot - inStart;

        root.left = buildBinaryTree(inorder, inStart,inRoot-1, 
        postorder, poststart, poststart+numsleft-1, map );

        root.right = buildBinaryTree(inorder, inRoot+1, inEnd, 
        postorder,poststart+numsleft, postend-1, map);

        return root;
        
    }
}
```

## Convert Sorted Array to Binary Search Tree (Construct Binary Search Tree from Inorder Traversal)

> Binary Tree Inorder always in sorted order.

If the problem simply says **"Construct Binary Tree from given keys"**, there are several interpretations. The most common interview version is:

> **Construct a Binary Search Tree (BST) from a list of keys.**

### Approach

Insert each key into the BST one by one.

For example:

```text
Keys: [4, 2, 7, 1, 3]
```

Construction:

```text
Insert 4
    4

Insert 2
    4
   /
  2

Insert 7
    4
   / \
  2   7

Insert 1
      4
     / \
    2   7
   /
  1

Insert 3
      4
     / \
    2   7
   / \
  1   3
```

### Java Solution

```java
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 * }
 */
class Solution {

    public TreeNode constructBST(int[] keys) {
        TreeNode root = null;

        for (int key : keys) {
            root = insert(root, key);
        }

        return root;
    }

    private TreeNode insert(TreeNode root, int key) {
        if (root == null) {
            return new TreeNode(key);
        }

        if (key < root.val) {
            root.left = insert(root.left, key);
        } else {
            root.right = insert(root.right, key);
        }

        return root;
    }
}
```

### Time Complexity

* Average: **O(n log n)**
* Worst case (sorted input): **O(n²)**

---

### If the keys are sorted

If the input is sorted, like:

```text
[1, 2, 3, 4, 5, 6, 7]
```

you should **not** insert one by one, because the tree becomes skewed.

Instead, choose the middle element recursively to build a balanced BST:

```text
        4
      /   \
     2     6
    / \   / \
   1  3  5  7
```

This runs in **O(n)** time.

---

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
    public TreeNode sortedArrayToBST(int[] nums) {
        TreeNode root = buildTree(nums, 0, nums.length-1);
        return root;
    }

    private TreeNode buildTree(int[] nums, int left, int right){

        if(left > right) return null;

        int mid = left + (right-left)/2;

        TreeNode root = new TreeNode(nums[mid]);
        root.left = buildTree(nums, left, mid-1);
        root.right = buildTree(nums, mid+1, right);

        return root;
    }
}
```

## Construct Binary Tree From Preorder Traversal

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
   
    public TreeNode bstFromPreorder(int[] preorder) {
        int[] level = new int[]{0};
        TreeNode root = buildTree(preorder, Integer.MAX_VALUE, level);
        return root;
    }

    private TreeNode buildTree(int[] preorder, int bound, int[] level){
        if(level[0] >= preorder.length || preorder[level[0]] > bound) return null;

        TreeNode node = new TreeNode(preorder[level[0]++]);
        
        
        node.left = buildTree(preorder, node.val, level);
        node.right = buildTree(preorder, bound, level);

        return node;
    }
}
```


