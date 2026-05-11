# Link: https://leetcode.com/problems/managers-with-at-least-5-direct-reports/

# In SQL, the HAVING clause is used to filter results based on aggregate functions (like COUNT, SUM, AVG, MIN, and MAX). 
# It was specifically added to the SQL language because the WHERE clause cannot be used with these aggregate functions.

# Can work without GROUP BY: If used without a GROUP BY clause, the HAVING clause treats the entire table as a single group.
# Multiple Conditions: You can combine multiple conditions in a HAVING clause using logical operators like AND or OR.
# Performance: Whenever possible, use WHERE to filter out rows before grouping to improve performance, only using HAVING for conditions that require aggregated data.

  
SELECT
m.name
From Employee m
JOIN Employee e
ON m.id = e.managerId

GROUP BY e.managerId
HAVING Count(e.managerId) >= 5;
