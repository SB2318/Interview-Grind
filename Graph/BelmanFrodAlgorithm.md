
* Edges can be in any order
* Relax all the edges n-1 times sequentially.
* Defination of relax, If you have a distance array, If the distance taken to reach u
  ```
    if(dis[u] + wt < dis[v])
        dis[v] = dis[u] + wt // Relaxation
  
  // dis[u] = distance to reach u
  // wt = distance to reach to v from u
  ```

  One Iteration -> Perform Relaxation on each edge, where your u is the index (i, vertex number) of the iteration.
  Number of iteration = Number of edges

  Why we do alaways N-1 iteration?
  <img width="706" height="251" alt="image" src="https://github.com/user-attachments/assets/41cbe37b-6322-430c-b8c8-2c60cbc96446" />

  How to detect negative cycle?
  On Nth Iteration relaxation will be done, and if the distance array gets updated, we can declare there is a negative cycle exists.

# Bellman-Ford: What Each Iteration Guarantees

The Bellman-Ford algorithm relaxes every edge exactly **V - 1** times (`V` = number of vertices). Each iteration extends the maximum number of edges allowed in the shortest path.

## Iteration Guarantee

- **Iteration 1**
  - Computes the shortest paths that use **at most 1 edge** from the source.
  - All vertices whose shortest path consists of a single edge now have their final shortest distance.

- **Iteration 2**
  - Computes the shortest paths that use **at most 2 edges**.
  - All vertices whose shortest path consists of two edges now have their final shortest distance.

- **Iteration k**
  - Computes the shortest paths that use **at most k edges**.
  - Any vertex whose shortest path contains **k or fewer edges** has its correct shortest distance after this iteration.

## Why This Works

Suppose the shortest path from the source to a vertex `v` contains exactly `k` edges.

```
Source → ... → v
       (k edges)
```

- During the first iteration, the first edge of the path becomes optimal.
- During the second iteration, the second edge becomes optimal.
- This process continues one edge at a time.
- After the **k-th iteration**, the shortest distance to `v` is guaranteed to be correct.

## Key Observation

After the **i-th iteration**, Bellman-Ford has correctly computed the shortest distance for every vertex whose shortest path from the source uses **at most `i` edges**.

Since any simple path in a graph with `V` vertices contains at most **`V - 1` edges**, performing **`V - 1` iterations** guarantees that all shortest paths have been found (provided there is no reachable negative-weight cycle).

## Example

Consider the graph:

```
A --4--> B --2--> C --3--> D
```

Source = **A**

### After Iteration 1

```
A = 0
B = 4 ✓
C = ∞
D = ∞
```

Only paths using one edge are finalized.

### After Iteration 2

```
A = 0
B = 4 ✓
C = 6 ✓
D = ∞
```

Shortest paths using up to two edges are finalized.

### After Iteration 3

```
A = 0
B = 4 ✓
C = 6 ✓
D = 9 ✓
```

The shortest path to `D` uses three edges, so it becomes correct in the third iteration.

## Time Complexity

- **Relaxation Passes:** `V - 1`
- **Edges Processed per Pass:** `E`
- **Overall Time Complexity:** **O(V × E)**

## Summary

| Iteration | Guaranteed Correct Shortest Paths |
|-----------|-----------------------------------|
| 1 | Paths using at most **1 edge** |
| 2 | Paths using at most **2 edges** |
| 3 | Paths using at most **3 edges** |
| k | Paths using at most **k edges** |
| V − 1 | All shortest paths (if no negative cycle exists) |

> **Important:** The guarantee is based on the **number of edges in the shortest path**, **not** the number of vertices or the total path weight.

## Algorithm

1. Initialize the distance of every vertex as **∞ (infinity)**.
2. Set the distance of the **source vertex** to **0**.
3. Repeat the following **V − 1** times (`V` = number of vertices):
   - Traverse every edge `(u, v, w)` in the graph.
   - If `dist[u] + w < dist[v]`, update:
     ```
     dist[v] = dist[u] + w
     ```
4. Perform one more traversal of all edges:
   - If any distance can still be relaxed, a **negative-weight cycle** exists that is reachable from the source.

```
class Solution {
    public int[] bellmanFord(int V, int[][] edges, int src) {
        // code here
        long[] dis = new long[V];
        int INF = (int)1e8;
        Arrays.fill(dis, Long.MAX_VALUE);
        
        dis[src] = 0;
        
        for(int i=0; i<V-1; i++){
            
            for(int[] edge: edges){
                int u = edge[0];
                int v = edge[1];
                int wt= edge[2];
                
                if(dis[u] != Long.MAX_VALUE && dis[u] + wt < dis[v]){
                    dis[v] = (long) dis[u] + wt;
                }
            }
            
        }
        
         // detect negative cycle, Vth iteration
         for(int[] edge: edges){
                int u = edge[0];
                int v = edge[1];
                int wt = edge[2];
                
                if(dis[u] != Long.MAX_VALUE && dis[u] + wt < dis[v]){
                    return new int[]{-1};
                }
        }
        
        int[] ans = new int[dis.length];
        
       for(int i=0; i<V; i++){
              
        if(dis[i] == Long.MAX_VALUE)
          ans[i] = INF;
        else
          ans[i] = (int) dis[i];
       }
        
        return ans;
    }
}

```
