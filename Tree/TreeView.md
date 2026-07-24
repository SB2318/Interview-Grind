
# Right or Left View of Binary Tree

## Right Side View

// Last root Node of every level
// Solution : Reverse Preorder
// Normal preorder (Root Left Right)
// Reverse preorder (Root Right Left)

// Now, the thing is how you store the root?
// Send an arraylist. along with a level value with each method call
// If level is equal to ds size, means we are visiting the node for the first time

// Time Complexity : O(N)
// Space Complexity: O(N)

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
    public List<Integer> rightSideView(TreeNode root) {
        
        List<Integer> rightView = new ArrayList<>();
        reversePreorder(root, rightView, 0);
        return rightView;
    }

    private void reversePreorder(TreeNode root, List<Integer> ans, int level){

        if(root == null) return;

        if(level == ans.size()){
            // we are visiting this level for the first time, root is not added yet
            ans.add(root.val);
        }

        reversePreorder(root.right, ans, level+1);
        reversePreorder(root.left, ans, level+1);
    }
}
```

## Left View of a Binary Tree

// Solution : Preorder (left root will be added at first)

```
/*
class Node {
    int data;
    Node left, right;

    Node(int val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}
*/

class Solution {
    public ArrayList<Integer> leftView(Node root) {
        // code here
        ArrayList<Integer> ans = new ArrayList<>();
        preorder(root, ans, 0);
        return ans;
    }
    
    private void preorder(Node root, ArrayList<Integer> ans, int level){
        
        if(root == null) return;
        
        if(level == ans.size()){
            ans.add(root.data);
        }
        
        preorder(root.left, ans, level+1);
        preorder(root.right, ans, level+1);
    }
}
```

## Bottom View of a Binary Tree

Vertical Order Traversal
In every column the last node will be our bottom view.

```
/*
Definition for Node
class Node {
    int data;
    Node left;
    Node right;

    Node(int val) {
        data = val;
        left = right = null;

    }
}
*/

class Solution {
    public ArrayList<Integer> bottomView(Node root) {
        // code here
        ArrayList<Integer> ans = new ArrayList<>();
        Queue<Touple> queue = new LinkedList<>();
        TreeMap<Integer, Touple> map = new TreeMap<>();
        
        queue.offer(new Touple(root, 0, 0));
        
        while(!queue.isEmpty()){
            Touple t = queue.poll();
            int col = t.col;
            int depth = t.depth;
            Node node = t.node;
            
            if(!map.containsKey(col) || map.get(col).depth <= depth){
                // update with new data
                map.put(col, t);
            }
            
            if(node.left != null){
                queue.add(new Touple(node.left, col-1, depth+1));
            }
            if(node.right != null){
                queue.add(new Touple(node.right, col+1, depth+1));
            }
        }
        
        for(Touple t: map.values()){
            ans.add(t.node.data);
        }
        
        return ans;
    }
    class Touple {
        Node node;
        int col, depth;
        
        public Touple (Node n, int col, int depth){
            this.node = n;
            this.col = col;
            this.depth = depth;
        }
    }
    
}
```

## Top View of a binary tree

```
/*
class Node {
    int data;
    Node left, right;

    Node(int val) {
        this.data = val;
        this.left = null;
        this.right = null;
    }
}
*/
class Solution {
    public ArrayList<Integer> topView(Node root) {
        // code here
        ArrayList<Integer> ans = new ArrayList<>();
        TreeMap<Integer, Touple> map = new TreeMap<>();
        Queue<Touple> queue = new LinkedList<>();
        
        queue.offer(new Touple(root, 0, 0));
        
        while(!queue.isEmpty()){
            Touple t = queue.poll();
            int col = t.col;
            int depth = t.depth;
            Node node = t.node;
            
            if(!map.containsKey(col)){
                // store only the first node
                map.put(col, t);
            }
            
            if(node.left != null){
                queue.offer(new Touple(node.left, col-1, depth+1));
            }
            
            if(node.right != null){
                queue.offer(new Touple(node.right, col+1, depth+1));
            }
        }
        
        for(Touple t : map.values()){
            ans.add(t.node.data);
        }
        
        return ans;
    }
    
    class Touple{
        Node node;
        int col,  depth;
        
        public Touple(Node root, int col, int depth){
            this.node = root;
            this.col = col;
            this.depth = depth;
        }
    }
}
```
