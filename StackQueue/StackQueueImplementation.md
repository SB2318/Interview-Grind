
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
