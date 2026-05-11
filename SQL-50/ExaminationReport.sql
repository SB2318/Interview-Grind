# Link: https://leetcode.com/problems/students-and-examinations/

# Write your MySQL query statement below

SELECT 
a.student_id, 
a.student_name, 
su.subject_name, 
count(e.student_id) as attended_exams
From Students a 
CROSS JOIN Subjects su 
LEFT JOIN Examinations e 
on
a.student_id = e.student_id 
and su.subject_name = e.subject_name
GROUP BY 
a.student_id, 
a.student_name,
su.subject_name

ORDER BY
a.student_id,
su.subject_name;
