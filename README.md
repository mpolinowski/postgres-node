<!-- TOC -->

- [Docker](#docker)
    - [Run the Postgres Container](#run-the-postgres-container)
- [Setting up the Database](#setting-up-the-database)
    - [Create a Database](#create-a-database)
    - [Add a Table](#add-a-table)
    - [Add Data](#add-data)
- [Node.js Client](#nodejs-client)
    - [Start the Client](#start-the-client)

<!-- /TOC -->


## Docker

### Run the Postgres Container

```bash
docker run -d --rm \
    --name postgres \
    -e POSTGRES_PASSWORD=secretpassword \
    -p 5432:5432 \
    postgres:14
```

Connect to the Postgres CLI:


```bash
docker exec -ti -u postgres postgres psql

psql (14.0 (Debian 14.0-1.pgdg110+1))
Type "help" for help.

postgres=#
```

## Setting up the Database

### Create a Database

```sql
CREATE DATABASE books;
```

Switch to using the new books table instead of the default postgres:


```sql
\connect books;
You are now connected to database "books" as user "postgres".
```


### Add a Table

```sql
CREATE TABLE the_expanse (
  book_id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  title VARCHAR ( 25 ) UNIQUE NOT NULL,
  isbn VARCHAR ( 25 ) UNIQUE NOT NULL,
  year INT,
  pages INT,
  created_on TIMESTAMP NOT NULL
);
```

### Add Data

```sql
INSERT INTO the_expanse 
  (title, isbn, year, pages, created_on)
VALUES 
  ('Leviathan Wakes', '978-0-316-12908-4', 2011, 592, NOW() - interval '1256 days'),
  ('Calibans War', '978-1-841-49990-1', 2012, 595, NOW() - interval '993 days'),
  ('Abaddons Gate', '978-0-316-12907-7', 2013, 539, NOW() - interval '765 days'),
  ('Cibola Burn', '978-0-316-21762-0', 2014, 583, NOW() - interval '543 days'),
  ('Nemesis Games', '978-0-316-21758-3', 2015, 544, NOW() - interval '267 days'),
  ('Babylons Ashes', '978-0-316-33474-7', 2016, 608, NOW() - interval '189 days'),
  ('Persepolis Rising', '978-0-316-33283-5', 2017, 560, NOW() - interval '122 days'),
  ('Tiamats Wrath', '978-0-316-33286-6', 2019, 544, NOW() - interval '98 days'),
  ('Leviathan Falls', '978-0-356-51039-2', 2021, 528, NOW() - interval '21 days');
```
 
 
## Node.js Client
 
### Start the Client
 
```bash
 npm install
 node server_express.js
running on http://localhost:8888
```