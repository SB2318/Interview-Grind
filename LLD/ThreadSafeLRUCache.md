```
/******************************************************************************

Welcome to GDB Online.
GDB online is an online compiler and debugger tool for C, C++, Python, Java, PHP, Ruby, Perl,
C#, OCaml, VB, Swift, Pascal, Fortran, Haskell, Objective-C, Assembly, HTML, CSS, JS, SQLite, Prolog.
Code, Compile, Run and Debug online from anywhere in world.

*******************************************************************************/
import java.util.*;
import java.util.concurrent.locks.ReentrantLock;

public class Main
{
	public static void main(String[] args) {
		System.out.println("Hello World");
		ThreadSafeLRUCache cache = new ThreadSafeLRUCache(3);
		
		// Worker 1: Inserts entries 1 and 2
        Thread t1 = new Thread(() -> {
            System.out.println(Thread.currentThread().getName() + " -> put(1, 10)");
            cache.put(1, 10);
            System.out.println(Thread.currentThread().getName() + " -> put(2, 20)");
            cache.put(2, 20);
        }, "Worker-1");
        
        
        // Worker 2: Inserts entry 3 and accesses entry 1 (moving 1 to MRU)
        Thread t2 = new Thread(() -> {
            System.out.println(Thread.currentThread().getName() + " -> put(3, 30)");
            cache.put(3, 30);
            int val = cache.get(1);
            System.out.println(Thread.currentThread().getName() + " -> get(1): " + val);
        }, "Worker-2");
        

        // Worker 3: Inserts entry 4 (Triggers eviction of LRU key 2)
        Thread t3 = new Thread(() -> {
            try {
                Thread.sleep(50); // Small delay to let t1 and t2 populate first
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            System.out.println(Thread.currentThread().getName() + " -> put(4, 40) [Should evict key 2]");
            cache.put(4, 40);
        }, "Worker-3");
        
        // Worker 4: Tries to read key 2 (evicted) and key 3, 4
        Thread t4 = new Thread(() -> {
            try {
                Thread.sleep(100); // Delay to ensure eviction happens first
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
            System.out.println(Thread.currentThread().getName() + " -> get(2) [Evicted]: " + cache.get(2));
            System.out.println(Thread.currentThread().getName() + " -> get(3): " + cache.get(3));
            System.out.println(Thread.currentThread().getName() + " -> get(4): " + cache.get(4));
        }, "Worker-4");
        
        t1.start();
        t2.start();
        t3.start();
        t4.start();
	}
	
	static class Node {
	    int key, value;
	    Node prev, next;
	    
	    public Node(int key, int value){
	        this.key = key;
	        this.value = value;
	        
	        
	    }
	}
	
	static class ThreadSafeLRUCache{
	    
	    private Node head, tail;
	    private int capacity;
	    private HashMap<Integer, Node> map;
	    
	    // Explicit lock to guarantee thread safety across both map and doubly linked list
	    private final ReentrantLock globalLock = new ReentrantLock();
	    
	    public ThreadSafeLRUCache(int capacity){
	        
	        this.capacity = capacity;
	        this.map = new HashMap<>();
	        
	        this.head = new Node(-1, -1);
	        this.tail = new Node(-1, -1);
	        
	        head.next = tail;
	        tail.prev = head;
	        
	    }
	    
	    // get Item
	    public int get(int key){
	        
	        globalLock.lock(); // Accuire exclusive lock
	        
	        try{
	            
	            if(!map.containsKey(key)) return -1;
	            
	            Node n = map.get(key);
	            remove(n);
	            insert(n);
	            
	            return n.value;
	            
	        }
	        finally{
	            globalLock.unlock();
	          
	        }
	    }
	    
	    public void put(int key, int value){
	        
	        globalLock.lock();
	        
	        try{
	            
	            // Key already exist, update value and move to MRU
	            if(map.containsKey(key)){
	                Node node = map.get(key);
	                node.value = value;
	                remove(node);
	                insert(node);
	                return;
	            }
	            
	            // Capacity Reached ->Least Recently used node
	            
	            if(map.size() > capacity){
	                Node lru = tail.prev;
	                remove(lru);
	                map.remove(lru.key);
	            }
	            
	            Node newNode = new Node(key, value);
	            
	            map.put(key, newNode);
	            insert(newNode);
	            
	        }finally{
	            globalLock.unlock();
	        }
	    }
	    
	    private void insert(Node node){
	        node.prev = head;
	        node.next = head.next;
	        head.next.prev = node;
	        head.next = node;
	        
	    }
	    
	    private void remove(Node node){
	        node.next.prev = node.prev;
	        node.prev.next = node.next;
	    }
	}
}


```
