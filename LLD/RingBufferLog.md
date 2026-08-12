



```

import java.util.*;
import java.util.concurrent.locks.ReentrantReadWriteLock;
public class Main
{
	public static void main(String[] args) {
		System.out.println("Hello World");
		
		//AppendOnlyLog appendOnlyLog = new AppendOnlyLog();
		RingBufferLog ringBufferLog = new RingBufferLog(4);
		
		
		ringBufferLog.insert("Test1");
		
		System.out.println(ringBufferLog.get(0));
	}
	

	
	static class RingBufferLog {
	    
	    private final String[] buffer;
	    
	    private long headofset = 0;
	    private long tailofset = 0;
	    private int capacity;
	    
	    private ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
	    
	    public RingBufferLog(int capacity){
	        buffer = new String[capacity];
	        this.capacity = capacity;
	    }
	    // Insert from end
	    // Delete from top, when array is full
	    
	    private int insert(String record){
	        
	         rwLock.writeLock().lock();
	         
	         try{
	             if(tailofset - headofset >= capacity){
	                 headofset++; // delete one element from front
	             }
	             
	             int relativeIndex = (int) (tailofset % capacity);
	             buffer[relativeIndex] = record;
	             tailofset++;
	             
	             return (int) tailofset;
	             
	         }finally{
	             rwLock.writeLock().unlock();
	         }
	    }
	    
	    private String get(long ofset){
	        rwLock.readLock().lock();
	        
	        try{
	          
	           if(ofset < headofset || ofset > tailofset)   return "Invalid Id";
	           
	           int relativeIndex = (int) (ofset % capacity);
	           
	           return buffer[relativeIndex];
	        }finally{
	            rwLock.readLock().unlock();
	        }
	    }
	}
}
```

