# C Fundamentals Notes 


## 1. C Program Structure

## Basic program:

```
#include <stdio.h>
int main() {
printf("Hello World");
return 0;
}
```

## Important concepts

- #include → preprocessor directive

- stdio.h → standard input/output library

- main() → program entry point

- return 0 → successful termination

## Interview question

```
Q: Why does return ?
```

Because the return value is passed to the operating system as the program's exit status.

## 2. Data Types

## Primary types


char

int

float

double

void

## Modifiers:

short

long

signed

unsigned

## Example:

```
int age = 26;
float price = 10.5f;
double pi = 3.14159;
char grade = 'A';
```

## Signed vs unsigned

```
int x = -10;
unsigned int y = 10;
```

An unsigned integer cannot represent negative values and therefore provides a larger non-negative range for the same number of bits.

## Important

Don't memorize exact sizes blindly because they can depend on implementation/platform.

## Common modern systems:

```
char → 1 byte
int → 4 bytes
float → 4 bytes
double → 8 bytes
```


## 3. Variables and Memory

Consider:

```
int x = 10;
```

## Conceptually:

```
Memory
+----------+
| 10 |
+----------+
↑
x
```

- x represents an object stored somewhere in memory.

To get its address:

```
printf("%p", (void*)&x);
```

&x means:

Address of x

## 4. Pointers

This is probably the most important C topic for your interview.

```
int x = 10;
int *p = &x;
```

## Think:


└──────┘

0x100

p

┌──────┐

└──────┘

p stores the address of x .

Address-of operator:

&x

means:

Give me the address of x.

Dereference operator:

*p

## means:

Access the value stored at the address contained in p.

## Therefore:

```
int x = 10;
int *p = &x;
printf("%d", *p);
```

## prints:

10


## 5. Modifying Through a Pointer

```
int x = 10;
int *p = &x;
*p = 20;
```

## Now:

x = 20

Because *p refers to the same memory location as x .

## 6. Pointer to Pointer

Very common interview question.

```
int x = 10;
int *p = &x;
int **pp = &p;
```

## Therefore:

```
x → 10
*p → 10
**pp → 10
```

## 7. NULL Pointer

int *p = NULL;

It means the pointer currently doesn't point to a valid object.

## Never do:

*p = 10;

if p == NULL .

That can cause undefined behavior, commonly resulting in a segmentation fault.

## Interview answer

A NULL pointer represents the absence of a valid target address. Dereferencing it is invalid.

## 8. Dangling Pointer

A dangling pointer points to memory that is no longer valid.

## Example:

```
int *p = malloc(sizeof(int));
free(p);
*p = 10; // Wrong
```


After free(p) , p should not be dereferenced.

A common defensive practice:

```
free(p);
p = NULL;
```

## 9. Wild Pointer

A pointer that has not been initialized.

int *p;

p contains an indeterminate value.

Doing:

*p = 10;

is dangerous.

Better:

```
int *p = NULL;
```

## 10. Memory Allocation

This is highly relevant for a C/programmer interview.

C provides dynamic memory allocation through:

```
malloc()
calloc()
realloc()
free()
```


## malloc()

```
int *arr = malloc(5 * sizeof(int));
```

Allocates enough memory for 5 integers.

The memory is not initialized.

## calloc()

```
int *arr = calloc(5, sizeof(int));
```

Allocates memory for 5 integers and initializes the allocated bytes to zero.

## Difference

```
malloc
↓
allocate memory
↓
uninitialized contents
calloc
↓
allocate memory
↓
zero-initialized
```

## 11. realloc()

Used to resize an existing allocation.

```
int *arr = malloc(5 * sizeof(int));
arr = realloc(arr, 10 * sizeof(int));
```


Now the allocation is resized to accommodate 10 integers, subject to the usual realloc rules.

## Safer pattern:

```
int *temp = realloc(arr, 10 * sizeof(int));
if (temp != NULL) {
arr = temp;
}
```

## Why?

Because directly assigning realloc() to arr can lose the original pointer if reallocation fails.

## 12. free()

Dynamic memory must eventually be released:

```
int *p = malloc(sizeof(int));
free(p);
p = NULL;
```

## Interview question

What happens if you don't free dynamically allocated memory?

You can create a memory leak.

## 13. Stack vs Heap

Very important.

## Stack

Usually contains:


- Local variables

- Function call frames

- Parameters

- Return information

## Example:

```
void test() {
int x = 10;
}
```

- x has automatic storage duration associated with the function's execution.

## Heap

Used for dynamically allocated memory:

