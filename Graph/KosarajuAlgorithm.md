# Intuition
<!-- Describe your first thoughts on how to solve this problem. -->

## Kosaraju Algorithm:

- Sort all the nodes in order of the finishing time. (Topological Sort, The node that are visited at the last, It creates a toposort in that way)
- Transpose the graph in my next step
- Do the DFS according to the finishing time.

## **How Kosaraju fits the problem?**

The key insight is that the graph models dependency between characters:

- An edge u → v means: if you include u, you must also include v.

- A strongly connected component represents a set of characters that must always appear together because they mutually require each other.

- After compressing SCCs into a DAG (Directed Acyclic Graph), only the sink SCCs (those with no outgoing edges) can be chosen as independent minimal substrings. Any SCC with outgoing edges depends on another SCC, so it cannot stand alone.

# Approach
<!-- Describe your approach to solving the problem. -->
## Step 1. What is the graph?

The graph has 26 nodes, one for each lowercase letter.
Each node represents a character, not a substring.

## Step 2. What does an edge mean?
Suppose
```
S = "adefaddaccc"
```
Occurences of each character: (first and furthest)
a[0, 7], d[1, 6], e[2, 2], f[3, 3], c[8, 10]

Now consider the character a.
Its interval is [0,7].
Inside this interval we see 

```
a d e f a d d a
```
Therefore, considering a as root

```
a -> a
a -> d
a -> e
a -> f
```
## Step 3: Why create those edges?
Remember the rule,
>  If a substring contains a character, it must contain all occurrences of that character.

Suppose your substring contains a.

As there is an edge between a to d, that means d appears inside a's interval. So, choosing a force us to include d.

## Step 4. Why SCC?

Suppose, like in this problem we have an edge between `a to d` as well as `d to a`

means `a and d` can never be separated they are strongly connected.
In our problem, we need to figure out all such strongly connected graphs, not only one edge, and ofcourse there outdegree must be 0.

## Step 5. Running Kosaraju
Kosaraju groups them into one SCC.

## Step 6. Why Outdegree 0?

Each SCC becomes one node.
Think carefully.

If there is an edge from `SCCA` to `SCCB`, they cannot be an independent substring. (Some modulo exists).

## Why compute min and max?

Inside every SCC

```
min = smallest first occurrence
max = largest last occurrence
```
Suppose SCC {a,d}

```
a : [0,7]
d : [1,6]
```
Then

```
min = 0
max = 7
```

## Overall flow

```
String
   │
   ▼
First & Last occurrence
   │
   ▼
Build dependency graph
(u -> v if v appears inside u's interval)
   │
   ▼
Kosaraju
   │
   ▼
Find SCCs
   │
   ▼
Build SCC DAG
   │
   ▼
Find sink SCCs (out-degree = 0)
   │
   ▼
Take min(first) and max(last) of each sink SCC
   │
   ▼
Return those substrings
```

# Complexity
- Time complexity:
<!-- Add your time complexity here, e.g. $$O(n)$$ -->
$$O(n)$$

- Space complexity:
<!-- Add your space complexity here, e.g. $$O(n)$$ -->
$$O(n)$$ (due to the prefixSum array)

# Code
```java []
class Solution {
    public List<String> maxNumOfSubstrings(String S) {
        
        int n = S.length();
        int[] min = new int[26];
        int[] max = new int[26];
        Stack<Integer> stack = new Stack<>();
        boolean[] visited = new boolean[26];

        Arrays.fill(min, Integer.MAX_VALUE);
        Arrays.fill(max, -1);

        boolean[] exists = new boolean[26];
        int[][] prefix = new int[n+1][26];

        for(int i=0; i<n; i++){
            // a interval will be store in prefix sum
            // 0 1 2 3 4 5 6 7
            // a d e f a d d a
            // prefix sum will be your edges
            // Take all the character counts accumulated up to index i - 1, copy them to the next row, and then add the current character
            System.arraycopy(prefix[i], 0, prefix[i + 1], 0, 26);
            
            // Perform the current operation
            int ch = S.charAt(i) - 'a';

            prefix[i + 1][ch]++;
            // Update first and last occurence
            min[ch] = Math.min(min[ch], i);
            max[ch] = Math.max(max[ch], i);

            // mark visited as true
            exists[ch] = true;
        }

        //Build adjacency graph
        boolean[][] graph = new boolean[26][26];
        for(int i=0; i<26; i++){

            if(!exists[i]) continue;

            for(int j=0; j<26; j++){

                // Does j occur inside i's interval? 
                // How many times character j appears between mins[i] and maxs[i]?
                int maxOccur = max[i]+1;
                int minOccur = min[i];

                // prefix[i][ch] -> ch presents in i's interval

                if(prefix[maxOccur][j]-prefix[minOccur][j] > 0){
                    graph[i][j] = true; // there must be an edge
                }

            }
        }
         // Step 3: Kosaraju First DFS
         for(int i=0; i<26; i++){
            
            if(!visited[i]){
                dfs(i, graph, visited, stack);
            }
         }
         
         // Make visited array false again
         Arrays.fill(visited, false);
         int[] degree = new int[26];
         int[] batch = new int[26]; // batch stores which SCC each node belongs to.
         int id=0;

         Arrays.fill(batch, -1);

         while(!stack.isEmpty()){
            int node = stack.pop();

                if(batch[node] == -1){
                    revDfs(node, graph,batch, id, degree);
                    id++;
                }
            
         }

          // Step 5: Build Answer
        List<String> ans = new ArrayList<>();

        // Iterate over every scc, id = total number of scc
        for (int i = id - 1; i >= 0; i--) {

            if (degree[i] == 0) {

                int left = Integer.MAX_VALUE;
                int right = -1;
               // Visit all characters, i is your current scc
                for (int j = 0; j < 26; j++) {
                   // Is this character in the current SCC?, batch[j] stored the id of ssc in which j lies 
                    if (batch[j] == i) {

                        left = Math.min(left, min[j]);
                        right = Math.max(right, max[j]);
                      
                    }
                   
                }
                if (left != Integer.MAX_VALUE) {
                 ans.add(S.substring(left, right + 1));
                }
                
                
            }
        }

       return ans;
    }

    private void dfs(int node, boolean[][] graph, boolean[] visited, Stack<Integer> stack){
         visited[node] = true;

         for(int i=0; i<26; i++){
            if(graph[node][i] && !visited[i]){
                dfs(i, graph, visited, stack);
            }
         }
         stack.add(node);
    }

    private void revDfs(int node, boolean[][] graph, int[] batch, int id, int[] degree){
              
       if (batch[node] == -1) {

            batch[node] = id;

            for (int v = 0; v < 26; v++) {

                if (graph[v][node]) {
                    revDfs(v, graph, batch, id, degree);
                }
            }

        } else if (batch[node] != id) {
            // the node has already been assigned to another SCC
            degree[batch[node]]++;
        }
    }
}

```
