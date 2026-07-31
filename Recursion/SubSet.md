
```
class Solution {
    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        helper(0, nums, new ArrayList<>(), ans);

        return ans;
    }

    private void helper(int ind, int[] nums, 
    ArrayList<Integer> curr, List<List<Integer>> ans){

        if(ind >= nums.length){
            ans.add(new ArrayList<>(curr));
            return;
        }

        curr.add(nums[ind]);
        helper(ind+1, nums, curr, ans);
        curr.remove(curr.size()-1);
        helper(ind+1, nums, curr, ans);
    }
}
```
