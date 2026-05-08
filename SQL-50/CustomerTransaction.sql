# Link: https://leetcode.com/problems/customer-who-visited-but-did-not-make-any-transactions/
  
# Write your MySQL query statement below
# SELECT is projection — it chooses required columns from table/result set.
# COUNT() - Aggregate function that counts non-null values.
# Params: 
# (i) COUNT(*) → counts all rows, including rows with NULL values.
# (ii) COUNT(column_name) → counts only non-NULL values of that column.
# (iii) COUNT(DISTINCT column_name) → counts unique non-NULL values.
# The parameter inside aggregate functions decides what gets counted/aggregated.
# Other Aggregate functions:  COUNT(), SUM(), AVG() then work on each group separately.

# LEFT JOIN
# Returns all rows from Left Column.
# Returns matching rows from Right Column.
# If no match exists → NULL values.

# AS (Alias)
# Renames computed column.
# Makes output readable.

# GROUP BY
# GROUP BY groups rows with the same column values together so aggregate functions can operate on each group separately.
# groups duplicates into buckets
# allows aggregate calculations
# GROUP BY = divide rows into buckets, then apply aggregate function on each bucket.
# DISTINCT removes duplicates inside each bucket before aggregation.

SELECT 
Visits.customer_id, COUNT(Visits.visit_id) as count_no_trans from Visits LEFT JOIN  Transactions ON Visits.visit_id = Transactions.visit_id WHERE Transactions.transaction_id is NULL GROUP BY Visits.customer_id;
