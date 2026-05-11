# Link: https://leetcode.com/problems/employee-bonus/
  
# Write your MySQL query statement below
SELECT a.name, b.bonus from Employee a LEFT JOIN Bonus b ON a.empId = b.empId WHERE bonus is null or bonus < 1000;
