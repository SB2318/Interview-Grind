# Link: https://leetcode.com/problems/rising-temperature/
  
# Write your MySQL query statement below
# Self Join
# A self join in SQL is a regular join where a table is joined with itself. 
# It is primarily used to compare rows within the same table 
# or to query hierarchical data where one column references another column in the same table
# We can use INNER JOIN, LEFT JOIN, or any other join type for a self join

# DATEDIFF

# calculates the difference between two dates.
# DATEDIFF(unit, start_date, end_date)
# Supports year, quarter, month, day, week, hour, minute, second, etc
# It counts the number of boundaries crossed.

SELECT W1.id from Weather W1 LEFT JOIN WEATHER W2 ON DATEDIFF(W1.recordDate, W2.recordDate) = 1 where W1.temperature > W2.temperature;
