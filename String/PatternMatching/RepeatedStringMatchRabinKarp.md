# Rabin-Karp Algorithm – Complete Notes (Java)

---

# What is Rabin-Karp?

Rabin-Karp is a **string matching algorithm** used to find whether a **pattern** exists inside a **text**.

Instead of comparing every character for every window (like the naive approach), it:

1. Computes a **hash** of the pattern.
2. Computes the **hash** of the current text window.
3. Compares the hashes.
4. Only if the hashes match, it compares the characters.

---

# Why use Hashing?

Suppose

```text
Text    : AABAACAADAABAABA
Pattern : AABA
```

Naive approach:

```text
AABA ✓
ABAA ✗
BAAC ✗
AACA ✗
...
```

Every window compares characters.

Instead, Rabin-Karp computes

```text
Pattern Hash = 57

Window 1 Hash = 57 ✓
Window 2 Hash = 21 ✗
Window 3 Hash = 89 ✗
```

Different hash?

➡️ Skip immediately.

Same hash?

➡️ Verify characters.

This avoids many unnecessary comparisons.

---

# Hash Formula

For a string of length **m**

```text
Hash = (c₁ × BASE^(m-1)
      + c₂ × BASE^(m-2)
      + ...
      + cₘ × BASE^0) % PRIME
```

where

* `c` = ASCII value of character
* `BASE = 256`
* `PRIME = 101`

---

# Why BASE = 256?

Because there are **256 ASCII characters**.

Each character is treated like a digit in a base-256 number.

---

# Why PRIME = 101?

Without modulo, hash values become enormous.

Example

```text
256^20
```

is huge.

So we keep every calculation under a prime number.

```java
hash = hash % PRIME;
```

This

* keeps numbers small,
* reduces overflow,
* helps distribute hash values.

---

# Step 1 — Calculate Power

```java
long power = 1;

for(int i = 0; i < patternLength - 1; i++)
    power = (power * BASE) % PRIME;
```

This computes

```text
power = BASE^(patternLength-1) % PRIME
```

---

# Why do we need this power?

Suppose

```text
Window

A B C D
```

Hash

```text
A×256³ + B×256² + C×256¹ + D
```

The first character contributes

```text
A × 256³
```

When the window moves

```text
ABCD
 ↓
BCDE
```

the contribution of **A** must be removed.

To remove it we need

```text
256³
```

which is

```text
BASE^(patternLength-1)
```

That value is stored in

```java
power
```

---

# Why is the same `power` used everywhere?

This is one of the most important observations.

Suppose the pattern length is **4**.

Every sliding window has length **4**.

```text
Window 1

A B C D

Window 2

B C D E

Window 3

C D E F
```

Notice something?

The **leftmost character** is **always** multiplied by the highest power.

```text
Window 1

A × BASE³

Window 2

B × BASE³

Window 3

C × BASE³
```

Only the character changes.

The exponent never changes because **every window has the same length**.

Therefore,

```text
Highest Power

=

BASE^(patternLength-1)
```

is always the same.

We compute it **once** before sliding.

If we recomputed it every iteration, we'd waste time.

So

```java
power
```

is reused for every window.

---

# Initial Hash

Pattern

```java
patternHash = (patternHash * BASE + pattern.charAt(i)) % PRIME;
```

Window

```java
textHash = (textHash * BASE + text.charAt(i)) % PRIME;
```

After this

```text
Pattern Hash

Window Hash
```

are ready.

---

# Sliding Window

```java
for(int i = 0; i <= m - n; i++)
```

where

```text
n = pattern length

m = text length
```

---

# If Hashes Match

```java
if(patternHash == textHash)
```

Now compare every character.

```java
int j = 0;

while(j < n &&
      pattern.charAt(j) == text.charAt(i+j))
    j++;

if(j == n)
    return true;
```

Why?

Because different strings can sometimes have the same hash.

This is called a

```text
Hash Collision
```

or

```text
Spurious Hit
```

---

# Understanding the Rolling Hash

This is the heart of Rabin-Karp.

```java
if(i < m-n){

    textHash = (textHash - text.charAt(i)*power) % PRIME;

    if(textHash < 0)
        textHash += PRIME;

    textHash = (textHash * BASE + text.charAt(i+n)) % PRIME;
}
```

Let's understand every line.

---

## Why `if(i < m-n)`?

Suppose

```text
Text length = 10

Pattern length = 4
```

Possible windows

```text
0
1
2
3
4
5
6
```

Last window starts at

```text
10 - 4 = 6
```

After checking window **6**, there is **no next window**.

So we update the hash only if another window exists.

Hence

```java
if(i < m-n)
```

---

## Step 1 — Remove Leftmost Character

