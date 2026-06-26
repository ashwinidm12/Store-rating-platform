USE store_rating_db;

INSERT INTO users (name, email, password, address, role)
VALUES
  ('Another Admin User Example Name', 'admin2@example.com', '$2a$10$W0KD1CEIvCOq7GQFjJMKK.Yoetxu2bDyJNri47QemKbSjo7O3PGam', '999 Another Admin Way, Capital', 'ADMIN');
CREATE DATABASE IF NOT EXISTS store_rating_db;
CREATE USER 'store_app'@'localhost' IDENTIFIED BY 'StrongPass!2026';
GRANT ALL PRIVILEGES ON store_rating_db.* TO 'store_app'@'localhost';
FLUSH PRIVILEGES;