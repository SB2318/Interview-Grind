## Prerequisite : BST Iterator

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
    public boolean findTarget(TreeNode root, int k) {
        
         BSTIterator itL = new BSTIterator(root, false);
         BSTIterator itR = new BSTIterator(root, true);

          int l = itL.next();
          int r = itR.next();

         while(l < r){
           

            if(l+r == k) return true;

            if(l+r < k){
               
               if(!itL.hasNext()) return false;
               l = itL.next();

            }else{
               if(!itR.hasNext()) return false;
               r = itR.next(); 
            }
         }

         return false;
    }

    class BSTIterator {
        Stack<TreeNode> stack = new Stack<>();
        boolean reverse;

        public BSTIterator(TreeNode root, boolean reverse){
            this.reverse = reverse;
            pushAll(root);
        }

        public boolean hasNext(){
            return !stack.isEmpty();
        }

        public int next(){
           TreeNode node = stack.pop();

           if(reverse){
            pushAll(node.left);
           }else{
            pushAll(node.right);
           }

           return node.val;
        }

        private void pushAll(TreeNode root){

            if(root == null) return;

            while(root != null){
                stack.add(root);

                if(reverse){
                    root = root.right;
                }else{
                    root = root.left;
                }
            }
        }
    }
}
```