```java
textHash =
(textHash - text.charAt(i)*power)
% PRIME;
```

Suppose

```text
Window

A B C D
```

Hash

```text
A×BASE³
+
B×BASE²
+
C×BASE¹
+
D
```

When sliding

```text
ABCD
↓

BCDE
```

A disappears.

So remove

```text
A×BASE³
```

This is why we multiply by

```java
power
```

because

```text
power = BASE^(patternLength-1)
```

---

## Step 2 — Fix Negative Hash

Java's `%` operator can produce a negative value.

Example

```java
-5 % 101
```

returns

```text
-5
```

Hash values should always be positive.

So

```java
if(textHash < 0)
    textHash += PRIME;
```

makes it positive again.

---

## Step 3 — Shift Remaining Characters

```java
textHash = textHash * BASE;
```

In your implementation, this multiplication is combined with adding the next character:

```java
textHash = (textHash * BASE + text.charAt(i+n)) % PRIME;
```

Multiplying by `BASE` shifts every remaining character one position to the left.

Example

Current window

```text
A B C D
```

After removing `A`

```text
B C D
```

Multiplying by `BASE`

```text
B×BASE³
+
C×BASE²
+
D×BASE¹
```

Now the remaining characters occupy their correct positions for the next window.

---

## Step 4 — Add the New Character

Finally

```java
textHash =
(textHash * BASE + text.charAt(i+n))
% PRIME;
```

adds

```text
E×BASE⁰
```

Result

```text
B C D E
```

Now the hash represents the next window.

---

# Complete Sliding Process

Current window

```text
A B C D
```

↓

Remove

```text
A
```

↓

Remaining

```text
B C D
```

↓

Shift

```text
B C D _
```

↓

Add

```text
E
```

↓

New window

```text
B C D E
```

This entire process takes

```text
O(1)
```

instead of recomputing the hash from scratch in

```text
O(patternLength)
```

---

## Hash Updation

This is the **heart of Rabin-Karp**. Let's understand **every line** with one example.

Suppose

```text
Pattern = ABCD
Text    = ABCDEFG
```

Current window:

```text
A B C D
```

Next window:

```text
B C D E
```

Our goal is to update the hash of **ABCD** into the hash of **BCDE** **without recalculating everything**.

---

# Initial Hash

Current hash represents

```text
A×BASE³ + B×BASE² + C×BASE¹ + D×BASE⁰
```

Assume this value is stored in

```java
textHash
```

---

# Line 1

```java
textHash = (textHash - text.charAt(i) * power) % PRIME;
```

## Why?

Current hash contains

```text
A×BASE³
+
B×BASE²
+
C×BASE¹
+
D
```

The next window is

```text
B C D E
```

So **A is leaving the window**.

We subtract its contribution.

Since

```text
power = BASE³
```

we remove

```text
A × BASE³
```

After subtraction, the hash becomes

```text
B×BASE²
+
C×BASE¹
+
D
```

Notice that only **A** disappeared.

---

# Why multiply by `power`?

Because the first character always has the highest power.

For a window of length 4

```text
A B C D

↓

A×BASE³
```

For another window

```text
B C D E

↓

B×BASE³
```

For another

```text
C D E F

↓

C×BASE³
```

Only the character changes.

The exponent never changes.

That's why we compute

```java
power = BASE^(patternLength-1)
```

once and reuse it.

---

# Line 2

```java
if(textHash < 0)
    textHash += PRIME;
```

## Why?

Java modulo can return a negative value.

Example

```java
-30 % 101
```

gives

```text
-30
```

Hashes should always stay between

```text
0 ... PRIME-1
```

So we make it positive.

Example

```text
-30

↓

-30 + 101

↓

71
```

Now the hash is valid again.

---

# Line 3

```java
textHash = (textHash * BASE + text.charAt(i+n)) % PRIME;
```

This line actually performs **two operations**.

---

## Step A — Shift Left

```java
textHash * BASE
```

Why?

After removing `A`, we have

```text
B×BASE²
+
C×BASE¹
+
D
```

But the next window is

```text
B C D E
```

Here,

```text
B
```

must become

```text
B×BASE³
```

Similarly,

```text
C×BASE¹

↓

C×BASE²
```

and

```text
D

↓

D×BASE¹
```

Multiplying the entire hash by `BASE` shifts every remaining character **one position to the left**.

Now we have

```text
B×BASE³
+
C×BASE²
+
D×BASE¹
```

Notice one position is now free.

```text
B C D _
```

---

## Step B — Add the New Character

```java
+ text.charAt(i+n)
```

Now add

```text
E
```

which occupies

```text
BASE⁰
```

Final hash

```text
B×BASE³
+
C×BASE²
+
D×BASE¹
+
E
```

Exactly the hash of

