# LRU Cache (Least Recently Used) - Interview Notes

This is one of the most frequently asked Low-Level Design (LLD) questions in interviews.

---

# What is LRU Cache?

LRU (Least Recently Used) Cache is a data structure that stores a limited number of items.

When the cache becomes full,
the **least recently used item** is removed to make space for the new item.

**Example**

Capacity = 3

```
put(1,10)
Cache: [1]

put(2,20)
Cache: [2,1]

put(3,30)
Cache: [3,2,1]

get(2)
Cache: [2,3,1]   // 2 becomes recently used

put(4,40)
Cache: [4,2,3]   // 1 removed because it was least recently used
```

---

# Operations

We need only two operations.

### 1. get(key)

* If key exists

  * Return value.
  * Move it to the front (Most Recently Used).

* If key doesn't exist

  * Return -1.

---

### 2. put(key, value)

If key already exists

* Update value.
* Move it to front.

If key doesn't exist

* If cache is full

  * Remove Least Recently Used item.
* Insert new node at front.

---

# Interview Requirement

Both operations should work in

```
O(1) Time
```

Not O(n).

---

# Why not HashMap only?

HashMap gives

```
Search -> O(1)
Insert -> O(1)
Delete -> O(1)
```

But HashMap cannot tell

> Which element was least recently used?

So HashMap alone is not enough.

---

# Why not Doubly Linked List only?

Doubly Linked List can

* Add at front -> O(1)
* Remove last -> O(1)

But searching a key

```
O(n)
```

Too slow.

---

# Best Solution

Use

```
HashMap
        +
Doubly Linked List
```

This gives every operation in O(1).

---

# Role of Each Data Structure

## HashMap

Stores

```
key -> Node
```

Example

```
1 -> Node1
2 -> Node2
5 -> Node5
```

Allows instant access to any node.

---

## Doubly Linked List

Maintains order of usage.

```
Most Recently Used
        |
Head

10 <-> 20 <-> 30

               Tail
               |
Least Recently Used
```

Whenever an item is used

Move it near Head.

Whenever cache is full

Remove Tail.

---

# Why Doubly Linked List?

Suppose node is

```
10 <-> 20 <-> 30
```

Need to remove 20.

Using Doubly Linked List

```
20.prev.next = 20.next
20.next.prev = 20.prev
```

Only pointer changes.

Time

```
O(1)
```

With Singly Linked List

Need previous node.

Searching previous node

```
O(n)
```

Hence Doubly Linked List.

---

# Dummy Head and Tail

Instead of handling null every time,

Create two dummy nodes.

```
Head <-> Tail
```

Initially

```
Head <-> Tail
```

After insertion

```
Head <-> A <-> B <-> C <-> Tail
```

Advantages

* No null checks
* Cleaner code
* Easier insertion/deletion

---

# Node Structure

```java
class Node{
    int key;
    int value;

    Node prev;
    Node next;

    Node(int key,int value){
        this.key = key;
        this.value = value;
    }
}
```

---

# HashMap

```java
HashMap<Integer, Node> map;
```

Stores

```
Key
↓

Node Address
```

---

# Helper Function 1

## remove(node)

Before

```
A <-> B <-> C
```

Remove B

After

```
A <-> C
```

Code

```java
void remove(Node node){

    Node prev = node.prev;
    Node next = node.next;

    prev.next = next;
    next.prev = prev;
}
```

Time

```
O(1)
```

---

# Helper Function 2

## insert(node)

Insert after Head.

Before

```
Head <-> A
```

Insert B

After

```
Head <-> B <-> A
```

Code

```java
void insert(Node node){

    node.next = head.next;
    node.prev = head;

    head.next.prev = node;
    head.next = node;
}
```

Time

```
O(1)
```

---

# get(key)

Flow

```
Key exists?

      No
       |
      -1

      Yes
       |
Remove node
Insert at front
Return value
```

Code

```java
public int get(int key){

    if(!map.containsKey(key))
        return -1;

    Node node = map.get(key);

    remove(node);
    insert(node);

    return node.value;
}
```

---

# put(key,value)

Case 1

Key already exists

```
Update value

Move to front
```

Case 2

Key doesn't exist

If cache full

```
Remove Tail node

Delete from HashMap
```

Then

```
Create new node

Insert at front

Store in HashMap
```

---

# Full Algorithm

```
put(key,value)

↓

Key exists?

Yes
 |
Update value
Remove
Insert
Done

No
 |
Cache Full?

No
 |
Create node
Insert
HashMap

Yes
 |
Take Tail.prev
Remove
Delete from HashMap
Create node
Insert
HashMap
```

