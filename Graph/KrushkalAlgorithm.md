// To find minimum spanning tree
// Prerequisite: DisjointSet

// 1. Sort all the edges based on weight in increasing 
// 2. Add them queue
// 3. Take the guys whose are not lies in the same component, because spannning tree does not contain cycle.
// 4. The Condition is Don't connect a node twice in a family.

<img width="1307" height="742" alt="image" src="https://github.com/user-attachments/assets/d58ca5bc-2b3c-4d57-8e65-dc20e9dbd3b9" />

```
class Solution {
    static int kruskalsMST(int V, int[][] edges) {
        // code here
        DisjointSet ds = new DisjointSet(V);
        
        ArrayList<int[]> mst = new ArrayList<>();
        
        // Sort edges by weight
        
        Arrays.sort(edges, (x, y)-> Integer.compare(x[2], y[2]));
        
        int cost = 0;
        
        for(int[] edge: edges){
            
            int u = edge[0];
            int v = edge[1];
            int wt = edge[2];
            
            if(ds.findParent(u) != ds.findParent(v)){
                cost += wt;
                mst.add(new int[]{u, v});
                ds.union(u, v);
            }
        }
        return cost;
    }
    
     static class DisjointSet{
        
        int[] parent, size;
        
        public DisjointSet(int n){
            parent = new int[n+1];
            size = new int[n+1];
            
            for(int i=0; i<=n; i++){
                parent[i] = i;
                size[i] = 1;
            }
              
        }
        
        public int findParent(int u){
            
            if(u == parent[u]) return u;
            return parent[u] = findParent(parent[u]);
        }
        
        public void union(int u, int v){
            
            int pu = findParent(u);
            int pv = findParent(v);
            
            if(pu == pv) return;
            
            // if(size[pu] < size[pv]){
            //     parent[pv] = pu;
            // }
            // else if(size[pv] < size[pu]){
            //     parent[pu] = pv;
            // }
            // else{
            //     parent[pu] = pv;
            //     size[pu]++;
            // }
            parent[pu] = pv;
        }
    }
}

```

