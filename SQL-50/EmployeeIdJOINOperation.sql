// Link: https://leetcode.com/problems/replace-employee-id-with-the-unique-identifier/
  
# Write your MySQL query statement below
  
SELECT EmployeeUNI.unique_id, Employees.name from Employees LEFT JOIN EmployeeUNI
on EmployeeUNI.id = Employees.id;
