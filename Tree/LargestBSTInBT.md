
<img width="1177" height="616" alt="image" src="https://github.com/user-attachments/assets/b0dcf8e4-2c9e-4a39-bf01-0f550dea2a41" />

<img width="1277" height="751" alt="image" src="https://github.com/user-attachments/assets/361aae06-52a3-4648-b369-278a2d896362" />

## BruteForce

Check if the subtree rooted at that node is a BST.
If it is, count the number of nodes in that subtree.
Otherwise, recursively find the largest BST in its left and right subtrees.

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
class BSTIterator {
    Stack<TreeNode> stack = new Stack<>();

    public BSTIterator(TreeNode root) {
        pushAll(root);
    }
    
    public int next() {
        // Take the top element
        TreeNode node = stack.pop();
        // check for right node, add its extreme left
        pushAll(node.right);
        return node.val;
    }
    
    public boolean hasNext() {
        return !stack.isEmpty();
    }

    private void pushAll(TreeNode root){

        if(root == null) return;

        while(root != null){
            stack.add(root);
            root = root.left;
        }
    }
}

/**
 * Your BSTIterator object will be instantiated and called as such:
 * BSTIterator obj = new BSTIterator(root);
 * int param_1 = obj.next();
 * boolean param_2 = obj.hasNext();
 */
```

## Optimal

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
    private long ans;
    public int maxSumBST(TreeNode root) {
        findMaxSum(root);
        return (int) ans;
    }

    private NodeValue findMaxSum(TreeNode root){
        if(root == null){
            // Empty Subtree
            return new NodeValue(Long.MIN_VALUE, Long.MAX_VALUE, 0);
        }

        NodeValue left = findMaxSum(root.left);
        NodeValue right = findMaxSum(root.right);

      

        if(left.maxNode < (long) root.val && (long) root.val < right.minNode){
            long sum = left.size + right.size + root.val;
            ans = Math.max(ans,sum );
            return new NodeValue(Math.max(root.val, right.maxNode), Math.min(root.val, left.minNode),
            sum);
        }

       // Invalid Sub tree
        return new NodeValue(Long.MAX_VALUE, Long.MIN_VALUE, 0);
    }

    class NodeValue {
        long maxNode, minNode, size;
        
        public NodeValue(long maxNode, long minNode, long size){
            this.maxNode = maxNode;
            this.minNode = minNode;
            this.size = size;
        }
    }
}
```
