

```
/******************************************************************************

                            Online Java Compiler.
                Code, Compile, Run and Debug java program online.
Write your code in this editor and press "Run" button to execute it.

*******************************************************************************/
import java.util.*;

public class Main
{
	public static void main(String[] args) {
		System.out.println("Hello World");
		TopKManager manager = new TopKManager(3);

        manager.trackPurchase("apple");
        manager.trackPurchase("apple");
        manager.trackPurchase("apple");

        manager.trackPurchase("banana");
        manager.trackPurchase("banana");

        manager.trackPurchase("orange");

        manager.trackPurchase("mango");
        manager.trackPurchase("mango");
        manager.trackPurchase("mango");
        manager.trackPurchase("mango");

        System.out.println("Top K: " + manager.getTopK());

        System.out.println(
            "Apple count: " + manager.getItemCount("apple")
        );

        System.out.println(
            "Mango count: " + manager.getItemCount("mango")
        );
	}
	
   private static class TopKManager {
	    
	    private static class ItemNode {
	        String itemId;
	        int count;
	        int heapIndex; // Tracks where this item sits inside the heap (-1 if not in heap)
	        ItemNode next;
	        
	        ItemNode(String itemId){
	            this.itemId = itemId;
	            this.count = 0;
	            this.heapIndex = -1;
	        }
	        
	    }
	    
	   private static class CustomHashMap {
	        
	        private final ItemNode[] buckets;
	        private final int capacity;
	        
	        CustomHashMap(int capacity){
	            this.capacity = capacity;
	            buckets = new ItemNode[capacity];
	        }
	        
	         // Create ItemNode
	        public ItemNode create(String itemId){
	        
	          // extract bucket Index
	          int bucketIndex = getBucketIndex(itemId);
	          
	          synchronized(this){
	              ItemNode curr = buckets[bucketIndex];
	              
                  while (curr != null) {
                        if (curr.itemId.equals(itemId)) {
                            return curr;
                        }
                        curr = curr.next;
                  }
	              
	              ItemNode node = new ItemNode(itemId);
	              node.next = buckets[bucketIndex];
	              buckets[bucketIndex] = node;
	              return node;
	          }
	        }
	    
	        public ItemNode get(String itemId){
	        
	            int bucketIndex = getBucketIndex(itemId);
	            ItemNode curr = buckets[bucketIndex];
	            
	            while(curr != null){
	                
	                if(curr.itemId.equals(itemId)) return curr;
	                
	                curr = curr.next;
	            }
	            
	            return curr;
	       
	         }
	    
	        private int getBucketIndex(String itemId) {
                return (itemId.hashCode() & 0x7fffffff) % capacity;
            }
	    
	    }
	    
	    private static class TopKPriorityQueue {
	        
	        private final PriorityQueue<ItemNode> minHeap;
	        private final int maxK;
	        
	        TopKPriorityQueue(int maxK){
	            
	            this.maxK = maxK;
	            
	            this.minHeap = new PriorityQueue<>(
	              Comparator.comparingInt(node -> node.count)  
	            );
	        }
	        
	        void updateOrInsert(ItemNode node){
	            
	              // If node is already in heap, remove old position
                 // because PriorityQueue does not automatically reorder
                // when node.count changes.
                if(minHeap.remove(node)) {
                  minHeap.offer(node);
                  return;
                }
                
                if(minHeap.size() < maxK){
                    minHeap.offer(node);
                }
                else if(node.count > minHeap.peek().count){
                    minHeap.poll();
                    minHeap.offer(node);
                }
	        }
	        
	        List<ItemNode> getTopKList(){
	            return new ArrayList<>(minHeap);
	        }
	    }
	    
	    private final int k;
	    private final CustomHashMap itemMap;
	    private final TopKPriorityQueue minHeap;
	    
	    private final Object globalLock = new Object();
	    
	    public TopKManager(int k){
	        
	        if(k <= 0){
	            throw new IllegalArgumentException("K must be greater than 0");
	        }
	        
	        this.k = k;
	        this.itemMap = new CustomHashMap(100004);
	        this.minHeap = new TopKPriorityQueue(k);
	    }
	    
	    /**
	     * Track a purchase event
	     * 
	     */
	     
	     public void trackPurchase(String itemId){
	         
	         if(itemId == null || itemId.isEmpty()){
	             return;
	         }
	         
	         //itemMap.create(itemId);
	         ItemNode node = itemMap.create(itemId);
	         
	         synchronized(globalLock){
	             node.count++;
	             minHeap.updateOrInsert(node);
	         }
	         
	     }
	     
	     /** 
	      * Return Top K
	      */
	     public List<String> getTopK(){
	         
	         List<ItemNode> activeNodes;
	         
	         synchronized(globalLock){
	             activeNodes = minHeap.getTopKList();
	         }
	         
	         activeNodes.sort((a, b)-> Integer.compare(b.count, a.count));
	         List<String> result = new ArrayList<>();
	         for(ItemNode node : activeNodes){
	             result.add(node.itemId);
	         }
	         
	         return result;
	     }
	     
	     /** Fetches the currentItemCount **/
	     
	     public int getItemCount(String itemId){
	         
	         if(itemId == null || itemId.isEmpty()){
	             return 0;
	         }
	         
	         ItemNode node = itemMap.get(itemId);
	         
	         return node != null ? node.count : 0;
	     }
	     
	     /***
	      * Heap lookup - O(1)
	      * Heap Update - O(logk)
	      * Top K - O(klogk)
	      */
	    
	}
}

```
