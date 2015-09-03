CREATE TABLE users (
   id SERIAL PRIMARY KEY,
   email CITEXT UNIQUE,
   password TEXT
);