# Link: https://leetcode.com/problems/confirmation-rate/
  
# In SQL, "if-else" logic is handled differently depending on whether you are working within a query (like a SELECT statement) or writing procedural scripts (like stored procedures).
# CASE
#    WHEN condition1 THEN result1
#    WHEN condition2 THEN result2
#    ELSE default_result
# END

# SQL has no direct if-else inside queries.
# Use CASE WHEN for row-wise conditional logic.
# IF() exists in some databases like MySQL, but CASE is standard SQL and preferred in interviews.

SELECT 
a.user_id,
ROUND(AVG(case when c.action = 'confirmed' then 1 else 0 END), 2) as confirmation_rate
FROM Signups as a LEFT JOIN Confirmations as c 
on c.user_id = a.user_id  GROUP BY a.user_id;
