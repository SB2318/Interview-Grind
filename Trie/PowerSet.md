
Generate all possible strings that you can get from this string.

power set : 2^n;

<img width="1257" height="690" alt="image" src="https://github.com/user-attachments/assets/85d37a4a-1d9c-4253-a66c-57cff855212f" />

```
class Solution {
    public List<String> powerSet(String s) {
        // Code here
        List<String> a = new ArrayList<>();
        
        helper(s, 0, new StringBuilder(), a);
        Collections.sort(a);
        return a;
    }
    
     private void helper(String nums, int start, StringBuilder curr, List<String> res){

        if(start >= nums.length()){
            if(curr.length()>0)
              res.add(curr.toString());
            return;
        }
        
       
        curr.append(nums.charAt(start));
        helper(nums, start+1, curr, res);
        curr.deleteCharAt(curr.length()-1);
        helper(nums, start+1, curr, res);
        

    }
}

```
