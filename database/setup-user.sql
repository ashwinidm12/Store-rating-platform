-- Run as MySQL root to create the application user and database.
-- Usage: mysql -u root -p < database/setup-user.sql

CREATE DATABASE IF NOT EXISTS store_rating_db;

CREATE USER IF NOT EXISTS 'store_app'@'localhost' IDENTIFIED BY 'StrongPass!2026';
GRANT SELECT, INSERT, UPDATE, DELETE, CREATE, ALTER, INDEX, DROP, REFERENCES
  ON store_rating_db.* TO 'store_app'@'localhost';

FLUSH PRIVILEGES;