```
int *p = malloc(sizeof(int));
```


## Interview answer

Stack memory is automatically managed around function execution, while dynamically allocated heap memory is managed explicitly through allocation and deallocation functions such as malloc and free.


## 14. Arrays

```
int arr[5] = {10, 20, 30, 40, 50};
```

## Memory is contiguous:

└────┴────┴────┴────┴────┘

## Indexing:

arr[0]

arr[1]

arr[2]

## 15. Arrays and Pointers

## Very important.

```
int arr[3] = {10, 20, 30};
```

In most expressions, arr behaves like a pointer to the first element.

## Conceptually:

```
arr
↓
&arr[0]
```

## Therefore:

```
arr[0]
```


## is equivalent to:

```
*(arr + 0)
```

## and:

arr[2]

is equivalent to:

```
*(arr + 2)
```

## Important nuance

An array is not literally a pointer. The array-to-pointer conversion happens in most expressions.

Interviewers may specifically test this distinction.

## 16. Pointer Arithmetic

## Suppose:

```
int arr[] = {10, 20, 30};
int *p = arr;
```

## Then:

p

points to arr[0] .

p + 1

points to arr[1] .


```
p + 2
```

points to arr[2] .

The compiler automatically scales pointer arithmetic according to the pointed-to type.

```
So if int is 4 bytes, p + 1 advances by 4 bytes.
```

## 17. Strings

C doesn't have a built-in high-level string type.

A string is generally represented as a sequence of characters ending with:

```
'\0'
```

## Example:

```
char name[] = "Susmita";
```

## Memory:

```
S u s m i t a \0
```

Therefore:

```
strlen(name)
```

doesn't count the terminating '\0' .

## 18. Important String Functions

## From:

#include <string.h>


## Know:

```
strlen()
strcpy()
strncpy()
strcmp()
strcat()
strstr()
```

Be particularly careful with buffer sizes when using copying/concatenation functions.

## 19. Struct

Structures allow you to group different data types.

```
struct Student {
char name[50];
int age;
float marks;
};
```

## Usage:

```
struct Student s;
s.age = 26;
s.marks = 85.5;
```

## Pointer to struct:

```
struct Student *p = &s;
```

## Access:

```
p->age
```

## is equivalent to:


## 20. typedef

## Instead of:

struct Student s;

## you can define:

```
typedef struct {
char name[50];
int age;
} Student;
```

## Then:

Student s;

## 21. Functions

## Basic:

```
int add(int a, int b) {
return a + b;
}
```

## Call:

```
int result = add(10, 20);
```

## 22. Pass by Value


## C uses pass-by-value.

```
void change(int x) {
x = 100;
}
int a = 10;
change(a);
```

a remains:

10

because x receives a copy.

## 23. Simulating Modification Through Pointers

```
void change(int *x) {
*x = 100;
}
int a = 10;
change(&a);
```

## Now:

```
a = 100
```

## Important interview statement:

C is pass-by-value. When we want a function to modify the caller's object, we pass its address.

## 24. Recursion

A function calling itself.


```
int factorial(int n) {
if (n <= 1)
return 1;
return n * factorial(n - 1);
}
```

## You must understand:

```
factorial(4)
↓
4 * factorial(3)
↓
3 * factorial(2)
↓
2 * factorial(1)
```

Each call creates a new stack frame.

## 25. static

static has different meanings depending on where it is used.

## Local static variable

```
void counter() {
static int count = 0;
count++;
printf("%d\n", count);
}
```

Unlike an ordinary local variable, count retains its value between function calls.

## File-scope static

A file-scope static variable/function has internal linkage, meaning it is limited to that translation unit.


This distinction is worth knowing for an interview.

## 26. const

```
const int x = 10;
```

You cannot normally modify x through that identifier.

Pointers create common interview questions.

```
const int *p;
```

Pointer to const integer.

```
int *const p = &x;
```

Constant pointer.

```
const int *const p = &x;
```

Constant pointer to constant integer.

Remember:

```
const int *p
↑
data is const
int *const p
↑
pointer is const
```

## 27. vs

## Struct


Each member has separate storage.

```
struct A {
int x;
float y;
};
```

## Union

Members share the same memory.

```
union A {
int x;
float y;
};
```

Only one member's stored representation should generally be treated as active at a time.

## 28. Enum

```
enum Status {
SUCCESS,
FAILED,
PENDING
};
```

Useful for representing named integral constants.

## 29. Preprocessor

Example:

```
#define MAX 100
```

The preprocessor handles directives before compilation.


## Important directives:

