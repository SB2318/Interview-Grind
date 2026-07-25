## Prerequisite

1. Maximum height
2. Maximum width

<img width="1167" height="522" alt="image" src="https://github.com/user-attachments/assets/69c20ded-89e8-49f7-a409-dbc7f53697ad" />

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
    public int maxPathSum(TreeNode root) {
        int[] max = new int[]{Integer.MIN_VALUE};
        //max[0] = Integer.MIN_VALUE;
        find(root, max);
        return max[0];
    }

    private int find(TreeNode root, int[] max){
        if(root == null){
            return 0;
        }

        int maxL = Math.max(0, find(root.left, max));
        int maxR = Math.max(0, find(root.right, max));

        max[0] = Math.max(max[0], root.val + maxL + maxR);

        return root.val + Math.max(maxL, maxR);
    }
}
