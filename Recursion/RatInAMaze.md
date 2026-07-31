
```
class Solution {
    private char[] res = {'D', 'L', 'R', 'U'};
    private int[][] dirs = {{1, 0}, {0, -1}, {0, 1}, {-1, 0}};
    public ArrayList<String> ratInMaze(int[][] maze) {
        // code here
        int n = maze.length;
        
        ArrayList<String> ans = new ArrayList<>();
        
        boolean[][] visited = new boolean[n][n];
        
        if(maze[0][0] == 0 || maze[n-1][n-1] == 0) return ans;
        
        dfs(0, 0, n, visited, ans, maze, new StringBuilder());
        
        return ans;
    }
    
    private void dfs(int r, int c, int n, 
    boolean[][] visited, ArrayList<String> ans, int[][] maze, StringBuilder path){
        
          if(r == n-1 && c == n-1){
              ans.add(path.toString());
              return;
          }
          visited[r][c] = true;
          
          for(int i=0; i<dirs.length; i++){
              
              int nr = r + dirs[i][0];
              int nc = c + dirs[i][1];
              
              if(nr >=0 && nr < n && nc >= 0 && nc < n 
              && !visited[nr][nc] && maze[nr][nc] == 1){
                  path.append(res[i]);
                  dfs(nr, nc, n, visited, ans, maze, path);
                  path.deleteCharAt(path.length()-1);
              }
          }
          
          visited[r][c] = false;
    }
}

```
