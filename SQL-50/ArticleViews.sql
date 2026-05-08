# Link: https://leetcode.com/problems/article-views-i/

# OrderBy:
# ORDER BY clause is used to sort the results of a query in either ascending (asc) or descending order (desc). By default, it sorts data in ascending order (ASC)
  
SELECT Distinct author_id as id from views where author_id = viewer_id order by author_id asc;
