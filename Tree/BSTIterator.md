
## Find Next

<img width="1010" height="672" alt="image" src="https://github.com/user-attachments/assets/89845511-8d57-40ca-a75b-c11f27147dc1" />

Take a Stack DS'

Whenever BST iterator of any node is given, everytime you go to the extreme left, and put everything into the stack.

hashNext() function
At the time of peek of any node, if its right not null,
Go to its extreme left and add it to the stack.

#### LLD
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

## Find Before

Instead of Going to extreme left, You now go for extreme right.

Reverse Inorder Right Root Left


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

