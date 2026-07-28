```
class Solution {
    public int orangesRotting(int[][] grid) {
       int n = grid.length;
       int m = grid[0].length;

       Queue<Pair> queue = new LinkedList<>();
       int[][] visited = new int[n][m];
       int fresh = 0;

       for(int i=0; i<n; i++){
         for(int j=0; j<m; j++){

            if(grid[i][j] == 2){
                visited[i][j] = 2;
                queue.offer(new Pair(i, j, 0));
            }
            if(grid[i][j] == 1) fresh++;
         }
       }

       int tm = 0, rot = 0;
       int[][] dir = {{-1, 0}, {1, 0}, {0, 1}, {0, -1}};

       while(!queue.isEmpty()){
            Pair p = queue.poll();
            int r = p.row;
            int c = p.col;
            int t = p.t;

            tm = Math.max(tm, t);

            for(int[] d: dir){
                int nr = r + d[0];
                int nc = c + d[1];

                if(nr >= 0 && nr < n && nc >=0 && nc < m 
                && visited[nr][nc] == 0 && grid[nr][nc] == 1){

                    queue.offer(new Pair(nr, nc, t+1));
                    visited[nr][nc] = 2;
                    rot++;
                }
            }
       }

       if(fresh != rot) return -1;

       return tm;
    }

    class Pair {
        int row, col, t;
        public Pair(int row, int col, int t){
            this.row = row;
            this.col = col;
            this.t = t;
        }
    }
}

```