```text
BCDE
```

---

# Entire Flow

Current window

```text
A B C D
```

Hash

```text
A×BASE³
+
B×BASE²
+
C×BASE¹
+
D
```

---

### Remove outgoing character

```java
textHash =
textHash - A×BASE³
```

Result

```text
B×BASE²
+
C×BASE¹
+
D
```

---

### Shift

```java
textHash *= BASE;
```

Result

```text
B×BASE³
+
C×BASE²
+
D×BASE¹
```

---

### Add incoming character

```java
+ E
```

Result

```text
B×BASE³
+
C×BASE²
+
D×BASE¹
+
E
```

Done!

New window:

```text
B C D E
```

---

# Why `if(i < m-n)`?

```java
if(i < m-n)
```

Suppose

```text
Text Length = 8

Pattern Length = 4
```

Possible windows

```text
0 → ABCD

1 → BCDE

2 → CDEF

3 → DEFG

4 → EFGH
```

When you're at the **last window (index 4)**, there is **no next window**.

If you still try to execute

```java
text.charAt(i+n)
```

you'll access an invalid index and get an `IndexOutOfBoundsException`.

So we only update the hash if another window exists.

---

# Easy way to remember

```text
Current Window

A B C D

↓

1. Remove A
2. Shift B C D
3. Add E

↓

B C D E
```

The rolling hash update is just these three logical operations:

```java
// 1. Remove outgoing character
textHash = (textHash - text.charAt(i) * power) % PRIME;

// 2. Make hash positive
if (textHash < 0)
    textHash += PRIME;

// 3. Shift remaining characters and add incoming character
textHash = (textHash * BASE + text.charAt(i + n)) % PRIME;
```

This lets Rabin-Karp update the next window's hash in **O(1)** time instead of recomputing the entire hash in **O(patternLength)**.

# Complexity

### Initial Hash

```text
O(pattern length)
```

### Sliding

```text
O(text length)
```

### Average

```text
O(n + m)
```

### Worst

If every hash matches,

```text
Compare every character every time
```

Complexity becomes

```text
O(n × m)
```

same as the naive algorithm.

---

# Interview Summary

```text
Naive

Compare Characters

↓

O(n × m)

------------------------------------

Rabin-Karp

Calculate Pattern Hash

↓

Calculate First Window Hash

↓

Compare Hashes

↓

Hash Match?

↓

Yes → Verify Characters

↓

Slide Window using Rolling Hash

↓

Repeat

Average: O(n + m)

Worst: O(n × m)
```

## Key Takeaways

1. **Hashes are compared before characters**, reducing unnecessary comparisons.
2. **`power = BASE^(patternLength-1)`** represents the weight of the leftmost character and is computed once because every window has the same size.
3. The rolling hash update has four logical steps:

   * Remove the outgoing (leftmost) character.
   * Ensure the hash is non-negative.
   * Shift the remaining characters by multiplying by `BASE`.
   * Add the incoming (rightmost) character.
4. Updating the hash takes **O(1)**, which is what makes Rabin-Karp efficient on average.

# Complete Solution (Leetcode 686)

```
class Solution {
    private int BASE = 256;
    private int PRIME = 101;

    public int repeatedStringMatch(String a, String b) {
        int count = 0;
        StringBuilder repeat = new StringBuilder();

        while(repeat.length() < b.length()){
            repeat.append(a); count++;
        }

        if(rabinCarp(b, repeat.toString())) return count;
        // One extra repeatation may needed
        repeat.append(a); count++;
        if(rabinCarp(b, repeat.toString())) return count;

        return -1;
    }

    private boolean rabinCarp(String pattern, String text){
        int n = pattern.length();
        int m = text.length();

        if(n > m) return false;
        // calculate power
        long power = 1;
        for(int i=0; i<n-1; i++) power = (power*BASE)%PRIME;

        // calculate patternHash and textHash initial, textHash is your windowHash
        long patternHash = 0;
        long textHash = 0;

        for(int i=0; i<n; i++){
           patternHash = (patternHash*BASE + pattern.charAt(i))%PRIME;
           textHash = (textHash*BASE + text.charAt(i))%PRIME;
        }

        // Sliding window
        for(int i=0; i<=m-n; i++){

            if(patternHash == textHash){

                int j = 0;
                // check every character
                while(j<n && pattern.charAt(j) == text.charAt(i+j)) j++;

                if(j== n) return true;
            }
            if(i< m-n){
                // remove leftmost character
                textHash = (textHash - text.charAt(i)*power)%PRIME;

                if(textHash < 0) textHash += PRIME;

                // add new character
                textHash = (textHash*BASE + text.charAt(i+n))%PRIME;
            }
        }
        return false;
    }
}

```



