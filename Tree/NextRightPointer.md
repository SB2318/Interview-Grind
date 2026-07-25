
```
/*
// Definition for a Node.
class Node {
    public int val;
    public Node left;
    public Node right;
    public Node next;

    public Node() {}
    
    public Node(int _val) {
        val = _val;
    }

    public Node(int _val, Node _left, Node _right, Node _next) {
        val = _val;
        left = _left;
        right = _right;
        next = _next;
    }
};
*/

class Solution {
    Map<Integer, Node> prev ;
    public Node connect(Node root) {
        prev = new HashMap<>();
        dfs(root, 0);
        return root;
    }

    private void dfs(Node root, int level){
        if(root == null) return;

        if(prev.containsKey(level)){
            prev.get(level).next = root;
        }
        prev.put(level, root);

        dfs(root.left, level+1);
        dfs(root.right, level+1);
    }
}
```
