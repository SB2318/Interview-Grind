
These Log Class maintains Three pieces of informations.

- logBuffer -> Your actual log file
- indexOffsets -> You can say corresponding IDs of each information.
- headOfset -> Id of your topmost information
- Informations stored in the order : [length]:[record]

Here, One catch, generally informations or records inside any log file are immutable in nature, You cannot modify or delete. But intentionally I provided a delete implementation here.

```

import java.util.*;
import java.util.concurrent.locks.ReentrantReadWriteLock;
public class Main
{
	public static void main(String[] args) {
		System.out.println("Hello World");
		
		AppendOnlyLog appendOnlyLog = new AppendOnlyLog();
		
		appendOnlyLog.append("Test1");
		
		System.out.println(appendOnlyLog.read(0));
	}
	
	static class AppendOnlyLog {
	    
	    private StringBuffer logBuffer = new StringBuffer();
	    private List<Integer> indexofsets = new ArrayList<>();
	    
	    private long headofset = 0;
	    
	    private ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
	    
	    // Append a new event
	    public int append(String record){
	        
	         rwLock.writeLock().lock();
	         
	         try{
	             
	             int ofset = indexofsets.size();
	             int startPos = logBuffer.length();
	             
	             indexofsets.add(startPos);
	             logBuffer.append(record.length()).append(":").append(record);
	             
	             return ofset;
	             
	         }finally{
	             rwLock.writeLock().unlock();
	         }
	    }
	    
	    // Read  event
	    public String read(long ofset){
	        rwLock.readLock().lock();
	        
	        try{
	            
	            if(ofset < headofset) return "";
	            
	            int relativeIndex = (int) (ofset - headofset);
	            
	            if(relativeIndex >= indexofsets.size()) return "";
	            
	            int startPos = indexofsets.get(relativeIndex);
	            
	            int delimeterPos = logBuffer.indexOf(":", startPos);
	            
	            int length = Integer.parseInt(logBuffer.substring(startPos, delimeterPos));
	            
	            int payloadStart = delimeterPos + 1;
	            
	            return logBuffer.substring(payloadStart, payloadStart+length);
	            
	        }finally{
	            rwLock.readLock().unlock();
	        }
	    }
	    
	    // Delete event
	    public int deleteUpTo(long targetofset){
	        
	        rwLock.writeLock().lock();
	        
	        try{
	           long maxAvailable = headofset + indexofsets.size();
	           long effectiveTarget = Math.min(targetofset, maxAvailable);
	           
	           int recordsToDelete = (int) (effectiveTarget - headofset);
	           
	           if(recordsToDelete <= 0) return 0;
	           
	           int deleteCharAtEnd = recordsToDelete < indexofsets.size() ? indexofsets.get(recordsToDelete) : logBuffer.length();
	           
	           indexofsets.subList(0, recordsToDelete).clear();
	           logBuffer.delete(0, deleteCharAtEnd); // end index exclusive
	           
	           for(int i=0; i<indexofsets.size(); i++){
	               indexofsets.set(i, indexofsets.get(i)-deleteCharAtEnd);
	           }
	           
	           headofset += recordsToDelete;
	           
	           return recordsToDelete;
	           
	        }
	        finally{
	            rwLock.writeLock().unlock();
	        }
	        
	    }
	}
}



```
