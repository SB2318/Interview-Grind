
> Every palindrome has a center. Start from every possible center and expand outward as long as the characters match.

This is the **Expand Around Center** approach. The main idea is:

> Every palindrome has a center. Start from every possible center and expand outward as long as the characters match.

---

# Step 1: Base Case

```java
if (s.length() <= 1) {
    return s;
}
```

If the string has 0 or 1 character, it is already a palindrome.

Examples:

```
"a"  -> "a"
""   -> ""
```

---

# Step 2: Assume first character is the answer

```java
String maxStr = s.substring(0, 1);
```

Initially, the longest palindrome is just the first character.

Example:

```
s = "babad"

maxStr = "b"
```

---

# Step 3: Check every possible center

```java
for (int i = 0; i < s.length() - 1; i++) {
```

For every index, check:

* Odd length palindrome
* Even length palindrome

Why?

Because palindromes are of two types.

Odd:

```
racecar

   e
```

Even:

```
abccba

  ||
```

---

# Step 4: Odd palindrome

```java
String odd = expandFromCenter(s, i, i);
```

Both pointers start on the same character.

Example:

```
babad

index = 2

b a b a d
    ^
left=2
right=2
```

Expand:

```
left=2 right=2
b==b

left=1 right=3
a==a

left=0 right=4
b!=d

Stop
```

Palindrome found:

```
"aba"
```

---

# Step 5: Even palindrome

```java
String even = expandFromCenter(s, i, i + 1);
```

Now the center is between two characters.

Example:

```
cbbd

c b b d

  ^
```

Expand:

```
left=1
right=2

b==b

left=0
right=3

c!=d

Stop
```

Palindrome:

```
"bb"
```

---

# Step 6: Update answer

```java
if (odd.length() > maxStr.length()) {
    maxStr = odd;
}

if (even.length() > maxStr.length()) {
    maxStr = even;
}
```

Keep the longest palindrome found so far.

---

# Step 7: Expansion function

```java
private String expandFromCenter(String s, int left, int right)
```

This function expands while both characters are equal.

Initial state:

```
left = center
right = center
```

Loop:

```java
while (left >= 0 &&
       right < s.length() &&
       s.charAt(left) == s.charAt(right))
```

Continue while:

* left is inside the string
* right is inside the string
* characters match

---

## Example: `"racecar"`

Initial

```
r a c e c a r
      ^
left=3
right=3
```

Iteration 1

```
left=3
right=3

e==e

left=2
right=4
```

Iteration 2

```
c==c

left=1
right=5
```

Iteration 3

```
a==a

left=0
right=6
```

Iteration 4

```
r==r

left=-1
right=7
```

Loop stops.

Notice:

```
left = -1
right = 7
```

These pointers have gone **one step beyond** the palindrome.

---

# Why return

```java
return s.substring(left + 1, right);
```

Because after the loop:

```
left
 ^
x r a c e c a r x
                 ^
               right
```

`left` and `right` are outside the valid palindrome.

So we return

```
left + 1
```

to

```
right - 1
```

In Java,

```java
substring(start, end)
```

includes `start` but excludes `end`, so

```java
substring(left + 1, right)
```

returns exactly the palindrome.

Example:

```
left = -1
right = 7

substring(0,7)

returns

"racecar"
```

---

# Dry Run (`"babad"`)

```
maxStr = "b"
```

### i = 0

Odd:

```
"b"
```

Even:

```
""
```

Longest:

```
"b"
```

---

### i = 1

Odd expansion:

```
b a b

Palindrome = "bab"
```

Update:

```
maxStr = "bab"
```

Even:

```
No palindrome
```

---

### i = 2

Odd expansion:

```
a b a

Palindrome = "aba"
```

Length equals `"bab"` (3), so `maxStr` remains `"bab"` because the code updates only when a **strictly longer** palindrome is found.

---

### i = 3

```
"a"
```

---

Answer:

```
"bab"
```

---

# Time Complexity

For each index (`n` centers), the expansion can take up to `O(n)` in the worst case (e.g., `"aaaaa"`).

* **Time:** `O(n²)`
* **Space:** `O(1)` (ignoring the temporary substring objects)

### Note on optimization

This implementation creates a new `String` every time `expandFromCenter` returns a palindrome. A slightly more efficient version (often preferred in interviews) returns only the **length** of the palindrome and tracks the `start` and `end` indices. That avoids repeatedly creating substring objects during the search and constructs the answer only once at the end.

```
class Solution {
    public String longestPalindrome(String s) {
        
        if(s.length() < 2) return s;

        String maxStr = s.substring(0, 1);

        for(int i=0; i<s.length()-1; i++){
            
            String odd = expandFromCenter(s, i, i);
            String even = expandFromCenter(s, i, i+1);

            if(maxStr.length() < odd.length()) maxStr = odd;

            if(maxStr.length() < even.length()) maxStr = even;
        }

        return maxStr;
    }

    private String expandFromCenter(String s, int start, int end){

        while(start >= 0 && end < s.length() && s.charAt(start) == s.charAt(end)){
            start--;
            end++;
        }
         
        //if(start > end) return "";
        return s.substring(start+1, end);
    }
}
```
