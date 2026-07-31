
```
class Solution {
    public String longestValidWord(String[] words) {
        // code here
        Trie trie = new Trie();
        String longest = "";
        
        for(String word: words) trie.insert(word);
        
        for(int i=0; i<words.length; i++){
            
            if(trie.checkWithPrefix(words[i])){
                
                if(words[i].length()  > longest.length()){
                    longest = words[i];
                }
                else if(words[i].length() == longest.length() && 
                words[i].compareTo(longest) < 0){
                    longest = words[i];
                }
            }
        }
        
        return longest;
    }
    
    class Node {
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