---

# Dry Run

Capacity = 2

```
put(1,10)

Head
 |
1
 |
Tail
```

Map

```
1 -> Node1
```

---

```
put(2,20)

Head

2

1

Tail
```

---

```
get(1)
```

Move 1 to front

```
Head

1

2

Tail
```

---

```
put(3,30)
```

Cache Full

Remove Tail

```
2 removed
```

Insert 3

```
Head

3

1

Tail
```

---

# Complexity

| Operation     | Time | Space       |
| ------------- | ---- | ----------- |
| get           | O(1) | O(1)        |
| put           | O(1) | O(1)        |
| Overall Space | -    | O(capacity) |

---

# Common Interview Questions

### Q1. Why HashMap + Doubly Linked List?

* HashMap provides **O(1)** lookup.
* Doubly Linked List maintains usage order with **O(1)** insertion and deletion.
* Together, both `get()` and `put()` become **O(1)**.

---

### Q2. Why not Queue?

Removing an element from the middle of a queue is **O(n)**, so it doesn't satisfy the required time complexity.

---

### Q3. Why move accessed node to the front?

Accessing an item means it is **recently used**, so it should no longer be a candidate for eviction.

---

### Q4. Why remove from the tail?

The tail always represents the **least recently used (LRU)** item.

---

### Q5. Why store the key inside each node?

When evicting the tail node, you must also remove its entry from the HashMap:

```java
map.remove(tail.prev.key);
```

Without storing the key in the node, you wouldn't know which map entry to delete efficiently.

---

```
// LRU Cache Implementation using Doubly LinkedList
class Node{
    int key, value;
    Node prev, next;

    public Node(int key, int value){
        this.key = key;
        this.value = value;
    }
}
class LRUCache {
    // head to track the front of the list
    // tail specifically to remove the least recent node
    private Node head, tail;
    private int capacity;
    HashMap<Integer, Node> map;

    public LRUCache(int capacity) {
        this.capacity = capacity;
        map = new HashMap<>();
        head = new Node(-1, -1);
        tail = new Node(-1, -1);

        head.next = tail;
        tail.prev = head;
    }
    
    public int get(int key) {
        
        if(!map.containsKey(key)){
            return -1;
        }
        Node n = map.get(key);
        // Remove it from its position and add it to the front as most rcently used
        remove(n);
        insert(n);
        return n.value;
    }
    
    private void remove(Node node){

        // break the link
        Node prev = node.prev;
        Node next = node.next;
        
        next.prev = prev;
        prev.next = next;
    }

    private void insert(Node node){
      
         node.prev = head;
         node.next = head.next;
         head.next.prev = node;
         head.next = node;

         map.put(node.key, node);
    }

    public void put(int key, int value) {
        
        // Case 1: Check is key already exist or not, then update the value;
        if(map.containsKey(key)){
            Node node = map.get(key);
            node.value = value;
            // add it to front as most recently used
            remove(node);
            insert(node);
            return;
        }

        // Case 2: Capacity exceed
        if(map.size() >= capacity ){
            // delete least recent node
            Node lru = tail.prev;
            remove(lru);
            map.remove(lru.key) ; // for this line we are storing key
        }

        // Add this fresh node
        Node newNode = new Node(key, value);
        insert(newNode);
    }
}

/**
 * Your LRUCache object will be instantiated and called as such:
 * LRUCache obj = new LRUCache(capacity);
 * int param_1 = obj.get(key);
 * obj.put(key,value);
 */
```

## JavaScript 
```

class LRUCache {
  constructor(capacity){
    this.capacity = capacity;
    this.cache = new Map();
  }
  get(key){
    if(!this.cache.has(key)) return -1;
    const value = this.cache.get(key);
    this.cache.set(key, value);
    return value;
  }

  put(key, value){
    if(this.cache.has(key)){
      this.cache.delete(key);
    }
    this.cache.set(key, value);
    if(this.cache.size >= capacity){
      //JavaScript maintains maps in order
      const oldest = this.cache.keys().next();
      this.cache.delete(oldest);
    }
  }
}

```
# Easy Interview Explanation (30 seconds)

> "To implement an LRU Cache in O(1), I combine a HashMap and a Doubly Linked List. The HashMap stores `key → node` for constant-time lookup, while the Doubly Linked List maintains the usage order, with the most recently used item at the front and the least recently used at the back. On every `get()` or existing `put()`, I move the node to the front. When the cache is full, I remove the node at the tail and delete its key from the HashMap. This ensures both `get()` and `put()` run in O(1) time."
