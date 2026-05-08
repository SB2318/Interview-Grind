# Link: https://leetcode.com/problems/product-sales-analysis-i/
  
# Write your MySQL query statement below
SELECT product_name, year, price from Sales Left Join Product on Sales.product_id = Product.product_id;
