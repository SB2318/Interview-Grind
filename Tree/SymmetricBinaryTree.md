
<img width="1223" height="633" alt="image" src="https://github.com/user-attachments/assets/d6c2c8a4-7417-4286-ac43-f5aba96dffcf" />

Our task is to match  every left node from left side with every right node from right side, and every right node from left side
with every left node from right side.

If they are match, symmetrical.
If they are not match, not symmetrical.

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
    public boolean isSymmetric(TreeNode root) {
        
        return root == null || checkSymmetry(root.left, root.right);
    }

    private boolean checkSymmetry(TreeNode node1, TreeNode node2){

         if(node1 == null || node2 == null) return node1 == node2;

         if(node1.val != node2.val) return false;

         return checkSymmetry(node1.left, node2.right)
                && checkSymmetry(node1.right, node2.left);
    }
}
```
