

```
class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        PriorityQueue<Pair>  pq = new PriorityQueue<>((a,b)-> Integer.compare(a.freq, b.freq)); // poll will be happen from first, storing in increasing order, because whenever size exceed k, small elements gets remove

        HashMap<Integer, Integer> map = new HashMap<>();

        for(int num: nums){
            map.put(num, map.getOrDefault(num, 0)+1);
        }

        for(Map.Entry<Integer, Integer> entry : map.entrySet()){

            int value = entry.getKey();
            int freq = entry.getValue();

            pq.offer(new Pair(value, freq));

            while(pq.size() > k) pq.poll();
        }

        int[] ans = new int[k];
        int idx = 0;

        while(!pq.isEmpty() && idx < k) ans[idx++] = pq.poll().value;
       
        return ans;
    }

    class Pair {
        int value, freq;
        public Pair(int value, int freq){
            this.value = value;
            this.freq = freq;
        }
    }
}

```
