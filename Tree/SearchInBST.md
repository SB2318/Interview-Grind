
For a Binary Search Tree, Left is always smaller than node, and right is always greater than node.
L<N< R
Keep traversing until you reach null.
If any point node value is greater than target, update it with right node
If any point node value is less than target, update it with left node.

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
    public TreeNode searchBST(TreeNode root, int val) {
        
        
        while(root != null){
            if(root.val == val) return root;
            else if(root.val < val) root = root.right;
            else if(root.val > val) root = root.left;
        }

        return null;
    }
}
```
