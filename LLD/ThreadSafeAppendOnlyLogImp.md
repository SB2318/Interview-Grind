
```
/******************************************************************************

Welcome to GDB Online.
GDB online is an online compiler and debugger tool for C, C++, Python, Java, PHP, Ruby, Perl,
C#, OCaml, VB, Swift, Pascal, Fortran, Haskell, Objective-C, Assembly, HTML, CSS, JS, SQLite, Prolog.
Code, Compile, Run and Debug online from anywhere in world.

*******************************************************************************/
import java.util.*;
import java.util.concurrent.locks.ReentrantReadWriteLock;

public class Main
{
	public static void main(String[] args) {
		System.out.println("Hello World");
		
		AppendOnlyLog appendOnlyLog = new AppendOnlyLog();
		
		appendOnlyLog.append("Disaster is on the way");
		appendOnlyLog.append("Susmita");
		appendOnlyLog.append("Offline");
		appendOnlyLog.append("Time out");
		appendOnlyLog.append("Teacher is one of the instrument of god");
		appendOnlyLog.append("All teachers");
		appendOnlyLog.append("Amrit");
		appendOnlyLog.append("Hitesh");
		appendOnlyLog.append("Team");
		appendOnlyLog.append("Disaster is on the way");
		appendOnlyLog.append("Beautiful nature");
		appendOnlyLog.append("Jai Shri Krishna");
		
		System.out.println(appendOnlyLog.read(11));
		
	
	}
	
	static class AppendOnlyLog {
	    
	    private final StringBuilder logBuffer = new StringBuilder();
	    private final List<Integer> indexes = new ArrayList<>();
	    
	    private final ReentrantReadWriteLock rwLock = new ReentrantReadWriteLock();
	    
	    public int append(String record){
	        
	        rwLock.writeLock().lock();
	        
	        try{
	            
	            int offset = indexes.size();
	            int startPos = logBuffer.length();
	            
	            indexes.add(startPos);
	            logBuffer.append(record.length()).append(":").append(record);
	            
	            return offset;
	        }finally{
	            rwLock.writeLock().unlock();
	        }
	        
	    }
	    
	    public String read(int offset){
	        
	        rwLock.readLock().lock();
	        
	        try{
	            
	            if(offset < 0 || offset >= indexes.size()){
	                return "Offset out of range";
	            }
	            
	            int position = indexes.get(offset);
	            int delimeterPos = logBuffer.indexOf(":", position);
	            
	            int length = Integer.parseInt(logBuffer.substring(position, delimeterPos));
	            
	            int payloadStart = delimeterPos + 1;
	            
	            return logBuffer.substring(payloadStart, payloadStart + length);
	            
	        }finally{
	            
	            rwLock.readLock().unlock();
	        }
	    }
	    
	    public int size(){
	        
	        rwLock.readLock().lock();
	        
	        try{
	          
	           return indexes.size();
	           
	        }finally{
	            rwLock.readLock().unlock();
	        }
	    }
	    
	}
}


```
