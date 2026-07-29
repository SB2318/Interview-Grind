
```
class Solution {
    public String reverseWords(String s) {
        int n = s.length();
        int end = s.length() -1;
        StringBuilder sb = new StringBuilder();

        while(end >= 0 && end < n){

            // Remove previous spaces
            while(end >= 0 && s.charAt(end) == ' ') end--;

            if(end < 0) break;

            // store end index, and start traversing on character until you find a space
            int start = end;
            while(start >= 0 && s.charAt(start) != ' ') start--;

            

            // check if result already contains another strings or not
            // If yes, then append with space
            if(sb.length() > 0) sb.append(" ");

            // Now add substring of s from start+1, (as start now pointing space) to end+1,
            // end pointing to the last character of the word
            sb.append(s.substring(start+1, end+1));

            // now end should point to start
            end = start;
        }

        return sb.toString();
    }
}

```
