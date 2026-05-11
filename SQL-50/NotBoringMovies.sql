# Link: https://leetcode.com/problems/not-boring-movies/

SELECT * from Cinema where id%2 != 0 and description != 'boring' ORDER BY rating DESC;
