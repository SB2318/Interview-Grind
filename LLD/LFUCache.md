# LFU Cache (Least Frequently Used) - Interview Notes

The **LFU Cache** is a step ahead of LRU Cache and is another popular Low-Level Design interview question.

---

# What is LFU Cache?

LFU (Least Frequently Used) Cache removes the item that has been **used the fewest number of times**.

If multiple items have the same frequency, remove the **Least Recently Used (LRU)** among them.

---

# Example

Capacity = 2

```text
put(1,10)

Cache
1(freq=1)
```

---

```text
put(2,20)

1(freq=1)
2(freq=1)
```

---

```text
get(1)

1(freq=2)
2(freq=1)
```

---

```text
put(3,30)
```

Cache Full

Who has minimum frequency?

```text
1 -> freq=2
2 -> freq=1
```

Remove

```text
2
```

Insert

```text
3(freq=1)
```

---

# Tie Case

Capacity = 2

```text
put(1)
put(2)

1(freq=1)
2(freq=1)
```

Now

```text
put(3)
```

Both have frequency = 1.

Remove

```text
Least Recently Used
```

So

```text
1 removed
```

---

# Operations

We need

```java
get(key)
put(key,value)
```

Both should work in

```text
O(1)
```

---

# Why LRU Cache is Not Enough?

LRU only remembers

```text
Recently Used
```

LFU remembers

```text
How many times used
```

Example

```text
A used 100 times yesterday

B used once just now
```

LRU keeps B.

LFU keeps A.

---

# Brute Force

Store frequency in HashMap

Whenever cache is full

Search minimum frequency.

Time

```text
O(n)
```

Not acceptable.

---

# Optimal Data Structures

We need

```text
HashMap
        +
Frequency Map
        +
Doubly Linked Lists
```

---

# Main Idea

Instead of one linked list (LRU),

Maintain

```text
Frequency 1

Head <-> A <-> B <-> Tail
```

```text
Frequency 2

Head <-> C <-> Tail
```

```text
Frequency 3

Head <-> D <-> E <-> Tail
```

Each frequency has its own LRU list.

---

# Data Structures

## 1. Node

Stores

```java
key
value
frequency
prev
next
```

---

## 2. keyNode Map

```java
HashMap<Integer, Node>
```

Stores

```text
Key
↓

Node
```

---

## 3. freqMap

```java
HashMap<Integer, DLL>
```

Stores

```text
Frequency
↓

Doubly Linked List
```

Example

```text
1 -> DLL

2 -> DLL

3 -> DLL
```

---

## 4. minFreq

Maintain

```text
Current Minimum Frequency
```

Very important.

Suppose

```text
Freq1 empty

Freq2 has nodes
```

Update

```text
minFreq = 2
```

Otherwise we won't know where to remove.

---

# Overall Structure

```text
keyNode Map

1 ---> Node1
2 ---> Node2
3 ---> Node3


freqMap

1 ---> DLL

2 ---> DLL

3 ---> DLL


minFreq = 1
```

---

# Node Structure

```java
class Node {

    int key;
    int value;
    int freq;

    Node prev;
    Node next;

    Node(int key,int value){
        this.key = key;
        this.value = value;
        freq = 1;
    }
}
```

---

# Doubly Linked List

Each frequency owns one DLL.

```text
Head

↓

A <-> B <-> C

↑

Tail
```

Newest

↓

Head

Oldest

↓

Tail

---

# DLL Functions

## addFirst(node)

Insert after head.

Time

```text
O(1)
```

---

## remove(node)

Delete node.

Time

```text
O(1)
```

---

## removeLast()

Delete LRU node.

Time

```text
O(1)
```

---

# get(key)

If key absent

```text
return -1
```

Otherwise

Increase frequency.

Move node from

```text
freq = x
```

to

```text
freq = x + 1
```

Return value.

---

# Frequency Update

Suppose

```text
Freq 1

A

B
```

Call

```text
get(A)
```

Remove

```text
A
```

Insert into

```text
Freq2
```

Result

```text
Freq1

B
```

```text
Freq2

A
```

---

# put(key,value)

Case 1

Key already exists

Update value

Increase frequency

---

Case 2

New key

Cache Full?

No

Insert into

```text
Freq1
```

Set

```text
minFreq = 1
```

---

Cache Full?

Yes

Remove

```text
Tail of minFreq DLL
```

Delete from map.

Insert new node.

---

# Why minFreq?

Without it,

Need to search

```text
Freq1

Freq2

Freq3

Freq4
```

Time

```text
O(n)
```

With

```text
minFreq
```

Always know

Which list to remove from.

---

# Dry Run

Capacity = 2

---

```text
put(1,10)

Freq1

1
```

---

```text
put(2,20)

Freq1

2

1
```

---

```text
get(1)
```

Move

```text
1

Freq1

↓

Freq2
```

Now

```text
Freq1

2
```

```text
Freq2

1
```

minFreq = 1

---

```text
put(3,30)
```

Cache Full

Evict

```text
Tail of Freq1

↓

2
```

Insert

```text
Freq1

3
```

Final

```text
Freq1

3
```

```text
Freq2

1
```

---

# Tie Example

Capacity = 2

```text
put(1)

put(2)
```

Both

```text
Freq1
```

List

```text
Head

2

1

Tail
```

Oldest

↓

1

Insert

```text
put(3)
```

Remove

```text
1
```

because it is

```text
Least Recently Used
```

inside

```text
Freq1
```

---

# Complexity

| Operation     | Time | Space       |
| ------------- | ---- | ----------- |
| get           | O(1) | O(1)        |
| put           | O(1) | O(1)        |
| Overall Space | -    | O(capacity) |

---

# Difference: LRU vs LFU

| Feature         | LRU                 | LFU                            |
| --------------- | ------------------- | ------------------------------ |
| Eviction Basis  | Least Recently Used | Least Frequently Used          |
| Data Structures | HashMap + DLL       | HashMap + Frequency Map + DLLs |
| Tie Breaking    | Not Needed          | LRU within same frequency      |
| Extra Field     | None                | `freq`                         |
| Extra Variable  | None                | `minFreq`                      |

---

# Common Interview Questions

### Q1. Why one DLL is not enough?

A single DLL only tracks recency. LFU also needs to group nodes by frequency. Therefore, we maintain one DLL per frequency.

---

### Q2. Why `freqMap`?

It lets us jump directly to the linked list for a given frequency in **O(1)**.

---

### Q3. Why `minFreq`?

Without `minFreq`, we'd have to search all frequency lists to find the minimum frequency during eviction, making `put()` **O(n)**.

---

### Q4. Why use a Doubly Linked List for each frequency?

Within the same frequency, we must evict the **Least Recently Used** item. A DLL supports insertion at the front and removal from the back in **O(1)**.

---

### Q5. What happens during `get()`?

* Find the node using `keyNode` map.
* Remove it from its current frequency list.
* Increase its frequency.
* Add it to the front of the next frequency list.
* Update `minFreq` if necessary.
* Return its value.

---

# Easy Interview Explanation (45 seconds)

> "An LFU Cache combines a `HashMap` with multiple Doubly Linked Lists. The `HashMap` stores `key → node` for constant-time lookup. Each node stores its current frequency, and `freqMap` maps each frequency to a Doubly Linked List that maintains LRU order among nodes with the same frequency. On every `get()` or update, I increase the node's frequency by moving it from one list to the next. When the cache is full, I remove the least recently used node from the list corresponding to `minFreq`, then insert the new node into the frequency-1 list and reset `minFreq` to 1. This guarantees both `get()` and `put()` run in O(1) time.`
