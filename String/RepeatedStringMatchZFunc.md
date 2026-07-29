# Z-Function (Z Algorithm) – Complete Notes

## 1. What is the Z-Function?

For a string `S` of length `n`, the **Z-array** is an array `Z` where:

> `Z[i]` = Length of the **longest substring starting at index `i`** that matches the **prefix** of the string.

* `Z[0]` is usually defined as `0` (sometimes `n` depending on implementation).

---

## 2. Example

Consider

```text
S = "aabcaabxaaaz"
```

| Index | Character | Z Value |
| ----: | --------- | ------: |
|     0 | a         |       0 |
|     1 | a         |       1 |
|     2 | b         |       0 |
|     3 | c         |       0 |
|     4 | a         |       3 |
|     5 | a         |       1 |
|     6 | b         |       0 |
|     7 | x         |       0 |
|     8 | a         |       2 |
|     9 | a         |       2 |
|    10 | a         |       1 |
|    11 | z         |       0 |

Why is `Z[4]=3`?

```text
Prefix

a a b c a a b x...
↑ ↑ ↑

Substring from index 4

a a b x...
↑ ↑ ↑
```

The first three characters match.

---

# 3. Brute Force Algorithm (O(n²))

For every index:

1. Start comparing from the beginning of the string.
2. Count matching characters.

```java
for (int i = 1; i < n; i++) {

    while (i + Z[i] < n &&
           s.charAt(Z[i]) == s.charAt(i + Z[i])) {

        Z[i]++;
    }
}
```

### Complexity

* Time : **O(n²)**
* Space : **O(n)**

---

# 4. Why do we need Optimization?

Consider

```text
aaaaaaaaaaaaaaaaaa
```

Every position compares almost the entire string.

```text
Index 1 → 17 comparisons
Index 2 → 16 comparisons
Index 3 → 15 comparisons
...
```

Total complexity becomes

```text
O(n²)
```

We need to reuse previous comparisons.

---

# 5. Z-Box

The optimization is based on maintaining a window

```text
[L ......... R]
```

such that

```text
S[L...R] == Prefix
```

This window is called the **Z-box**.

Example

```text
Index

0 1 2 3 4 5 6 7
a b c a b c d e

      L-----R
```

The substring from `L` to `R` already matches the prefix.

---

# 6. Two Cases

Suppose we are computing `Z[i]`.

---

## Case 1 : Outside the Z-box

```text
L------R

         i
```

If

```java
i > R
```

there is no previous information.

Start matching from scratch.

```java
while (...) {
    Z[i]++;
}
```

---

## Case 2 : Inside the Z-box

```text
L------------R
    i
```

Now,

```java
k = i - L;
```

Since the Z-box matches the prefix,

```text
Prefix

abcdef...

Substring

abcdef...
L
```

the value

```java
Z[k]
```

already tells us something.

---

### Copy Rule

Initialize

```java
Z[i] = Math.min(Z[k], R - i + 1);
```

Why?

Because the match inside the Z-box cannot extend beyond `R` without verification.

---

# 7. Why `Math.min()`?

Suppose

```text
L = 5
R = 12

i = 8
```

Then

```text
Remaining inside box

8 ... 12

Length = 5
```

Suppose

```java
Z[k] = 8
```

We cannot simply copy `8`.

Only

```text
5
```

characters are guaranteed.

Hence

```java
Math.min(Z[k], R-i+1)
```

---

# 8. Extending Beyond the Z-box

After copying,

maybe the match continues beyond `R`.

So compare further.

```java
while (i + Z[i] < n &&
       text.charAt(Z[i]) == text.charAt(i + Z[i])) {

    Z[i]++;
}
```

### What are we comparing?

```java
text.charAt(Z[i])
```

means

> Character in the prefix.

```java
text.charAt(i + Z[i])
```

means

> Character in the current substring.

Example

```text
Prefix

a b c d
↑

Substring

a b c d
↑
```

Every successful comparison increases the match length.

---

# 9. Updating the Z-box

After extending,

if the match goes beyond the current `R`,

```java
if (i + Z[i] - 1 > R) {

    L = i;
    R = i + Z[i] - 1;
}
```

Example

Current box

```text
L------R
```

New match

```text
      i-----------New End
```

Since it extends farther,

update

```text
L = i
R = New End
```

---

# 10. Why `i + Z[i] - 1`?

Suppose

```java
Z[i] = 4
```

Matched positions are

```text
i
i+1
i+2
i+3
```

The last matched index is

