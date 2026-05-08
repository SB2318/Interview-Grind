// Link: https://leetcode.com/problems/invalid-tweets/
  
# In SQL, the LENGTH function is used to determine the size of a string
# In MySQL, LENGTH() returns the number of bytes
# In PostgreSQL and Oracle, LENGTH() returns the number of Characters
# In SQL Server, LEN() returns Characters (excludes trailing spaces)
# In SQLite, LENGTH() returns Characters

SELECT tweet_id from Tweets where LENGTH(content) > 15;
