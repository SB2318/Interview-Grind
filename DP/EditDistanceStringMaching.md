
<img width="1005" height="592" alt="image" src="https://github.com/user-attachments/assets/7991b723-c3d2-46ef-ab2c-fb95664628e0" />

> Try All Possible ways - Recursion

### How to write recurrence?

* Express in terms of index (i, j), i = first string index, j = second string index
* Explore all paths of matching. ( insert, remove, replace)
* Minimum of all operations.
* Base case


Hypothetical insertion (index will be at same position, we are just trying to insert at the right)
  <img width="640" height="432" alt="image" src="https://github.com/user-attachments/assets/9bab4220-f51d-469e-9e7a-2429e729c983" />

 ```
1+f(i, j-1) // second string now shift to left as one character matched
```

Hypothetical Removal (index will be shift to left hypothetically, second string will be in same position)

```
1+f(i-1, j)
```

Hypothetical replace, (both will be shift left hypothetically)

```
1 + f(i-1, j-1)
```
<img width="887" height="422" alt="image" src="https://github.com/user-attachments/assets/39cd284b-1fb2-489c-b0d1-a36a692f10ea" />

Base case, when its over
<img width="968" height="533" alt="image" src="https://github.com/user-attachments/assets/e4719f33-6a9c-4c95-80e9-59951630684b" />

if s1 gets exhausted then the remaining characters will be insert, the steps will be j+1

if s2 gets exhausted, minimum ops to convert rest characters of s1 to empty.
this is nothing but, i+1

<img width="702" height="522" alt="image" src="https://github.com/user-attachments/assets/9dd995b7-d8f8-412e-8da5-c7c7b495101e" />

## Recursion

```
class Solution {
    public int minDistance(String s1, String s2) {
        
        int n = s1.length();
        int m = s2.length();

        int[][] dp = new int[n][m];

        for(int[] a: dp) Arrays.fill(a, -1);

        return f(n-1, m-1, s1, s2, dp);
    }

    private int f(int i, int j, String s1, String s2, int[][] dp){

        // if s1 gets exhausted then the remaining characters will be inserted, the steps will be j+1
        if(i < 0) return j+1; 

      // if s2 gets exhausted, minimum ops to convert rest characters of s1 to empty.
        if(j < 0) return i+1;

        if(dp[i][j] != -1) return dp[i][j];

        if(s1.charAt(i) == s2.charAt(j)){
            return dp[i][j] = f(i-1, j-1, s1, s2, dp);
        }

        // insert a character ,  second string now shift to left as one character matched
        int insert = 1 + f(i, j-1, s1, s2, dp);

        // Delete a character Hypothetical Removal: (s1 index will be shift to left hypothetically, second string will be in same position)
        int remove = 1 + f(i-1, j, s1, s2, dp);

        // Replace a character : Hypothetical replace, (both will be shift left hypothetically)
        int replace = 1 + f(i-1, j-1, s1, s2, dp);

        return dp[i][j] = Math.min(insert, Math.min(remove, replace));
    }
}
```

## Dp

```
class Solution {
    public int minDistance(String s1, String s2) {
        
        int n = s1.length();
        int m = s2.length();

        int[][] dp = new int[n+1][m+1];

        // Base Case: S1 gets exhausted
        for(int j=0; j<=m; j++) dp[0][j] = j;

        // Base Case: S2 gets exhausted
        for(int i=0; i<=n; i++) dp[i][0] = i;

        for(int i=1; i<=n; i++){

            for(int j=1; j<=m; j++){
              if(s1.charAt(i-1) == s2.charAt(j-1)){
                 dp[i][j] = dp[i-1][j-1];
                 continue;
              }
              int insert = 1 + dp[i][j-1];
              int remove = 1 + dp[i-1][j];
              int replace = 1 + dp[i-1][j-1];
              dp[i][j] = Math.min(insert, Math.min(remove, replace));  
            }
        }

        return dp[n][m];
    }

    private int f(int i, int j, String s1, String s2, int[][] dp){

        // if s1 gets exhausted then the remaining characters will be inserted, the steps will be j+1
        if(i < 0) return j+1; 

      // if s2 gets exhausted, minimum ops to convert rest characters of s1 to empty.
        if(j < 0) return i+1;

        if(dp[i][j] != -1) return dp[i][j];

        if(s1.charAt(i) == s2.charAt(j)){
            return dp[i][j] = f(i-1, j-1, s1, s2, dp);
        }

        // insert a character ,  second string now shift to left as one character matched
        int insert = 1 + f(i, j-1, s1, s2, dp);

        // Delete a character Hypothetical Removal: (s1 index will be shift to left hypothetically, second string will be in same position)
        int remove = 1 + f(i-1, j, s1, s2, dp);

        // Replace a character : Hypothetical replace, (both will be shift left hypothetically)
        int replace = 1 + f(i-1, j-1, s1, s2, dp);

        return dp[i][j] = Math.min(insert, Math.min(remove, replace));
    }
}
```


