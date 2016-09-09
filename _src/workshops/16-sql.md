---
title: Introduction to SQL
slug: workshops/sql
template: workshop
author: Andrew Kolos
---
## This workshop
In this workshop, we will focus on retrieving data from an SQL database. That is, we will NOT go very deeply into creation/modification of databases OR **proper database design**. However, we will briefly go over creating/modifying tables so that you have the ability to create something to query by the end of this workshop.

## Motivation

Databases are ubiquitious in digital business. Any website or interal business uses databases to neatly store huge amounts of data that would be unmanageable in a spreadsheet. SQL is a query language that lets us generates useful reports using data from databases, and it lets us do it *quickly*.

Knowing SQL is a valuable skill for anyone interested in working with data, and data is everywhere! The majority of businesses rely on databases to store their data. Whether it's for big business or just a small side project you are interested in creating,  having databases and being able to query them using SQL is often highly valuable.

## Goal
SQL has a great amount of depth, like any language. To look at the language in depth would take many, many workshops. However, by the end of this workshop, you should be able to write simple database queries that will get the job done for most small apps you might want to create.

From here, you'll simply need to install database management software to create databases with.

If you wish to create an application that interacts with your database, you will need to learn specific libraries/APIs you can use to have your program interact with it (e.g. [the java.sql package for Java](https://docs.oracle.com/javase/7/docs/api/java/sql/package-summary.html) or [ADO.NET for C#](http://www.codeproject.com/Articles/361579/A-Beginners-Tutorial-for-Understanding-ADO-NET)).

## Background

### What do I need to know before learning SQL?

Nothing. However, experience with a programming language such as C, C++, or Java will make understanding datatypes, comparisons, and functions easier.

### What is SQL?
* Structured Query Language
* As a query language, it's almost completely focused on retrieving data and generating reports
* Used to access and manipulate databases

Databases store information in the form of **entries** (or rows) in tables.

For example a table of customers might look something like this:

| CustomerID | CustomerName | Address | City | PostalCode | State |
|------------|--------------|---------|------|------------|---------|
|1       | John Smith   | 555 Apple Way | Orlando | 32816 | FL |
|2           | Jane Doe     | 222 Orange Rd | Longwood | 32779 | FL |
|3       | Smith Johnson| 123 Peach Street | Chapel Hill| 27514 | NC |


## Table of contents
* Simple Queries
  * Basic queries
  * `DISTINCT`
  * `ORDER BY`
* More with  `WHERE`
* Functions
  * Scalar Functions
  * Aggregate Functions
* Practice Excercises
* Working with Multiple Tables using Joins
  * `INNER JOIN`s
  * `OUTER JOIN`s
  * `UNION`s
* More Practice Excercises
* Datatypes
  * Datatypes
  * Typecasting using `CAST`
* Creating Tables
* Inserting Rows into a Table
* Updating Rows in a Table
* Deleting Rows from a Table
* Database Management Systems
* Reflection
* Additional Resources


## Our sandbox
Before we start executing any SQL code, we need a database to work with. Let's go ahead and take a look at our tables.

In another tab, open up [W3Schools's Try it Yourself Editor](http://www.w3schools.com/sql/trysql.asp?filename=trysql_select_all). Here we see there a database we can play with. On the right side of the interface, we see the list of tables we have.

Execute each of the following commands by writing them in the "SQL Statement" textbox and then hitting the "Run SQL" button.

* `SELECT * FROM Customers`
* `SELECT * FROM Orders`
* `SELECT * FROM Products`

Now that we have a database to play with, let's learn how to write some basic queries.

## Querying a database
SELECT is used in conjunction with other keywords and clauses to retrieve and view information. You can think of the SELECT statements as a way of posing a question to a database. Many techniques used in writing SELECT statements are also used in creating UPDATE, INSERT, and DELETE statements.

Basic SELECT statements follow this format:
 
<pre>
SELECT <i>column</i>, <i>column</i>, <i>column</i>
FROM <i>table</i>
WHERE <i>column operator value</i>
</pre>

`SELECT` \- *required*, used to specify the columns (separated by commas) you want in the result set of the query.


`FROM` \- *required*, specifies the table(s) from which the columns are drawn from.

`WHERE` \- *optional*, used to filter rows returned by the FROM clause. We'll learn more about this later once we've looked at data types and operators.

### Simple SELECT examples
1. Get the ID numbers of names of all customers.
```sql
SELECT CustomerID, CustomerName FROM Customers
```
2. Get all information from the Customer table.
```sql
SELECT * FROM Customers
```
3. Which products cost $50 or more?
```sql
SELECT ProductName, Price FROM Products WHERE Price >= 50
```
4. Which customers reside in Buenos Aires?
```sql
SELECT * FROM Customers WHERE City = "Buenos Aires"
```
#### DISTINCT
The `DISTINCT` keyword removes duplicate rows returned by a query.
Syntax:
```sql
SELECT DISTINCT <columns> FROM <tables>
```
Example: Get a list of distinct cities that the customers reside in
```SQL
SELECT DISTINCT City FROM Customers
```


#### ORDER BY
The `ORDER BY` keyword allows you to sort information returned by a query.
Syntax:
```sql
SELECT Statement 
ORDER BY *column* ASC|DESC
```

Example: Get a list of distinct cities in ascending order.
```sql
SELECT DISTINCT City FROM Customers ORDER BY City ASC
```


&nbsp;

### More with WHERE
Now that we know more about expressions, we can be more confident using the ```WHERE``` clause.

You might remember this query we saw earlier.

```sql
SELECT ProductName, Price FROM Products WHERE Price >= 50
```

Just like in this example, using the `WHERE` keyword to filter data is fairly intuitive in most cases, but we will still need to know our comparison operators. I'll throw in the arithmetic operators while we are at it.


#### Arithmetic and Comparison Operators

These are the standard operators. Note that each RDBMS will have more operators in addition to these.

| Operator   | Description           |
|------------|-----------------------|
| +, -, *, / | Standard Arithmetic   |
| %           | Modulus |
| =           | Equality |
| !=, \<\>     | Not equal |
| >           | Greater than |
| \<           | Less than |
| \>=, !<     | Greater than or equal to |
| <=, !>     | Less than or equal to |


##### Notes on Comparison Operators

* Less Than and Greater Than operators can be applied to not only numbers, but character strings and **dates/times**.


#### Logical Operators
Essentially, we use arithmetic and comparison operators the same way we do in a language like `C` or `Java`. At this point you may be looking for a **logical and** operator **&&** and an **logical or** operator **||**. Well, we have those and quite a few more logical operators available to us in SQL.

Listed in arbitrary order:

| Operator   | Description | Expression | Value | 
|------------|-------------|------------|-------|
| `AND`    | TRUE if both epressions are true | `3 > 5 AND 1 < 2` | 0
| `OR`     | TRUE if either boolean expression is true | `3 > 5 OR 1 < 2` | 1 |
| `NOT`    | Reverses the value of any boolean operator | `NOT (3 > 5 OR 1 < 2)` | 0 |
| `BETWEEN`| TRUE if operand is within specified range  | `1 BETWEEN 2 and 4` | 0 |
| `LIKE`   | TRUE if the operand matches a pattern | `hello LIKE "%el%"` | 1 |
| `IN`     | TRUE if the operand is equal to one of a list of expressions. | `3 IN (3, 6)` | 1 |
| `EXISTS` | TRUE if subquery contains any rows | | |
| `ALL`     | TRUE if a set of comparisons are TRUE | | |
| `ANY`    | TRUE if one in a set of comparisons is TRUE | | || 

##### AND 

We use ```AND``` to specify multiple search critera.

Example: Select all customers from Belin, Germany.

```SQL
SELECT * FROM Customers WHERE Country = "Germany" AND City = "Berlin";
```

##### OR

```OR``` is used to retrieve all recorrds to match at least one of two criteria.

Example: Select all customers from either the UK or USA.

```SQL
SELECT * FROM Customers WHERE Country = "USA" OR Country = "UK"
```

###### NOT

```NOT``` is used to negate an expression

Example: Select all customers that are NOT from the USA.

```SQL
SELECT * FROM Customers WHERE NOT (Country = "USA")
```

Another solution is

```SQL
SELECT * FROM Customers WHERE Country != "USA"
```

##### BETWEEN

`BETWEEN` selects values within a range.

`<column> BETWEEN <A> and <B>` is essentially a shorthand of `<column> >= <A> AND <column> <B>`

Example: Select all products with a price in between `15` and `20`

```SQL
SELECT * FROM Products WHERE Price BETWEEN 15 AND 20
```

Not that both bounds are included in the range.

##### LIKE
```LIKE``` is a little more complicated, especially if you haven't seen pattern matching before. ```LIKE``` selects all values that match a specified pattern. Let's start with an example.

Example: Select all customers whose name begins with the letter ```A```.

```SQL
SELECT * FROM Customers WHERE CustomerName LIKE "A%"
```

```%``` is a wildcard that essentially represents a subsitute for zero or more characters.


Another example: Select all customers whose name ends with the  letter ```e```.

```SQL
SELECT * FROM Customers WHERE CustomerName LIKE "%e"
```

[See more about wildcards here.](http://www.w3schools.com/sql/sql_wildcards.asp)

##### IN

```IN``` selects all elements whose value is found within a provided set of values.

Example: Select all customers that reside in either the UK or the USA.

```SQL
SELECT * FROM Customers WHERE Country IN ("UK", "USA")
```

##### Exists

```EXISTS``` is a condition that is met when a subquery returns at least one row. ```EXISTS``` is a bit more complicated than the previous logical operators we've seen, but it is fairly powerful.

Example: Select all customers who have at least one order currently placed

```SQL
SELECT * FROM Customers WHERE EXISTS (SELECT * FROM orders WHERE Customers.CustomerID = Orders.CustomerID)
```

This example is important because it shows off the idea of using a query within another query. The embedded query we see here is called a subquery.

##### ALL

`ALL` allows you to compare one value to every value within a set.

Simple but admittedly useless example: Select all orders whose price is greater than 15, 30, and 45.

```SQL
SELECT * FROM Order WHERE Price > ALL (15, 30, 45)
```

##### ANY

Example: Select all products that cost either 15, 20, or 25

```SQL
SELECT * FROM Products WHERE PRICE = ANY (15, 20, 25)
```

Unfortunately, the Try It Editor does not appear to support the `ALL` and `ANY` keywords.

&nbsp;

### Functions

Like in any programming language, SQL comes with built-in functions, of which there are many. Each DBMS also adds its own functions. Since there are so many functions (check out [this page for MySQL functions](http://www.tutorialspoint.com/mysql/mysql-useful-functions.htm)), we will only cover ones that are used very frequently.

#### Some examples of scalar functions

* `CURDATE()` returns the current time and date
* `ABS(num)` returns the absolute value of `num`
* `ROUND(num, d)` returns `num` rounded to `d` decimal places
* `UPPER(str)` returns `str` with all characters changed to uppercase

#### Aggregate Functions

While there are many, many scalar functions, to learn about, you can simply look them up whenever need them. Aggregate functions are special and are used very often.

Unlike with scalar functions, we argue entire columns as parameters rather than a single value.

* `MIN(col)` returns the smallest value found in `col`
* `MAX(col)` returns the largest value found in `col`
* `SUM(col)` returns the sum of all numeric values in `col`
* `AVG(col)` returns the average value of `col`
* `COUNT(col)` returns the total number of values in `col`

Example: Find the average price the products.

```SQL
SELECT AVG(Price) FROM Products
```

Example: How many products are there?

```SQL
SELECT COUNT(ProductID) From Products
```

Example: What is the most expensive product?

```SQL
SELECT MAX(Price) From Products
```


#### GROUP BY

Let's try an example: Count how many customers there are in each country.

We might try something like this:
```SQL
SELECT Country, COUNT(Country) FROM Customers
```

However, all we get back is

| Country | COUNT(Country) |
|---------| ---------------|
| Poland  | 91 |

Which is the last country in the Customers table and the total number of customers (the `COUNT` function counted the number of rows in the entire table).

Right now, we can't do very much with aggreagte functions. In the way we've used them before, they calculate a value across **all** rows in a table. We need a way to group data in order to get any sort of subtotal.

`GROUP BY` groups a selected set of rows into a set of summary rows by the values of one or more columns. Let's try including a `GROUP BY` statement in our statement.

```SQL
SELECT Country, COUNT(Country)
FROM Customers
GROUP BY Country
```

We see that this works. Yay!


### Excercises
While there is so much more to SQL, we actually have all the basic tools necessary to retrieve information from a database. Try some excercises make sure you are understanding everything so far.

1. Select all products with a price anywhere in between `15` and `30`. Order them by price in descending order.
2. What's the most expensive product available? What is it's price?
3. What's the average number of products sold in any given order?
4. Select all products that have a price greater than the average price of all products. Order them by price in descending order.
5. Count the number of products that have a price greater than than the average price of all products. 

Solutions (note that each problem has multiple valid solutions):

1\. 
```SQL
SELECT * 
FROM Products
WHERE Price BETWEEN 15 AND 30
ORDER BY Price DESC
```

2\.
```SQL
SELECT ProductName, MAX(Price)
FROM Products
```

3\.
```SQL
SELECT AVG(Quantity)
FROM OrderDetails
```

4\. 
```SQL
SELECT * 
FROM Products
WHERE Price > (SELECT AVG(Price) FROM Products)
ORDER BY Price DESC
```

5\.
```SQL
SELECT COUNT(*) 
FROM Products
WHERE Price > (SELECT AVG(Price) FROM Products)
```


&nbsp;

### Working with multiple tables using joins

Right now, we don't have many ways to work with multiple tables at once. There are many problems we still can't solve, like

* Generate a table of orders containinng the order ID and the name of the customer that made that order.
* Get all customers and any orders they might have.

In many situations, you will need to link multiple tables together to get the data you need. For example, each pair of things listed here would probably be stored using two tables:

* Customers and their orders
* Bowlers and the games they've played
* Students and the classes they took

#### The INNER JOIN

The most common type of JOIN is the `INNER JOIN`. `INNER JOIN` selects all rows from both tables as long as there is a match between the the specified columns in both tables. `INNER JOIN` is the most commonly used type of join

Syntax:
```SQL
SELECT column(s)
FROM table1
INNER JOIN table2
ON table1.column = table2.column
```

Looking at the `Customers` table and the `Orders` table, we see that there is a link between them. That is, the `Products` table has a `CustomerID` column, which is also found in the `Customers` table. In the `Orders` table, `OrderID` is the called the **primary key**, and `CustomerID` is called a **foreign key**. Foreign keys are what establish the links between tables.

Example 1: Generate a table of `OrderID`s `CustomerName`s.

```SQL
SELECT Orders.OrderID, Customers.CustomerName
FROM Orders
INNER JOIN Customers
ON Orders.CustomerID = Orders.CustomerID
```

Example 2: Generate a report orders consisting of their ID, the name of the customer that made the order, and the shipper of that order.

```SQL
SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName
FROM Orders
INNER JOIN Customers
 ON Orders.CustomerID = Orders.CustomerID
INNER JOIN Shippers
 ON Orders.ShipperID = Shippers.ShipperID
```

Example 3: Do the same as in example 2, but include the `OrderDate`. Also, only include orders placed before October 1996. Order by `OrderDate`, with the earliest order being shown first. These customers have been waiting a long time.

```SQL
SELECT Orders.OrderID, Customers.CustomerName, Shippers.ShipperName, Orders.OrderDate
FROM Orders
INNER JOIN Customers
 ON Orders.CustomerID = Orders.CustomerID
INNER JOIN Shippers
 ON Orders.ShipperID = Shippers.ShipperID
WHERE Orders.OrderDate < "1996-08-00"
ORDER BY Orders.OrderDate ASC
```

#### Side note: NULL values

A `NULL` value represents missing data. For example, if you insert a new customer into the `Customers` table without specifying a name, that customer would show `NULL` in the `CustomerName` column (though in practice, you might not allow customers have to have a `NULL` name.

We do have an operator to check if a value is `NULL`.

#### LEFT JOIN

`LEFT JOIN` returns all rows from the left table (table1), even if there are no matches on the right table. If there is no match, the field(s) corresponding to the right table will be `NULL`.

Example: Generate a report of every customer and an order they have placed if any.

```SQL
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
LEFT JOIN Orders
ON Customers.CustomerID=Orders.CustomerID
ORDER BY Customers.CustomerName;
```
#### RIGHT JOIN

`RIGHT JOIN` works in a similar way to `LEFT JOIN`. `RIGHT JOIN` returns all rows from the right table (table2), even if there are no matches on the left table.

#### FULL OUTER JOIN

`FULL OUTER JOIN` returns all rows from both the left and right table (essentially combining the result of both `LEFT JOIN` and `RIGHT JOIN`.

Example: Generate a report of all customers and all orders.

```SQL
SELECT Customers.CustomerName, Orders.OrderID
FROM Customers
FULL OUTER JOIN Orders
ON Customers.CustomerID=Orders.CustomerID
ORDER BY Customers.CustomerName;
```

#### UNION

The `UNION` operator combines the result-set of two or more `SELECT` statements.

Example: Get a list of all the distinct cities that either a resident lives in or a supplier is based in.

```SQL
SELECT City FROM Customers
UNION
SELECT City FROM Suppliers
ORDER BY City
```

### More Exercises

At this point, we can write some very informing queries. Try these excercises to see what you know and help solidify what you have learned up to this point.

1\. Count the number of suppliers in each country. Order results by the number of suppliers, and then by the name of country.

2\. Get a list of orders shipped by Speedy Express.

3\. Count the number of products in each category.

4\. (Difficult) Select all categories, listed in order of which categories are the most ordered.

5\.  (Difficult) Select all products that a customer in the UK has ordered.

**Try solving these on your own before looking at my solutions**

Possible solutions:

1\.
```SQL
SELECT Country, Count(Country) AS CountryCount
FROM Suppliers
GROUP BY Country
ORDER BY CountryCount, Country
```

2\.
```SQL
SELECT *
FROM Orders
INNER JOIN Shippers
ON Orders.ShipperID = Shippers.ShipperID
WHERE ShipperName = "Speedy Express"
```


3\.

```SQL
SELECT Categories.CategoryName, COUNT(Products.ProductID) AS TotalCount
FROM Categories
INNER JOIN Products
ON Categories.CategoryID = Products.CategoryID
GROUP BY Categories.CategoryName
ORDER BY TotalCount
```

4\.

```SQL
SELECT Categories.CategoryName, COUNT(Products.ProductID) AS TotalCount
FROM Categories
INNER JOIN Products
ON Categories.CategoryID = Products.CategoryID
GROUP BY Categories.CategoryName
ORDER BY TotalCount DESC
```

5\.

```SQL
SELECT Products.ProductID, Products.ProductName, Customers.CustomerName, Customers.Country
FROM Products
INNER JOIN OrderDetails
ON Products.ProductID = OrderDetails.ProductID
INNER JOIN Orders
On OrderDetails.OrderID = Orders.OrderID
INNER JOIN Customers
On Orders.CustomerID = Customers.CustomerID
WHERE Customers.Country = "UK"
ORDER BY Products.ProductName ASC
```

&nbsp;

### Datatypes
Before making our own tables, we'll need to learn more about datatypes.

#### Datatypes
Take a look at the [data types](http://www.w3schools.com/sql/sql_datatypes_general.asp) available in most versions of SQL. A data type simply defines what kind of values a variable can take. For example, we don't want to be able to assign someones birthdate to be the string "Andrew".

#### Type casting using CAST
Normally, we can't add ```1``` and ```"2"```. This would be like adding a number and a word, which doesn't make sense. If we could somehow convert the string ```"2"``` to the number ```2```, we could add with ```1```, producing ```3```. 

We use the ```CAST``` funciton to change the data type of an expression.

```sql
CAST (*expression* AS *data type*)
```
Go ahead and try it out.
```sql
SELECT (1 + CAST("2" AS INTEGER));
```

One interesting thing to note is that we can add/substract date/time values. However, how this is done varies between different database management systems (i.e. the software that manages the database).

### Creating a Table

At this point, I will very briefly introduce the keywords used to insert, update, and delete records in a database. Before doing that, lets create a table of our very own.

<pre>
CREATE TABLE <i>t_name</i> (<i>col_name1</i> <i>data_type</i>(<i>size</i>), <i>col_name2</i> <i>data_type</i>(<i>size</i>), ...)
</pre>

Example: Create a table of students concsisting of their name, their standing, their major, and their enrollment date.

```SQL
CREATE TABLE Students
(
StudentName varchar(30),
AcademicStanding varchar(20),
Major varchar(20),
EnrollmentDate date
)
```

### INSERT INTO

Now let's add some students to the database using the `INSERT INTO` statement.

Syntax 1:

<pre>
INSERT INTO <i>t_name</i>
VALUES (<i>value1</i>, <i>value2</i>, ...)
</pre>

Syntax 2:

<pre>
INSERT INTO <i>t_name</i> (<i>column1</i>, <i>column2</i>, ...)
VALUES (<i>value1</i>,<i>value2</i>, ... )
</pre>

Example:

```SQL
INSERT INTO Students (StudentName, AcademicStanding, Major, EnrollmentDate)
VALUES ("Andrew", "Junior", "Computer Science", "2014-08-00")
```

### UPDATE

`UPDATE` is used to modify existing records in a table.

Syntax:

```SQL
UPDATE table_name
SET column1 = value1, column2 = value2, ...
WHERE condition
```

Example: Update Andrew's `AcademicStanding` value to `Senior`.

```SQL
UPDATE Students
SET AcademicStanding = "Senior"
WHERE StudentName = "Andrew"
```

### DELETE

`DELETE` is used to delete exisiting records in a table.

Example: Remove Andrew from the `Students` table.

```SQL
DELETE FROM Students
WHERE StudentName = "Andrew Kolos"
```

&nbsp;

### Database Management Systems

While SQL is an ANSI standard, there are many versions of it. While they all support major commands, they have their own unique features. Examples include

* Microsoft's SQL Server
* Oracle SQL
* IBM's DB2
* PostgreSQL
* MySQL

Fortunately, pretty much everything we learned here is standard amongst all DBMSs.


### Where do I Go Next? Also Additional Resources

[TutorialsPoint SQLite C/C++ Tutorial](http://www.tutorialspoint.com/sqlite/sqlite_c_cpp.htm). SQLite is a minimalisitc, open-source DBMS that requires little set-up. You can [download it here](https://www.sqlite.org/download.html).

[MySQL Community Server Download Page](http://dev.mysql.com/downloads/mysql/)

[W3Schools SQL Tutorial](http://www.w3schools.com/sql/default.asp)

[TutorialsPoint SQL Tutorial](http://www.tutorialspoint.com/sql/index.htm)

[Brief Tutorial on Database Design](http://en.tekstenuitleg.net/articles/software/database-design-tutorial/intro.html)
