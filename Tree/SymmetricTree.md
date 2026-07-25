
// It forms a mirror of itself around the center

<img width="1283" height="727" alt="image" src="https://github.com/user-attachments/assets/9457a03f-2fd0-49d5-8acc-cf04241ec962" />

It forms a mirror of itself, over the center or not.

<img width="1357" height="745" alt="image" src="https://github.com/user-attachments/assets/354acd6f-4eb1-46a4-b0da-08de7ebd7ed7" />

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
