# Database Information

## Services Folder

### account-service.ts

This file is responsible for handling the account-related operations, such as creating, updating, and deleting accounts. It uses the `account` table from the database to perform these operations.

### post-service.ts

This file is responsible for handling the post-related operations, such as creating, updating, and deleting posts. It uses the `posts` table from the database to perform these operations.

### user-service.ts

This file is responsible for handling the user-related operations, such as creating, updating, and deleting users. It uses the `users` table from the database to perform these operations.

## Database Schema
The database schema is defined in the `src/db/schema.ts` file. This file contains the definitions for the tables and columns in the database.

### Tables
The `users` table is used to store user information, such as their name, email, and other details. The `posts` table is used to store blog posts, including their title, content, and other metadata. The `accounts` table is used to store user accounts, such as their username, password, and other details.

### Columns
Each table in the database has several columns that define its structure. For example, the `users` table has columns for the user's name, email, and other details. The `posts` table has columns for the post's title, content, and other metadata. The `accounts` table has columns for the account's username, password, and other details.

## Database Queries
The database queries are defined in the `src/db/queries` folder. This folder contains the following files:

### select.ts
This file contains the queries for selecting data from the database. The queries are used to retrieve user information, post data, and account details.

### insert.ts
This file contains the queries for inserting data into the database. The queries are used to create new user accounts, posts, and accounts.

### update.ts
This file contains the queries for updating data in the database. The queries are used to update user information, post data, and account details.

### delete.ts
This file contains the queries for deleting data from the database. The queries are used to delete user accounts, posts, and accounts.

## Database Migrations
The database migrations are defined in the `src/db/migrations` folder. This folder contains the following files:

### 2023-03-01-00-00-00.sql
This file contains the SQL statements for creating the `users` table. The SQL statements define the structure of the table, including the columns and their data types.


