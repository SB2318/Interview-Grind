
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
