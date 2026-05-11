# Link: https://leetcode.com/problems/average-time-of-process-per-machine/

# Write your MySQL query statement below
# ALGO
# AVG() and ROUND() are frequently tested together to measure your ability to aggregate data and format numerical results for reporting, 
# specifically focusing on handling decimal precision, NULL values, and grouped data. The core formula is 
# ROUND(AVG(column_name), decimals)
# AVG() ignores NULL values in its calculation.
# Example: SELECT AVG(salary) FROM employees;
# Rounds a numeric field to a specified number of decimal places.
# ROUND(123.456, 2)  123.46
# In SQL, aggregate functions like AVG() and SUM() are not limited to single column names; they can process any valid numeric expression calculated for each row before the average is computed.

SELECT a.machine_id, 
Round(AVG(b.timestamp-a.timestamp), 3) as processing_time FROM 
Activity a LEFT JOIN
Activity b
On
a.machine_id = b.machine_id
AND a.process_id = b.process_id
AND a.activity_type = 'start'
AND b.activity_type = 'end'

GROUP BY
a.machine_id;
