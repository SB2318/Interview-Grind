# Trie Implementation Notes (Striver Style)

## What is a Trie?

A **Trie (Prefix Tree)** is a tree-like data structure used to efficiently store and search strings.

It is mainly used for:

* Search a word
* Check if a prefix exists
* Auto-complete
* Dictionary
* Spell Checker
* Word Search

---

# Intuition

Instead of storing complete words separately,

Store **one character per level**.

Example:

```
Words:
cat
car
can
dog
```

Trie

```
(root)
   |
   c
   |
   a
 / | \
t  r  n

(root)
   |
   d
   |
   o
   |
   g
```

Notice

```
ca
```

is shared by

```
cat
car
can
```

Hence memory is saved.

---

# Trie Node

Each node stores

```
1. Children
2. End of Word marker
```

In Java

```java
class Node {

    Node[] links = new Node[26];
    boolean flag = false;
}
```

Why 26?

```
'a' -> 0
'b' -> 1
...
'z' -> 25
```

---

# Helper Functions

## containsKey()

Checks whether child exists.

```java
boolean containsKey(char ch) {
    return links[ch - 'a'] != null;
}
```

---

## put()

Create child.

```java
void put(char ch, Node node) {
    links[ch - 'a'] = node;
}
```

---

## get()

Move to child.

```java
Node get(char ch) {
    return links[ch - 'a'];
}
```

---

## setEnd()

Marks word finished.

```java
void setEnd() {
    flag = true;
}
```

---

## isEnd()

Checks word finished.

```java
boolean isEnd() {
    return flag;
}
```

---

# Complete Node

```java
class Node {

    Node[] links = new Node[26];
    boolean flag = false;

    boolean containsKey(char ch) {
        return links[ch - 'a'] != null;
    }

    void put(char ch, Node node) {
        links[ch - 'a'] = node;
    }

    Node get(char ch) {
        return links[ch - 'a'];
    }

    void setEnd() {
        flag = true;
    }

    boolean isEnd() {
        return flag;
    }
}
```

---

# Trie Class

Every Trie starts with

```
Root
```

```
(root)
```

Initially empty.

```java
class Trie {

    Node root;

    Trie() {
        root = new Node();
    }
}
```

---

# Insert Operation

Example

```
Insert : apple
```

Start from root.

```
root
```

Read

```
a
```

No child?

Create it.

Move.

Read

```
p
```

Create if absent.

Move.

Continue until

```
e
```

Finally mark

```
End = true
```

---

## Dry Run

Insert

```
cat
```

Initially

```
root
```

After c

```
root
 |
 c
```

After a

```
root
 |
 c
 |
 a
```

After t

```
root
 |
 c
 |
 a
 |
 t*
```

`*` means end of word.

---

## Code

```java
void insert(String word) {

    Node node = root;

    for (char ch : word.toCharArray()) {

        if (!node.containsKey(ch)) {
            node.put(ch, new Node());
        }

        node = node.get(ch);
    }

    node.setEnd();
}
```

---

# Search Operation

Goal

```
Does complete word exist?
```

Example

```
cat
```

Traverse character by character.

If any character missing

```
return false
```

After last character,

Return

```
node.isEnd()
```

because

```
ca
```

may exist,

but

```
ca
```

might not be a complete word.

---

## Code

```java
boolean search(String word) {

    Node node = root;

    for (char ch : word.toCharArray()) {

        if (!node.containsKey(ch))
            return false;

        node = node.get(ch);
    }

    return node.isEnd();
}
```

---

# startsWith()

Question

```
Does this prefix exist?
```

Unlike search,

We don't care whether it is a word.

We only care whether path exists.

Example

```
Insert

apple
```

```
startsWith("app") = true
```

Even if

```
app
```

was never inserted.

---

## Code

```java
boolean startsWith(String prefix) {

    Node node = root;

    for (char ch : prefix.toCharArray()) {

        if (!node.containsKey(ch))
            return false;

        node = node.get(ch);
    }

    return true;
}
```

---

# Complete Implementation

```java
class Trie {

    class Node {

        Node[] links = new Node[26];
        boolean flag = false;

        boolean containsKey(char ch) {
            return links[ch - 'a'] != null;
        }

        void put(char ch, Node node) {
            links[ch - 'a'] = node;
        }

        Node get(char ch) {
            return links[ch - 'a'];
        }

        void setEnd() {
            flag = true;
        }

        boolean isEnd() {
            return flag;
        }
    }

    private Node root;

    Trie() {
        root = new Node();
    }

    public void insert(String word) {

        Node node = root;

        for (char ch : word.toCharArray()) {

            if (!node.containsKey(ch))
                node.put(ch, new Node());

            node = node.get(ch);
        }

        node.setEnd();
    }

    public boolean search(String word) {

        Node node = root;

        for (char ch : word.toCharArray()) {

            if (!node.containsKey(ch))
                return false;

            node = node.get(ch);
        }

        return node.isEnd();
    }

    public boolean startsWith(String prefix) {

        Node node = root;

        for (char ch : prefix.toCharArray()) {

            if (!node.containsKey(ch))
                return false;

            node = node.get(ch);
        }

        return true;
    }
}
```

---

# Time Complexity

| Operation  | Time |
| ---------- | ---- |
| Insert     | O(L) |
| Search     | O(L) |
| StartsWith | O(L) |

where **L = length of the word**.

---

# Space Complexity

Each node stores:

* 26 child pointers
* 1 boolean flag

Overall space is **O(total characters inserted)** (the constant factor is larger because every node reserves an array of 26 references).

---

# Key Interview Intuition

Think of a Trie as **a tree where every edge represents one character**.

* **Insert:** Walk character by character. If the path doesn't exist, create it. Mark the last node as the end of a word.
* **Search:** Walk the path. If any character is missing, the word doesn't exist. At the end, check the end-of-word flag.
* **StartsWith:** Walk the path. If every character exists, the prefix exists—no need to check the end-of-word flag.

> **One line to remember:**
> **HashMap stores whole words; Trie stores one character at a time, sharing common prefixes to make prefix operations efficient.**
