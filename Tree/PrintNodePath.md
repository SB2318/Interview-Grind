
Going down the tree → add the node to the path.
Coming back up → remove that node from the path.

// Backtracking

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
    public List<String> binaryTreePaths(TreeNode root) {
        List<String> ans = new ArrayList<>();
        StringBuilder sb = new StringBuilder();
        findPaths(root, ans, sb);
        return ans;
    }

    private void findPaths(TreeNode root, List<String> ans, StringBuilder sb){

        if(root == null) return;

        int len = sb.length();

        if(sb.length() == 0){
            sb.append(root.val +"");
        }else{
            sb.append("->"+root.val);
        }

        if(root.left == null && root.right == null){
            ans.add(sb.toString());
        }

        findPaths(root.left, ans, sb);
        findPaths(root.right, ans, sb);

        sb.setLength(len);
    }
}
```
