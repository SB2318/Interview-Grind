class Solution {
    static String[] wordBreak(String[] dict, String s) {
        // code here
        Set<String> set = new HashSet<>();
        HashMap<Integer, ArrayList<String>> dp = new HashMap<>();
        
        for(String w : dict) set.add(w);
        
        ArrayList<String> ans = dfs(0, s, set, dp);
        
        String[] res = new String[ans.size()];
        
        
        for(int i=0; i<ans.size(); i++) res[i] = ans.get(i);
        
        return res;
        
    }
    
    private static ArrayList<String> dfs(int ind, String s, Set<String> dict, 
    HashMap<Integer, ArrayList<String>> dp){
        
        ArrayList<String> ans = new ArrayList<>();
        
        if(ind == s.length()){
            ans.add("");
            return ans;
        }
        
        if(dp.containsKey(ind)) return dp.get(ind);
        
        for(int i= ind +1; i<= s.length(); i++){
            
            String word = s.substring(ind, i);
            
            if(!dict.contains(word)) continue;
            
            List<String> suffix = dfs(i, s, dict, dp);
            
            for(String value: suffix){
                
                if(value.isEmpty()) ans.add(word);
                else ans.add(word + " "+value);
            }
            
          
        }
        
         dp.put(ind, ans);
           
         return ans;
    }
}
