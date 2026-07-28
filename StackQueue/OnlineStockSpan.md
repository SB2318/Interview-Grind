
```
class StockSpanner {
    // Next greater element implementation
    Stack<Pair> stack;
    private int ind;
    public StockSpanner() {
        stack = new Stack<>();
        ind-=1;
    }
    
    public int next(int price) {
        ind = ind+1;
        int ans = 0;
        while( !stack.isEmpty() && stack.peek().val <= price ) stack.pop();
        int i = stack.isEmpty() ? -1 : stack.peek().ind;
        ans = ind-i;
        stack.add(new Pair(price, ind));

        return ans;
    }

    class Pair {
        int val, ind;
        public Pair(int val, int ind){
            this.val = val;
            this.ind = ind;
        }
    }
}

/**
 * Your StockSpanner object will be instantiated and called as such:
 * StockSpanner obj = new StockSpanner();
 * int param_1 = obj.next(price);
 */
```
