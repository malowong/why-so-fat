1.	Write a query which shows the highest price total. (1 row)

SELECT MAX(price_total) FROM trades;


2.	Write a query which shows the highest and lowest price totals in the trades table.
The results should be displayed in a single column. (2 rows)

SELECT MAX(price_total) FROM trades;
SELECT MIN(price_total) FROM trades;


3.	Write a query which shows the average share price for each share ID - use the shares_prices table. Round the averages to zero decimal places and order by the share_id (8 rows)

SELECT ROUND(AVG(price))
FROM shares_prices
ORDER BY share_id;



4.	Write a query which shows the trade_id with the lowest price_total for each share_id and order it by price_total. Also display the broker_id and broker_name (first name and last name under the column “Broker Name”) (8 rows)


SELECT trade_id, MIN(price_total), broker_id, CONCAT(first_name, last_name) AS "Broker Name"
FROM trades
INNER JOIN brokers ON brokers.broker_id = trades.broker_id
ORDER BY price_total


5.	Write a query which shows any share IDs where broker 1 has made more than 2 trades. (3 rows) 

SELECT share_id FROM trades WHERE broker_id = 1 GROUP BY trade_id HAVING COUNT(trade_id) > 2;