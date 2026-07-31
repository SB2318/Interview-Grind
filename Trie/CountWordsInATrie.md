

```
/* class TrieNode {

    private final int ALPHABET_SIZE = 26;
    public TrieNode[] children;
    public boolean isLeaf;

    public TrieNode() {
        children = new TrieNode[ALPHABET_SIZE];
        isLeaf = false;
        for (int i = 0; i < ALPHABET_SIZE; i++) {
            children[i] = null;
        }
    }
}
*/

class Solution {
    public int wordCount(TrieNode root) {
        // code here
        
        if(root == null) return 0;
        
        int ans = 0;
        
        if(root.isLeaf) ans++;
        
        for(TrieNode node: root.children) ans += wordCount(node);
        
        return ans;
    }
}
```
