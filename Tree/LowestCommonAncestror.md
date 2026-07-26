
<img width="976" height="646" alt="image" src="https://github.com/user-attachments/assets/fd6332b5-c299-408d-b6d4-ddbe31203300" />

```
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */
class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        
        if(root == null || root == p || root == q){
            return root;
        }

        TreeNode left = lowestCommonAncestor(root.left, p, q);
        TreeNode right = lowestCommonAncestor(root.right, p, q);

        // The method can return either null, or p,q
        if(left == null){
            return right;
        }
        if(right == null){
            return left;
        }
        else{
            return root;
        }
    }
}
```

## Lowest Common Ancestor of Binary Search Tree

```
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode(int x) { val = x; }
 * }
 */

class Solution {
    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        
        if(root == null || root == p || root == q) return root;

        //TreeNode left = lowestCommonAncestor(root.left, p, q);
       // TreeNode right = lowestCommonAncestor(root.right, p, q);

       // if(left == null){
        //    return right;
       // }
        //if(right == null) return left;

       // else return root;

       // All left nodes of any root in Binary Search tree should be less than root value

        if(root.val > p.val && root.val > q.val){
            // left
            return lowestCommonAncestor(root.left, p, q);
        }
         // All right nodes of any root in Binary Search tree should be greater than root value
        if(root.val < p.val && root.val < q.val) return lowestCommonAncestor(root.right, p, q) ;

        else return root;

    }
}
```
