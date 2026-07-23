A tree in which we have N nodes and N-1 edges and all nodes are reachable from each other.
<img width="1043" height="565" alt="image" src="https://github.com/user-attachments/assets/5ed5511a-a742-462c-992e-d928ab6e6ac7" />

There will be many spanning tree, but all are not minimum spanning tree. 

Any spanning tree which has minimum sum, is called MST.
class Solution {
    public int spanningTree(int V, int[][] edges) {
        // code here
        PriorityQueue<int[]> pq = new PriorityQueue<>((x,y)-> Integer.compare(x[1], y[1]));
        boolean[] visited = new boolean[V+1];
        ArrayList<ArrayList<int[]>> adj = new ArrayList<>();
        
        int sum = 0;
        
        for(int i=0; i<V; i++){
            adj.add(new ArrayList<>());
        }
        
        for(int[] edge: edges){
            adj.get(edge[0]).add(new int[]{edge[1], edge[2]});
            adj.get(edge[1]).add(new int[]{edge[0], edge[2]});
        }
        
        pq.add(new int[]{0,0});
        
        while(!pq.isEmpty()){
            int[] p = pq.poll();
            
            if(visited[p[0]]) continue;
            
            visited[p[0]] = true;
            sum += p[1];
            
            // add it to mst
            
            for(int[] nei: adj.get(p[0])){
                
                if(!visited[nei[0]]){
                    pq.add(new int[] {nei[0], nei[1]});
                }
            }
        }
        
        return sum;
    }
}

