
// Stack is a DS, that holds a certain type of data in LIFO order.

Stack track the most recent added element into the ds

## Implement Stack using array

```
class myStack {
    int[] arr;
    int top = -1;
    public myStack(int n) {
        // Define Data Structures
        arr = new int[n];
    }

    public boolean isEmpty() {
        // check if the stack is empty
        return top == -1;
    }

    public boolean isFull() {
        // check if the stack is full
        return top == arr.length-1;
    }

    public void push(int x) {
        // Inserts x at the top of the stack
        
        if(isFull()) return;
        arr[++top] = x;
    }

    public void pop() {
        // Removes an element from the top of the stack
        if(isEmpty()) return;
        top--;
    }

    public int peek() {
        // Returns the top element of the stack
        if(isEmpty()) return -1;
        return arr[top];
    }
}
```

## Implement Queue Using Array
 Queue is a DS, that holds a certain type of data in FIFO order.

### What is a Queue?

A Queue is a FIFO (First In, First Out) data structure.

- The first element inserted is the first element removed.
- Insertion happens at the rear.
- Deletion happens from the front.

<img width="1050" height="502" alt="image" src="https://github.com/user-attachments/assets/7cfa9693-1ee8-4e8a-a884-c6c909dfa619" />

### Key Points to Remember

- Queue follows FIFO (First In, First Out).
- front points to the first element; rear points to the last.
- An empty queue has front = rear = -1 and currSize = 0.
- A full queue satisfies currSize == size.
- Insert at the rear, remove from the front.
- Use (index + 1) % size to wrap around in a circular queue.
- Do not access arr[front] or arr[rear] after resetting them to -1.

```
class myQueue {

    // Constructor
    int[] arr;
    int size, currSize, front=-1, rear =-1;
    public myQueue(int n) {
        // Define Data Structures
        this.size = n;
        arr = new int[size];
    }

    public boolean isEmpty() {
        // Check if queue is empty
        return currSize == 0;
        
    }

    public boolean isFull() {
        // Check if queue is full
        return currSize == size;
    }

    public void enqueue(int x) {
        // Enqueue
        if(isFull()) return;
        if(isEmpty()){
            // initialize front and rear with 0
            front = 0;
            rear = 0;
        }
        else{
            rear = (rear+1)%size;
        }
        arr[rear] = x;
        currSize++;
    }

    public void dequeue() {
        // Dequeue
        if(isEmpty()) return ;
        if(currSize == 1){
            // destroy and reinitialize the queue
            front = -1;
            rear = -1;
            currSize = 0;
            
            return;
        }
        
        front= (front+1)%size;
        currSize--;
    }

    public int getFront() {
        // Get front element
        
        if(isEmpty()) return -1;
        return arr[front];
    }

    public int getRear() {
        // Get last element
        if(isEmpty()) return -1;
        return arr[rear];
    }
}

```

## Implement Stack using queue

```
class myStack {
    Queue<Integer> q = new LinkedList<>();

    void push(int x) {
        // Inserts an element x at the top of the stack
        int size = q.size();
        q.offer(x);
        
        for(int i=0; i<size; i++) q.offer(q.poll());
    }

    void pop() {
        // Removes an element from the top of the stack
        q.poll();
    }

    int top() {
        // Returns the top element of the stack
        // If stack is empty, return -1
        if(q.isEmpty()) return -1;
        return q.peek();
    }

    int size() {
        // Returns the current size of the stack
        return q.size();
    }
}

```

## Implement Queue using Stack

**Idea:** Make the front element always stay at the top of the main stack. During every enqueue(), use a temporary stack to rearrange the elements.

**Note:** Although only one stack (stack) is stored as a data member, this solution uses a temporary stack inside enqueue(). It is not the "one stack + recursion" approach.

<img width="1165" height="700" alt="image" src="https://github.com/user-attachments/assets/40ee704f-6620-4c02-ad8f-fe996e1c289f" />

### Key Points to Remember

- A queue follows FIFO (First In, First Out).
- In this implementation, the front element is always kept at the top of the stack.
- enqueue() is expensive because all existing elements must be moved to a temporary stack and then restored.
- dequeue() and front() are efficient because the front is already on top.

This is different from the one stack + recursion approach, where enqueue() is O(1) and dequeue() becomes O(n).

```
class myQueue {

    // Initialize your data members
    private Stack<Integer> stack = new Stack<>();

    void enqueue(int x) {
        // Implement enqueue operation
        
        Stack<Integer> temp = new Stack<>();
        
        while(!stack.isEmpty()){
            temp.add(stack.pop());
        }
        stack.add(x);
        while(!temp.isEmpty()){
            stack.add(temp.pop());
        }
        
    }

    void dequeue() {
        // Implement dequeue operation
        if(stack.isEmpty()) return;
        stack.pop();
    }

    int front() {
        // Implement front operation
        if(stack.isEmpty()) return -1;
        return stack.peek();
    }

    int size() {
        // Implement size operation
        return stack.size();
    }
}

```
