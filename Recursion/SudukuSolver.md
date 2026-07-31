
```
class Solution {
    public void solveSudoku(char[][] board) {
        
       solve(board);
    }

    private boolean solve(char[][] board){

         for(int row=0; row<9; row++){

            for(int col=0; col<9; col++){
                 // find empty cell
                 if(board[row][col] == '.'){

                    for(char i = '1'; i <= '9'; i++){

                         if(isValid(board, row, col, i)){
                            board[row][col] = i;
                             
                            if(solve(board)){
                                return true;
                            }
                            board[row][col] = '.';
                         }
                        
                    }
                    return false;
                 }
            }
         }
         return true;
    }

    private boolean isValid(char[][] board, int row, int col, char ch){
        
        // Check Row
        for(int i=0; i<9; i++){

            if(board[row][i] == ch) return false;
        }
        // Check Col
        for(int i=0; i<9; i++){

            if(board[i][col] == ch) return false;
        }

        // Check box
        int startRow = (row/3)*3;
        int startCol = (col/3)*3;

        for(int i= startRow; i<startRow+3; i++){

            for(int j = startCol; j<startCol+3; j++){

                if(i<9 && j< 9 && board[i][j] == ch) return false;
            }
        }
       return true;
    }
}

```
