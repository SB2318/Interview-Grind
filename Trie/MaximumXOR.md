
```
class Solution {
    public int maxXor(int[] arr) {
        // code here
        Trie trie = new Trie();
        trie.insert(arr[0]);
        
        int res = 0;
        
        for(int i=1; i<arr.length; i++){
            res = Math.max(res, trie.getMax(arr[i]));
            trie.insert(arr[i]);
        }
        return res;
    }
    
    class Node{
        
        Node[] links = new Node[2];
        boolean flag;
        
        public boolean containsKey(int n){
            return links[n] != null;
        }
        
        public Node get(int key){
            return links[key];
        }
        
        public void put(int key, Node node){
            links[key] = node;
        }
        public void setEnd(){
            flag = true;
        }
        
        public boolean isEnd(){
            return flag;
        }
    }
    
    class Trie {
        
        private Node root;
        
        public Trie(){
            root = new Node();
        }
        
        public void insert(int n){
            Node node = root;
            
            for(int i= 31; i>=0; i--){
                
                int bit = (n >> i) & 1;
                
                if(!node.containsKey(bit)) {
                    node.put(bit, new Node());
                }
                
                node = node.get(bit);
            }
        }
        
        // find max from trie
        public int getMax(int num){
            
            Node node = root;
            int max = 0;
            
            for(int i= 31; i>=0; i--){
                
                int bit = (num >> i) & 1;
                
                if(node.containsKey(1-bit)) {
                   
                   max = max | (1 << i);
                   node = node.get(1-bit);
                }
                else
                  node = node.get(bit);
            }
            
            return max;
        }
        
    }
}

```
