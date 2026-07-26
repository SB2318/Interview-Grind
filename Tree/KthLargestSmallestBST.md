
## Kth Smallest

> Solution: Inorder (Left Root Right)

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
    public int kthSmallest(TreeNode root, int k) {
       int[] ans = new int[] {0, -1};
      // ans[0] -> storing the occurence of number, not level
       inorder(root, ans, k);
       return ans[1];
    }

    private void inorder(TreeNode root, int[] ans, int k){

        if(root == null) return;
        if(ans[1] != -1) return;

        inorder(root.left, ans, k);

        ans[0]++;
        if(ans[0] == k){
            ans[1] = root.val;
            return;
        }

        inorder(root.right, ans, k);
    }
}
```

## Kth LARGEST

> Reverse Inorder Right Root Left

```
/* Structure of a Binary Tree Node
class Node {
    public int data;
    public Node left;
    public Node right;

    public Node(int val) {
        data = val;
        left = right = null;
    }
};*/

class Solution {
    public int kthLargest(Node root, int k) {
        // code here
        int[] ans = new int[] {0, -1};
        
        reverseInorder(root, ans, k);
        
        return ans[1];
    }
    
    private void reverseInorder(Node root, int[] ans, int k){
         
         if(root == null) return;
         if(ans[1] != -1) return;
         
         reverseInorder(root.right, ans, k);
         ans[0]++;
         
         if(ans[0] == k){
             ans[1] = root.data;
             return;
         }
         
         reverseInorder(root.left, ans, k);
    }
}
```
