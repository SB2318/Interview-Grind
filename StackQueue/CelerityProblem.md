

```
class Solution {
    public int celebrity(int mat[][]) {
        // code here
        
        // Celebrity Condition
        // Celebrity  must known by everyone
        // Celebrity does not know anyone
        // max one celeb exist
        // Celebrity i must known by everyone, find that i
        
        if(mat.length == 1) return 0;
        int index = -1;
        
        for(int i=0; i<mat.length; i++){
             boolean isCeleb = true;
            for(int j=0; j<mat.length; j++){
                
                if(i != j && mat[j][i] == 0){ // is j know i
                    isCeleb = false;
                    break;
                }
            }
            
            if(isCeleb) {
                index = i;
                break;
            }
        }
        
        // condition 2, Celebrity does not know anyone
        
        if(index != -1){
            
            for(int j=0; j<mat.length; j++){
                
                if(index != j && mat[index][j] == 1){
                    index = -1;
                    break;
                }
            }
        }
        
        return index;
    }
}
```