```
#include
#define
#ifdef
#ifndef
#if
#else
#endif
```

## 30. Header Files

## Example:

```
#include <stdio.h>
```

Header files generally contain declarations, macros, types, etc., that can be shared between source files.

## You might create:

```
math.h
math.c
main.c
```

Then compile/link them together.

## 31. Compilation Process

This is particularly useful for a technical/research programmer interview.

## Conceptually:

```
source.c
↓
Preprocessor
↓
```


```
expanded source
↓
Compiler
↓
assembly
↓
Assembler
↓
object file
↓
Linker
↓
executable
```

## Interview question

## What does the linker do?

It combines object files and libraries and resolves references between them to produce the final executable.

## 32. Undefined Behavior

Very important C concept.

## Example:

```
int arr[3];
printf("%d", arr[10]);
```

Accessing outside the valid array bounds produces undefined behavior.

## Another example:

```
int *p = NULL;
printf("%d", *p);
```

Undefined behavior.


## Important distinction

Undefined behavior does not mean:

"The compiler will always throw an error."

It means the C standard does not define what happens.

## 33. Segmentation Fault

A segmentation fault commonly occurs when a program accesses memory it is not allowed to access.

## Example:

int *p = NULL;

*p = 10;

## But remember:

Not every memory-related bug necessarily produces a segmentation fault.

## 34. Memory Leak vs Dangling Pointer

Very common interview comparison:

| Concept | Meaning |
| --- | --- |
| Memory leak | Allocated memory is no longer reachable/released |
| Dangling pointer | Pointer refers to memory that is no longer valid |
| NULL pointer | Pointer intentionally contains no valid object address |
| Wild pointer Uninitialized pointer |   |

## 35. Bitwise Operators


## Know these:

```
& AND
| OR
^ XOR
~ NOT
<< left shift
>> right shift
```

## Example:

5 & 3

## Binary:

```
5 = 101
3 = 011
---------
001 = 1
```


## Practice:

```
Check if number is even
Set a bit
Clear a bit
Toggle a bit
Check a bit
Count set bits
```

## Example:

```
if ((n & 1) == 0) {
printf("Even");
}
```


## 36. File Handling

## Know the basics:

```
FILE *fp;
fp = fopen("data.txt", "r");
if (fp != NULL) {
// read
fclose(fp);
}
```

## Modes:

```
r read
w write
a append
r+ read/write
```

Don't go extremely deep unless they mention file processing.

## 37. Important C Data Structures

For this position, be able to implement these without relying on libraries:

## Array

```
Access O(1)
Search O(n)
```

## Linked List

Know:


Node

Head

Insertion

Deletion

Traversal

## Example:

```
struct Node {
};
```

## Stack

```
int data;
struct Node *next;
```

## Understand:

push

pop

peek

## Queue

## Understand:

enqueue

dequeue

## Hash table

## Understand the basic idea of:

key → hash function → bucket

## 38. DSA Algorithms You Should Code in C


For this interview, I would practice these specifically:

## Easy

- Reverse array

- Reverse string

- Palindrome

- Maximum/minimum

- Frequency counting

- Remove duplicates

- Linear search

- Binary search

- Bubble sort

- Selection sort

- Insertion sort

## Medium

- Reverse linked list

- Detect cycle

- Stack using array

- Queue using array

- BFS

- DFS

- Binary tree traversal

- BST search/insertion

- Merge sort

- Quick sort

You don't need 100 LeetCode questions.

Being able to write 15–20 fundamental programs cleanly in C is more valuable for this particular advertisement.

## 39. Questions You Should Be Able to Answer Without Thinking

Before the interview, make sure these are automatic:


## Memory

Q. Stack vs heap?

Q. What is malloc?

Q. malloc vs calloc?

Q. What does free do?

Q. What is a memory leak?

Q. What is a dangling pointer?

Q. What is a segmentation fault?

## Pointers

Q. What is a pointer?

Q. vs ?

Q. What is a pointer to pointer?

Q. What is pointer arithmetic?

Q. Array vs pointer?

Q. What is NULL?

## Language

Q. What is static?

Q. What is const?

Q. struct vs union?

Q. What is typedef?

Q. What is an enum?

Q. What is recursion?


## Compilation

## Q. What happens when you compile a C program?

Preprocessor

↓

Compiler

↓

Assembler

↓

Linker

↓

Executable

## Algorithms

- Q. BFS vs DFS?

- Q. Binary search complexity?

- Q. Merge sort complexity?

- Q. Quick sort average/worst case?

- Q. How would you detect a cycle in a linked list?

