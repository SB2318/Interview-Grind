
// Any two node belongs to same component or not.
// Used in the graph which dynamically change their configuration
// Its help to find parent

It consist of two methods

(a) findParent()
(b) Union() ->
     (i) Union by size
     (ii) Union by rank

Union(u, v)  -> Create an edge between u and v. and maintain the rank of the parent.

1. Find Ultimate Parent of u and v
2. Find Rank of Ultimate Parent
3. Connect smaller rank to larger rank always

Here parent denote the topmost node
<img width="1026" height="621" alt="image" src="https://github.com/user-attachments/assets/b66f3d77-2f47-406a-8984-df6175d9a8ae" />

Path Comparison : store the parent during backtracking
<img width="520" height="322" alt="image" src="https://github.com/user-attachments/assets/881bb38b-3931-4757-9b7c-4d7b7ebc6364" />

during connection, higher guy will be the parent of lower guy

// Union By Rank

```
class Solution {
    public ArrayList<Integer> DSU(int n, int[][] queries) {
        // code here
        ArrayList<Integer> ans =  new ArrayList<>();
        DisjointSet ds = new DisjointSet(n);
        int k = queries.length;
        int count = 0;
        
        for(int[] query: queries){
            
            int type = query[0];
            count++;
            
            if(count > k) break;
            
            if(type == 1){
                 ds.union(query[1], query[2], ans);
               
            }
            else if(type == 2){
                ans.add(ds.findParent(query[1]));
            }
        }
        
        return ans;
    }
    
    class DisjointSet{
        
        int[] parent, rank;
        
        public DisjointSet(int n){
            parent = new int[n+1];
            rank = new int[n+1];
            
            for(int i=0; i<=n; i++) parent[i] = i;
        }
        
        public int findParent(int u){
            
            if(u == parent[u]) return u;
            return parent[u] = findParent(parent[u]); // path compression
        }
        
        public void union(int u, int v, ArrayList<Integer> res){
            
             int pu = findParent(u);
             int pv = findParent(v);
             
             if(pu == pv) return; // they already connected
             
            //  if(rank[pu] < rank[pv]){
            //      parent[pu] = pv;
            //      return pv;
            //  }
            //  else if(rank[pv] < rank[pu]){
            //      parent[pv] = pu;
            //      return pu;
            //  }else{
                 
            //      // arbitrary and increase rank
            //      parent[pv] = pu;
            //      rank[pu]++;
            //      return pu;
            //  }
            
            //  Merge the group containing x into the group containing z by making
            // the representative of x point to the ultimate representative of z.
            // x always parent
             parent[pu] = pv;
          //   res.add(pv);
            
        }
    }
}

// Union By Size
// You are just considering each node as an array

```
class Solution {
    public ArrayList<Integer> DSU(int n, int[][] queries) {
        // code here
        ArrayList<Integer> ans = new ArrayList<>();
        DisjointSet ds = new DisjointSet(n);
        
        int k = queries.length;
        
        for(int[] q: queries){
        
            
            int type = q[0];
            
            if(type == 1){
                ds.union(q[1], q[2]);
            }else{
                ans.add(ds.findParent(q[1]));
            }
            
            k--;
            if(k==0) break;
        }
        
        return ans;
    }
    
    class DisjointSet{
        
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





