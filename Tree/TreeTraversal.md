## Inorder Traversal
// Left Root Tree
<img width="965" height="602" alt="image" src="https://github.com/user-attachments/assets/52365d64-e285-4a6a-925e-e50ec80875b4" />

// Recursion way
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
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        inorder(root, ans);
        return ans;
    }

    private void inorder(TreeNode root, List<Integer> ans){
       // This is the place where we process root, no need to process root separately
        if(root == null) return;
        inorder(root.left, ans);
        ans.add(root.val);
      //  inorder(root, ans);
        inorder(root.right, ans);
    }
}
```

//Iteration way
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
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> inorder = new ArrayList<>();
        Stack<TreeNode> stack = new Stack<>();
        TreeNode node = root;

        while(true){
            
          if(node != null){
            // you don't proces it yet
            stack.add(node); // Last In first out
            node = node.left;
          }else{
             // You already process the current node
             // Check there are any node left from stack, (last in first out)
             if(!stack.isEmpty()){
                  node = stack.pop();
                  inorder.add(node.val);
                  node = node.right;
             }else{
                // no node left to process
                break;
             }
          }
        }

        return inorder;
    }
}

##  Pre Order Traversal
// Root, Left, Right

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
    public List<Integer> inorderTraversal(TreeNode root) {
        List<Integer> inorder = new ArrayList<>();
        inorder(root, inorder);
        return inorder;
    }

    private void inorder(TreeNode root, List<Integer> inorder){

        if(root == null) return;
        inorder(root.left, inorder);
        inorder.add(root.val);
        inorder(root.right, inorder);
    }
}
```

## Postorder Traversal
// Left, Right, Root

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
    public List<Integer> postorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        postorder(root, ans);
        return ans;
    }

    private void postorder(TreeNode root, List<Integer> ans){

         if(root == null) return;
         postorder(root.left, ans);
         postorder(root.right, ans);
         ans.add(root.val);
    }
}
```
All the above traversal technique takes O(N) time and O(N) space for both in preorder and inorder


##  Morris Inorder Traversal

- Takes O(N) time and space O(1) (No extra space)
- Use the concept of Threaded Binary Tree

<img width="1255" height="638" alt="image" src="https://github.com/user-attachments/assets/8a1541b5-88e5-43a4-903e-60664e89c23e" />

// Concept Inorder (Left, Root, Tree)

// Take a TreeNode named curr = root.

// Traverse while curr != null.

// Case 1:
// If curr.left == null:
//     Visit (print/store) curr.(no root.left left, visit root)
//     Move curr = curr.right.

// Case 2:
// Otherwise:
//     Find the rightmost node in curr's left subtree.
//     (This node is called the inorder predecessor.)

//     If predecessor.right == null:
//         Create a thread:
//         predecessor.right = curr.
//         Move curr = curr.left.

//     Else (predecessor.right == curr):
//         The thread already exists, which means
//         the left subtree has been completely visited.
//
//         Remove the thread:
//         predecessor.right = null.
//
//         Visit (print/store) curr.
//         Move curr = curr.right.

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
    public List<Integer> inorderTraversal(TreeNode root) {
        // Morris Traversal Inorder , Left Root Right
        List<Integer> ans = new ArrayList<>();
        TreeNode curr = root;

        while(curr != null){

            if(curr.left == null){

                // left is already visited
                ans.add(curr.val);
                curr = curr.right;
            }else{
                // Store the left pointer
                TreeNode right = curr.left;
                // Find the rightmost leaf node, predecessor
                while(right.right != null && right.right != curr){
                    right = right.right;
                }
                // Two cases, right.right is null, left is not visited yet
                if(right.right == null){
                    // create a thread, store the subtree root (curr) pointer
                    right.right = curr;
                    // go to more left
                    curr = curr.left;
                }else{
                    // left subtree already visited, store it to ans
                    // break the previous thread
                    right.right = null;
                    ans.add(curr.val);
                    // move curr to right
                    curr = curr.right;
                }
            }
        }

        return ans;
    }
}
```
## Morris Preorder Traversal
// Concept (Root, Left, Right)

// Take a TreeNode named curr = root.

// Traverse while curr != null.

// Case 1:
// If curr.left == null:
//     Visit (print/store) curr. (print root, before going left, preorder)
//     Move curr = curr.left.

// Case 2:
// Otherwise:
//     Find the rightmost node in curr's left subtree.
//     (This node is called the inorder predecessor.)

//     If predecessor.right == null:
//         Create a thread:
//         predecessor.right = curr.
 //        Visit (print/store) curr. (print root, before going left, preorder)
//         Move curr = curr.left.

//     Else (predecessor.right == curr):
//         The thread already exists, which means
//         the left subtree has been completely visited.
//       
//         Remove the thread:
//         predecessor.right = null.
//         Move curr = curr.right.

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
    public List<Integer> preorderTraversal(TreeNode root) {
        List<Integer> ans = new ArrayList<>();
        TreeNode curr = root;

        while(curr != null){

              if(curr.left == null){
                 ans.add(curr.val);
                 curr = curr.right;
              }else{

                  TreeNode prev = curr.left;
                  while(prev.right != null && prev.right != curr){
                       prev = prev.right;
                  }

                  if(prev.right == null){
                       prev.right = curr;
                       ans.add(curr.val);
                       curr = curr.left;
                  }else{
                    prev.right = null;
                    curr = curr.right;
                  }
              }
        }

        return ans;
    }
}
```

## Vertical order Traversal

<img width="960" height="667" alt="image" src="https://github.com/user-attachments/assets/79622ea3-6a00-486a-9cd2-45379207cbaa" />

If there are any overlapping node, take smaller value first.


