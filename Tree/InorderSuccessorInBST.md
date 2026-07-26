
Binary Search Tree : 

Root.val > Every left nodes value
Root.val < Every right nodes value

Inorder : Left Root Right

Inorder of a binary search tree always sorted
Successor means the first value that greater than this particular node value
Left guys cannot be the successor of the binary search tree

<img width="990" height="640" alt="image" src="https://github.com/user-attachments/assets/4a0120ea-d1d5-4e17-bd57-247326c03ab3" />

we have to find the next successor.

```
/*
class Node {
    int data;
    Node left, right;
    Node(int x) {
        data = x;
        left = right = null;
    }
}
*/

class Solution {
    public ArrayList<Node> findPreSuc(Node root, int key) {
        // code here
        Node successor = null, predecessor = null;
        
        Node temp = root;
        // Find successor 
        while(temp != null){
            
            if(temp.data > key){
           // the most recent node after key
                 successor = temp;
                temp = temp.left;
            }else{
               
                temp = temp.right;
            }
        }
        
        temp = root;
        // Find predecessor
        while(temp != null){
            
            if(temp.data >= key){
                 // the most recent node before key
                temp = temp.left;
            }else{
               predecessor = temp;
                temp = temp.right;
            }
        }
        
        return new ArrayList<Node>(Arrays.asList(predecessor, successor));
    }
}
```
