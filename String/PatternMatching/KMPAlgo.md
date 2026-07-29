
Yes. **KMP and the Z-Algorithm are closely related.** Both solve the same fundamental problem:

> **How much of the pattern matches at the current position without rechecking characters?**

The difference is **what information they store**.

| Z Algorithm                                              | KMP                                                           |
| -------------------------------------------------------- | ------------------------------------------------------------- |
| Stores prefix matches starting at each position (`Z[i]`) | Stores longest proper prefix that is also a suffix (`LPS[i]`) |
| Uses `L` and `R` (Z-box)                                 | Uses the `LPS` array                                          |
| Time: O(n)                                               | Time: O(n)                                                    |
| Often easier for pattern matching                        | More commonly asked in interviews                             |

---

# 1. Motivation

Suppose

```text
Pattern = ABABCABAB
Text    = ABABDABABCABAB
```

Naive matching:

```text
ABABCABAB
ABABDABABCABAB
^^^^
```

Four characters match.

At the fifth character,

```text
C != D
```

Naive algorithm restarts from the next position, wasting previous comparisons.

KMP asks:

> "How much of the matched prefix can still be useful?"

---

# 2. LPS Array

LPS = **Longest Proper Prefix which is also Suffix**

For every index,

```text
LPS[i]
```

stores

> the length of the longest prefix that is also a suffix of `pattern[0...i]`.

---

## Example

Pattern

```text
A B A B A C
```

### Index 0

```text
A
```

Proper prefixes

```text
{}
```

Suffixes

```text
{}
```

LPS

```text
0
```

---

### Index 1

```text
AB
```

Prefixes

```text
A
```

Suffixes

```text
B
```

No match

```text
LPS = 0
```

---

### Index 2

```text
ABA
```

Prefixes

```text
A
AB
```

Suffixes

```text
A
BA
```

Longest common

```text
A
```

So

```text
LPS = 1
```

---

### Entire table

Pattern

```text
A B A B A C
```

LPS

```text
0 0 1 2 3 0
```

---

# 3. Building LPS

Maintain

```java
len
```

which represents

> length of the previous longest prefix-suffix.

Initially

```java
len = 0;
i = 1;
```

---

## Case 1

Characters match

```java
pattern.charAt(i) == pattern.charAt(len)
```

Example

```text
A B A
    ↑
A
↑
```

Increase

```java
len++;
lps[i] = len;
i++;
```

---

## Case 2

Mismatch

If

```java
len != 0
```

don't restart.

Instead

```java
len = lps[len-1];
```

This is the most important step in KMP.

---

### Why?

Suppose

```text
Pattern

ABABC
^^^^
```

Matched

```text
ABAB
```

Mismatch at

```text
C
```

We already know

```text
AB
```

is both a prefix and a suffix.

Instead of restarting,

jump directly to

```text
AB
```

This avoids rechecking characters.

---

## Case 3

Mismatch

and

```java
len == 0
```

Then

```java
lps[i] = 0;
i++;
```

---

# 4. LPS Construction Algorithm

```java
private int[] buildLPS(String pat) {

    int n = pat.length();
    int[] lps = new int[n];

    int len = 0;
    int i = 1;

    while (i < n) {

        if (pat.charAt(i) == pat.charAt(len)) {

            len++;
            lps[i] = len;
            i++;

        } else {

            if (len != 0) {

                len = lps[len - 1];

            } else {

                lps[i] = 0;
                i++;
            }
        }
    }

    return lps;
}
```

---

# 5. Pattern Matching

Suppose

```text
Pattern = ABABC
Text = ABABABC
```

Maintain

```java
i -> text
j -> pattern
```

If

```java
text[i] == pattern[j]
```

move both

```java
i++;
j++;
```

If

```java
j == pattern.length()
```

Pattern found.

Start searching again using

```java
j = lps[j-1];
```

---

## Mismatch

If

```java
j != 0
```

don't move `i`.

Only

```java
j = lps[j-1];
```

Example

```text
Text

ABABABC

Pattern

ABABC
```

Mismatch after matching

```text
ABAB
```

Instead of

```text
ABABC
 ^
```

restart from

```text
ABABC
  ^^
```

using the LPS value.

---

# 6. Complete KMP Search

```java
ArrayList<Integer> search(String pat, String txt) {

    ArrayList<Integer> ans = new ArrayList<>();
    int[] lps = buildLPS(pat);

    int i = 0, j = 0;

    while (i < txt.length()) {

        if (txt.charAt(i) == pat.charAt(j)) {
            i++;
            j++;
        }

        if (j == pat.length()) {
            ans.add(i - j);
            j = lps[j - 1];
        }

        else if (i < txt.length() &&
                 txt.charAt(i) != pat.charAt(j)) {

            if (j != 0)
                j = lps[j - 1];
            else
                i++;
        }
    }

    return ans;
}
```

---

# 7. Z vs KMP: Connecting the Concepts

Think of them as two ways of reusing previous work:

| Z Algorithm                                                                     | KMP                                                                        |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Reuses information using the current **Z-box** `[L, R]`.                        | Reuses information using the **LPS** array.                                |
| `Z[i]` tells you how many characters from the **prefix** match starting at `i`. | `LPS[i]` tells you the longest prefix that is also a suffix ending at `i`. |
| Excellent for building prefix-match information over the whole string.          | Excellent for streaming pattern matching through a text.                   |

A useful way to remember them is:

* **Z asks:** *"If I start matching from position `i`, how much of the prefix matches?"*
* **KMP asks:** *"After a mismatch, what is the longest prefix I've already matched that I can safely continue with?"*

Both achieve **O(n)** by ensuring that previously matched characters are never unnecessarily compared again.
