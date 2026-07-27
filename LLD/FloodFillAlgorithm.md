The Flood Fill algorithm is used to change the color of a connected region in a 2D grid.

Think of the Paint Bucket Tool in MS Paint. When you click on a pixel, all adjacent pixels (4-directionally) having the same color are changed to the new color.

## Idea

- Store the original color (oldColor).
- Start from (sr, sc).
- Visit every connected cell having oldColor.
    Change its color to newColor.
    Continue in all four directions:
    Up
    Down
    Left
    Right

This is a classic DFS (Depth First Search) or BFS problem.

## DFS Approach

```
class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        
        int oldColor = image[sr][sc];

        if(oldColor == color) return image;

        dfs(image, sr, sc, color, oldColor);

        return image;
    }

    private void dfs(int[][] image, int r, int c, int color, int oldColor){

        if(r < 0 || r >= image.length || c < 0 || c >= image[0].length) return;

        if(image[r][c] != oldColor) return;

        image[r][c] = color;

        dfs(image, r-1, c, color, oldColor); // top
        dfs(image, r+1, c, color, oldColor); // down
        dfs(image, r, c-1, color, oldColor); // left
        dfs(image, r, c+1, color, oldColor); // right

    }
}
```

## BFS Approach

```
class Solution {
    public int[][] floodFill(int[][] image, int sr, int sc, int color) {
        
        int oldColor = image[sr][sc];

        if(oldColor == color) return image;

        Queue<Pair> queue = new LinkedList<>();
        queue.offer(new Pair(image[sr][sc], sr, sc));
        int[][] dirs = {{-1, 0}, {1, 0}, {0, -1}, {0,1}};

        while(!queue.isEmpty()){

            Pair curr = queue.poll();
            int value = curr.value;
            int row = curr.row;
            int col = curr.col;

            if(value == oldColor){
                image[row][col] = color;
                
                for(int[] dir: dirs ){

                    int newR = row + dir[0];
                    int newC = col + dir[1];

                    if(isValid(newR, newC, image)){
                        queue.offer(
                            new Pair(image[newR][newC], newR, newC)
                        );
                    }
                }
                
            }
        }

        return image;
    }

    private boolean isValid(int r, int c, int[][] image){

        return r>= 0 && c >= 0 && r < image.length && c < image[0].length;
    }

    class Pair {
        int value, row, col;
        public Pair(int value, int row, int col){
            this.value = value;
            this.row = row;
            this.col = col;
        }
    }
}
```
