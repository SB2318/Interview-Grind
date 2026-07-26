
Assuming a root of a binary tree

Serialize: Return a String

<img width="1088" height="582" alt="image" src="https://github.com/user-attachments/assets/23ac34f5-b2ae-4dc5-a3f8-288f99d8a8f5" />

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, 
or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

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
public class Codec {

    // Encodes a tree to a single string.
    public String serialize(TreeNode root) {
        
       // if(root == null) return null;
        StringBuilder sb = new StringBuilder();

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);
        while(!queue.isEmpty()){
            TreeNode curr = queue.poll();

            if(curr == null) sb.append("#,");
            else sb.append(curr.val + ",");

            if(curr != null){
                queue.offer(curr.left);
                queue.offer(curr.right);
            }
        }

        return sb.toString();
    }

    // Decodes your encoded data to tree.
    public TreeNode deserialize(String data) {
        
        if(data == null || data.length() == 0 || data.charAt(0) == '#') return null;
        String[] arr = data.split(",");
        TreeNode root = new TreeNode(Integer.parseInt(arr[0]));
        int index = 0;

        Queue<TreeNode> queue = new LinkedList<>();
        queue.offer(root);

        while(!queue.isEmpty()){

            TreeNode node = queue.poll();

            index++;

            if(!arr[index].equals("#")){
                TreeNode left = new TreeNode(Integer.parseInt(arr[index]));
                node.left = left;
                queue.offer(left);
            }

            index++;
            if(!arr[index].equals("#")){
                TreeNode right = new TreeNode(Integer.parseInt(arr[index]));
                node.right = right;
                queue.offer(right);
            }

        }
        return root;
    }
}

// Your Codec object will be instantiated and called as such:
// Codec ser = new Codec();
// Codec deser = new Codec();
// TreeNode ans = deser.deserialize(ser.serialize(root));
```
