-- Verify seed users exist (run: mysql -u store_app -p store_rating_db < database/verify-seed.sql)
USE store_rating_db;

SELECT id, email, role FROM users;
