
<img width="916" height="548" alt="image" src="https://github.com/user-attachments/assets/fade91ab-a8d5-47c9-934a-472249bee781" />


<img width="846" height="267" alt="image" src="https://github.com/user-attachments/assets/984968a2-1ef2-4e22-9b45-6dc7e04935c2" />

```
class Solution {
    public static int countSubs(String s) {
        // code here
        int count = 0;
        Node root = new Node();
        for(int i=0; i<s.length(); i++){
            
            Node node = root;
            
            for(int j=i; j<s.length(); j++){
                
                if(!node.containsKey(s.charAt(j))){
                    count++;
                    node.put(s.charAt(j), new Node());
                }
                node = node.get(s.charAt(j));
            }
        }
        
        return count; // +1 for empty ;
    }
    
     static class Node {
        Node[] links = new Node[26];
        boolean flag;
        public Node(){
            
        }
        
        public boolean containsKey(char ch){
            return links[ch-'a'] != null;
        }
        
        public boolean isEnd(){
            return flag;
        }
        
        public void setEnd(){
            flag = true;
        }
        
        public Node get(char ch){
            return links[ch-'a'];
        }
        
        public void put(char ch, Node node){
            links[ch-'a'] = node;
        }
    }
    
    class Trie {
        
        private Node root;
        
        public Trie(){
            root = new Node();
        }
        
        public void insert(String word){
            
            Node node = root;
            for(char ch: word.toCharArray()){
                if(!node.containsKey(ch)){
                    node.put(ch, new Node());
                }
                
                node = node.get(ch);
                
             
            }
            
            node.setEnd();
        }
        
        private boolean checkWithPrefix(String word){
            
             Node node = root;
             
             for(char ch: word.toCharArray()){
                 if(!node.containsKey(ch)) return false;
                 
                 node = node.get(ch);
                 if(!node.isEnd())      // Every prefix must be a word
                   return false;                 
             }
             
             return node.isEnd();
        }
    }
}
```

