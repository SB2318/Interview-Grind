
```

import java.util.concurrent.ConcurrentSkipListMap;

public class Main
{
	public static void main(String[] args) {
		System.out.println("Hello World");
		
		SegmentedWriteAHeadLog log = new SegmentedWriteAHeadLog();
        
        long o0 = log.append("Msg 0");
        long o1 = log.append("Msg 1");
        
        System.out.println("Read Offset 0: " + log.read(0)); // Msg 0
        System.out.println("Read Offset 1: " + log.read(1)); // Msg 1
        
        log.deleteTop(); // Deletes entire first chunk when needed
	}
}

class SegmentedWriteAHeadLog {
    
    private static final int CHUNK_SIZE = 100;
    private static final 
    ConcurrentSkipListMap<Long, String[]> segmentMap = new ConcurrentSkipListMap<>();
    
    private long nextOffset = 0;
    
    public synchronized long append(String record){
         
       
              long offset = nextOffset++;
              long chunkedBasedOffset = (offset/CHUNK_SIZE)*CHUNK_SIZE;
              
              segmentMap.putIfAbsent(chunkedBasedOffset, new String[CHUNK_SIZE]);
              String[] chunk = segmentMap.get(chunkedBasedOffset);
              
              int relativeIndex = (int) (offset % CHUNK_SIZE);
              
              chunk[relativeIndex] = record;
              
              return offset;
              
          
    }
    
    public void deleteTop(){
        
        if(!segmentMap.isEmpty()){
            segmentMap.pollFirstEntry();
        }
    }
    
    public  String read(long offset){
        
         long chunkedBasedOffset = (offset/CHUNK_SIZE)*CHUNK_SIZE;
         
         String[] chunk = segmentMap.get(chunkedBasedOffset);
         
         if(chunk == null) return "segment not found";
         
         int relativeIndex = (int) (offset % CHUNK_SIZE);
         
         return chunk[relativeIndex];
    }
}



```
