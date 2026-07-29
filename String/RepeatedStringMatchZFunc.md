## Bruteforce Approach

```
class Solution {
    ArrayList<Integer> search(String pat, String txt) {
        // code here
        ArrayList<Integer> zList = new ArrayList<>();
        ArrayList<Integer> ans = new ArrayList<>();
        String text = pat + "#" + txt;
        
        zList = zFunction(text, zList);
        
        for(int i=pat.length()+1; i<zList.size(); i++){
            
            if(zList.get(i) == pat.length()){
                ans.add(i-pat.length()-1);
            }
        }
        
       return ans; 
    }
    
    private ArrayList<Integer> zFunction(String text, ArrayList<Integer> res){
          
          int n = text.length();
          int[] Z = new int[n];
          
          for(int i=1; i<n; i++){
              
              int j = 0;
              
              while(i+j < n && text.charAt(j) == text.charAt(i+j)) j++;
              
             // res.set(i, j);
             Z[i] = j;
          }
          
          for(int i=0; i<n; i++) res.add(Z[i]);
          
          return res;
          
    }
}
```

## Optimized Approach

```
class Solution {
    ArrayList<Integer> search(String pat, String txt) {
        // code here
        ArrayList<Integer> zList = new ArrayList<>();
        ArrayList<Integer> ans = new ArrayList<>();
        
        zFunction(pat+"#"+txt, zList);
        
        for(int i=pat.length()+1; i<zList.size(); i++){
            
            if(zList.get(i) == pat.length()){
                ans.add(i-pat.length()-1);
            }
        }
        
        return ans;
        
    }
    
    private void zFunction(String s, ArrayList<Integer> res){
        
        int[] Z = new int[s.length()];
        
        int left = 0, right = 0;
        
        for(int i=1; i<s.length(); i++){
            
            if(i<= right){
                Z[i] = Math.min(Z[i-left], right-i+1); // text[L..R] = text [0...R-L]
            }
            
            while(i+Z[i] < s.length() && s.charAt(Z[i]) == s.charAt(i+Z[i])) Z[i]++;
            
            if(i+Z[i]-1 > right){
                left = i;
                right = i+Z[i]-1;
            }
        }
        
        for(int x: Z) res.add(x);
    }
    
}
```
