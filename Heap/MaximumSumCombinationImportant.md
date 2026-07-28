
```
class Solution {
    public ArrayList<Integer> topKSumPairs(int[] a, int[] b, int k) {
        // code here
        Arrays.sort(a);
        Arrays.sort(b);
        
        PriorityQueue<Node> pq = 
        new PriorityQueue<>((a1, b1)-> Integer.compare(b1.sum , a1.sum));
        
        HashSet<Node> visited = new HashSet<>();
        ArrayList<Integer> ans = new ArrayList<>();
        
        int i= a.length-1, j= b.length-1;
        pq.offer(new Node(a[i]+ b[j], i, j));
        
        while(!pq.isEmpty() && k > 0){
            
            Node node = pq.poll();
            
            if(visited.contains(node)) continue;
            visited.add(node);
            
            ans.add(node.sum);
            int i1 = node.ai;
            int j1 = node.bi;
            
            if(i1 >= 1){
                Node aNode = new Node(a[i1-1]+b[j1], i1-1, j1);
                pq.offer(aNode);
                //visited.add(aNode);
            }
            
            if(j1 >= 1){
                Node bNode = new Node(a[i1]+b[j1-1], i1, j1-1);
                pq.offer(bNode);
                //visited.add(bNode);
            }
            k--;
        }
        
        return ans;
        
    }
    
    class Node {
        int sum, ai, bi;
        
        public Node(int sum, int ai, int bi ){
            this.sum = sum;
            this.ai = ai;
            this.bi = bi;
        }
        
        public String getRowData(){
            return ai + "#"+ bi;
        }
        
       @Override
       public boolean equals(Object o){
           
           if(this == o) return true;
           
           if(o == null || o.getClass() != getClass()){
               return false;
           }
           
          Node obj = (Node)o;
           
           if(obj.ai == this.ai && obj.bi == this.bi && obj.sum == this.sum)
             return true;
           return false;
       }
       
       @Override
       public int hashCode(){
           return Objects.hash(this.sum, this.ai, this.bi);
       }
    }
}


```
