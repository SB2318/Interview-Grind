
* Multisource shortest path
* Detect negative cycles

* Dynamic Programming (something which is precomputed)
* cost matrix
* negative circle, if first cell of cost matrix contains negative value
  
```
// cost[i][j] -> Minimum cost required to reach i to j
class Solution {
    public void floydWarshall(int[][] dist) {
        // Code here
        int n = dist.length;
        int LARGE_VALUE = 100000000;
        
        for(int i=0; i<n; i++){
            
            for(int j=0; j<n; j++){
                
                if(i == j) dist[i][j] = 0;
            }
        }
        
        for(int k=0; k<n; k++){
            
            for(int i=0; i<n; i++){
                
                for(int j=0; j<n; j++){
                    
                    if(dist[i][k] != LARGE_VALUE && dist[k][j] != LARGE_VALUE){
                        
                        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
                    }
                }
            }
        }

```
        
      
    }
}
