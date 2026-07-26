// Binary Tree To LinkedList

## Reverse PostOrder

// Assign the prev node to right
// make other node (left) null

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
    TreeNode prev = null;
    public void flatten(TreeNode root) {
        if(root == null) return;

        flatten(root.right);
        flatten(root.left);

        root.right = prev;
        root.left = null;
        prev = root;

    }
}
```

## Morris Traversal

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
    public void flatten(TreeNode root) {
        TreeNode prev = null;
        TreeNode curr = root;

        while(curr != null){
            
            if(curr.left != null){

                // Find rightmost
                prev = curr.left;

                while(prev.right != null) 
                  prev = prev.right;
                // connect with original subtree
                prev.right = curr.right;
                //move left subtree to right
                curr.right = curr.left;
                // make left subtree null
                curr.left = null;
            }else{
                curr = curr.right;
            }
        }
    }
}
```
