
```
class Solution {
    public int myAtoi(String s) {
        int i=0, n= s.length();

        while(i<n && s.charAt(i) == ' ') i++;

        int sign = 1;

        if(i< n && (s.charAt(i) == '+' || s.charAt(i) == '-')){

            if(s.charAt(i) == '-') sign = -1;
            i++;
        }
        long result = 0;
        while(i < n){
            
            if (!Character.isDigit(s.charAt(i)))
              break;

            int num = s.charAt(i) - '0';
           
            result = result*10 + num;
            
            if(sign == 1 && result*sign > Integer.MAX_VALUE) return Integer.MAX_VALUE;
            if(sign == -1 && result*sign < Integer.MIN_VALUE) return Integer.MIN_VALUE;
            i++;
        }

        return (int) result*sign;
    }
}
```