```text
i + 3

= i + 4 - 1
```

Hence

```java
R = i + Z[i] - 1;
```

---

# 11. Complete O(n) Algorithm

```java
private int[] zFunction(String text) {

    int n = text.length();
    int[] Z = new int[n];

    int L = 0;
    int R = 0;

    for (int i = 1; i < n; i++) {

        if (i <= R) {

            int k = i - L;

            Z[i] = Math.min(Z[k], R - i + 1);
        }

        while (i + Z[i] < n &&
               text.charAt(Z[i]) == text.charAt(i + Z[i])) {

            Z[i]++;
        }

        if (i + Z[i] - 1 > R) {

            L = i;
            R = i + Z[i] - 1;
        }
    }

    return Z;
}
```

---

# 12. Complexity Analysis

| Operation        | Complexity |
| ---------------- | ---------- |
| Building Z-array | O(n)       |
| Space            | O(n)       |

Although there is a nested `while` loop, the pointer `R` only moves **forward** and never backward. Therefore, each character is processed a constant number of times, giving an overall time complexity of **O(n)**.

---

# 13. Pattern Matching using Z Algorithm

To search for a pattern `P` in text `T`:

Create a new string

```text
P + "#" + T
```

Example

```text
Pattern = "abc"

Text = "abcabc"

Combined

abc#abcabc
```

Build the Z-array.

Whenever

```java
Z[i] == pattern.length()
```

the pattern occurs at

```java
i - pattern.length() - 1
```

because:

* `pattern.length()` skips the pattern,
* `1` skips the separator (`#`),
* the remaining offset gives the starting index in the original text.

---

# 14. Applications

* Pattern searching (alternative to KMP)
* Finding repeated substrings
* Longest common prefix computations
* String compression
* DNA sequence matching
* Competitive programming string problems

---

# 15. Key Takeaways

* **Z[i]** = Longest prefix match starting at index `i`.
* Maintain a **Z-box** `[L, R]` representing the current longest known prefix match.
* If `i > R`, compute the match from scratch.
* If `i ≤ R`, initialize `Z[i]` with `min(Z[i-L], R-i+1)` and extend if possible.
* Update `[L, R]` whenever a longer matching segment is found.
* The Z-algorithm computes the entire Z-array in **O(n)** time, making it an efficient solution for many string matching problems.


## Bruteforce Approach

```
class Solution {
    ArrayList<Integer> search(String pat, String txt) {
        // code here
        ArrayList<Integer> zList = new ArrayList<>();
        ArrayList<Integer> ans = new ArrayList<>();
        String text = pat + "#" + txt;
        
        zList = zFunction(text, zList);
        
        for(int i=pat.length()+1; i<zList.size(); i++){
            
            if(zList.get(i) == pat.length()){
                ans.add(i-pat.length()-1);
            }
        }
        
       return ans; 
    }
    
    private ArrayList<Integer> zFunction(String text, ArrayList<Integer> res){
          
          int n = text.length();
          int[] Z = new int[n];
          
          for(int i=1; i<n; i++){
              
              int j = 0;
              
              while(i+j < n && text.charAt(j) == text.charAt(i+j)) j++;
              
             // res.set(i, j);
             Z[i] = j;
          }
          
          for(int i=0; i<n; i++) res.add(Z[i]);
          
          return res;
          
    }
}
```

## Optimized Approach

```
class Solution {
    ArrayList<Integer> search(String pat, String txt) {
        // code here
        ArrayList<Integer> zList = new ArrayList<>();
        ArrayList<Integer> ans = new ArrayList<>();
        
        zFunction(pat+"#"+txt, zList);
        
        for(int i=pat.length()+1; i<zList.size(); i++){
            
            if(zList.get(i) == pat.length()){
                ans.add(i-pat.length()-1);
            }
        }
        
        return ans;
        
    }
    
    private void zFunction(String s, ArrayList<Integer> res){
        
        int[] Z = new int[s.length()];
        
        int left = 0, right = 0;
        
        for(int i=1; i<s.length(); i++){
            
            if(i<= right){
                Z[i] = Math.min(Z[i-left], right-i+1); // text[L..R] = text [0...R-L]
            }
            
            while(i+Z[i] < s.length() && s.charAt(Z[i]) == s.charAt(i+Z[i])) Z[i]++;
            
            if(i+Z[i]-1 > right){
                left = i;
                right = i+Z[i]-1;
            }
        }
        
        for(int x: Z) res.add(x);
    }
    
}
```
