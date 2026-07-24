// Largest path between two nodes.
// Path does not need to be pass via root.

// Longest path passing from any node will be the sum of left height and right height.

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
    public int diameterOfBinaryTree(TreeNode root) {
        int[] diameter = new int[1];
        findDiameter(root, diameter);
        return diameter[0];
    }

    private int findDiameter(TreeNode root, int[] diameter){

        if(root == null) return 0;

        int lh = findDiameter(root.left, diameter);
        int rh = findDiameter(root.right, diameter);

        diameter[0] = Math.max(diameter[0], lh+rh);
        return 1 + Math.max(lh, rh);
    }
}
```
