
### Floor Value: the most recent value less than or equal to a particular value.

```
/*
Definition for Node
class Node {
    int data;
    Node left, right;

    Node(int val) {
        data = val;
        left = right = null;
    }
}
*/

class Solution {
    public int findMaxFork(Node root, int k) {
        // code here.
        int floor = -1;
        while(root != null){
            
            if(root.data == k){
                return root.data;
            }
            if(root.data > k){
               
                root = root.left;
            }else{
                 floor = root.data;
                root = root.right;
            }
        }
        
        return floor;
    }
}

```

## Cell : Lowest Value that greater than equal to the particular value

```
/*
Definition for Node
class Node {
    int data;
    Node left, right;

    Node(int val) {
        this.data = val;
        left = right = null;
    }
} */

class Solution {
    int findCeil(Node root, int x) {
        // code here
        
        int ceil = -1;
        
        while(root != null){
            
            if(root.data == ceil){
                return root.data;
            }
            
            if(root.data < x){
                root = root.right;
            }else{
                ceil = root.data;
                root = root.left;
            }
        }
        
        return ceil;
    }
}
```
