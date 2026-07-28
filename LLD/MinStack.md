# Min Stack (Striver Style) – Notes

## Idea

Use **only one stack** and one variable `mini`.

* If the new element is **not smaller** than the current minimum, push it normally.
* If the new element **is smaller**, push an **encoded value** instead of the actual value and update `mini`.

This allows all operations in **O(1)** time using only one stack.

---

## Data Members

```java
Stack<Long> st;
long mini;
```

> Use `long` to avoid integer overflow while encoding.

---

# Push Operation

### Case 1: Stack is empty

```java
mini = x;
st.push(x);
```

---

### Case 2: x ≥ mini

Push normally.

```java
st.push(x);
```

---

### Case 3: x < mini

A new minimum is found.

Store

```text
encoded = 2*x - mini
```

Then update

```text
mini = x
```

```java
st.push(2*x - mini);
mini = x;
```

---

# Why encode?

Suppose

```text
oldMin = 5
x = 3
```

If we simply push `3`

```text
Stack = [5,3]
mini = 3
```

After popping `3`, we lose the information that the previous minimum was `5`.

So instead, we push

```text
encoded = 2*x - oldMin
```

```text
= 2*3 - 5
= 1
```

Stack becomes

```text
Stack = [5,1]
mini = 3
```

---

# Important Property

For every encoded value,

```text
encoded < current minimum
```

### Proof

Since

```text
x < oldMin
```

Subtract `oldMin`

```text
x - oldMin < 0
```

Add `x`

```text
2x - oldMin < x
```

But

```text
current minimum = x
```

Therefore

```text
encoded < current minimum
```

This is how we identify an encoded value.

---

# Pop Operation

### Case 1

```text
top >= mini
```

It is a normal value.

```java
st.pop();
```

---

### Case 2

```text
top < mini
```

It is an encoded value.

Recover the previous minimum.

Formula:

```text
oldMin = 2*mini - encoded
```

```java
mini = 2*mini - st.peek();
st.pop();
```

---

# Derivation of Recovery Formula

Encoded value is

```text
encoded = 2*x - oldMin
```

Since

```text
x = current minimum = mini
```

Substitute

```text
encoded = 2*mini - oldMin
```

Rearrange

```text
oldMin = 2*mini - encoded
```

---

# Top Operation

### Case 1

```text
top >= mini
```

Return top.

---

### Case 2

```text
top < mini
```

Top is encoded.

Actual top element is the current minimum.

```java
return mini;
```

---

# getMin()

```java
return mini;
```

---

# Dry Run

### push(5)

```text
Stack = [5]
mini = 5
```

---

### push(2)

```text
encoded = 2*2 - 5
        = -1

Stack = [5,-1]
mini = 2
```

---

### push(1)

```text
encoded = 2*1 - 2
        = 0

Stack = [5,-1,0]
mini = 1
```

---

### top()

```text
Top = 0

0 < mini(1)

Return 1
```

---

### pop()

```text
encoded = 0

oldMin = 2*1 - 0
       = 2

Stack = [5,-1]
mini = 2
```

---

### pop()

```text
encoded = -1

oldMin = 2*2 - (-1)
       = 5

Stack = [5]
mini = 5
```

---

# Complexity

| Operation | Time | Space      |
| --------- | ---- | ---------- |
| push      | O(1) | O(1) extra |
| pop       | O(1) | O(1) extra |
| top       | O(1) | O(1)       |
| getMin    | O(1) | O(1)       |

---

# Formulas to Remember

### Push (new minimum)

```text
encoded = 2*x - mini
mini = x
```

### Recover previous minimum

```text
oldMin = 2*mini - encoded
```

### Identify encoded value

```text
top < mini
```

---

# Memory Trick

Think of `mini` as **the current minimum**, and the encoded value as **a hidden bookmark** that stores enough information to recover the **previous minimum**.

* **Normal value:** `top >= mini`
* **Encoded value:** `top < mini`
* **Recover previous minimum:** `2 × mini − encoded`

This is the key idea behind Striver's one-stack Min Stack implementation.


```
class MinStack {
    Stack<Long> stack;
    private long min;
    public MinStack() {
        stack = new Stack<>();
    }
    
    public void push(int value) {
        long x = value;
        if(stack.isEmpty()){
            min = x;
            stack.add(x);
        }
        else if(min <= x){
            stack.add(x);
        }else{

            long encoded = 2*x - min;
            min = x;
            stack.add(encoded);
        }
    }
    
    public void pop() {
        if(stack.isEmpty()) return;
        long top = stack.peek();

        if(top >= min){
            stack.pop(); // normal case , nothing to do
        }else{
            long val = 2*min - top;
            min = val;
            stack.pop();
        }
    }
    
    public int top() {
        
        long top = stack.peek();

        if(top >= min) return (int) top;
        return (int) min;
    }
    
    public int getMin() {
        return (int) min;
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * MinStack obj = new MinStack();
 * obj.push(value);
 * obj.pop();
 * int param_3 = obj.top();
 * int param_4 = obj.getMin();
 */
```
