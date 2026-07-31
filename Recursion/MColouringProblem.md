
```
class Solution {
    ArrayList<ArrayList<Integer>> adj;
    
    boolean graphColoring(int v, int[][] edges, int m) {
        // code here
        adj = new ArrayList<>();
        int[] colors = new int[v];
        for(int i=0; i<v; i++) adj.add(new ArrayList<>());
        
        for(int[] edge: edges){
            
            int a = edge[0];
            int b = edge[1];
            
            adj.get(a).add(b);
            adj.get(b).add(a);
        }
        
        return dfs(0, v, m, colors);
        
    }
    
    private boolean dfs(int node, int v, int m, int[] colors ){
        
        if(node == v) return true;
        
        for(int color = 1; color<=m; color++){
            
            if(isSafe(color, node, colors)){
                colors[node] = color;
                
                if(dfs(node+1, v, m, colors)) return true;
                colors[node] = 0;
            }
        }
        
        return false;
    }
    
    private boolean isSafe(int color, int node, int[] colors){
        
        for(int i : adj.get(node)){
            
            if(colors[i] == color) return false;
        }
        
        return true;
    }
}
```
