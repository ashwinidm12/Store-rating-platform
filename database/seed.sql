USE store_rating_db;

INSERT INTO users (name, email, password, address, role)
VALUES
  ('System Administrator Account User', 'admin@example.com', '$2a$10$zysYq.081qj/JvzA4t0zxO20qWUTHfipsq/bIJQycK2vWp0Gy6S6.', '123 Admin Street, Admin City', 'ADMIN'),
  ('Regular Platform User Example', 'user@example.com', '$2a$10$EVa3bogyDwfbueQSJG/C1uJLDHY5qGEFlUy8dQuDIMBC8mmrKiDx2', '456 User Lane, Cityville', 'USER'),
  ('Store Owner Example Person', 'owner@example.com', '$2a$10$S6pwBQFLS23YypPDZHdjtOLc3F9lmBYm.OTiJ5amXzP7ajNBSMRSK', '789 Owner Road, Market Town', 'STORE_OWNER');

INSERT INTO stores (name, email, address, owner_id)
VALUES
  ('Market Square Store', 'market@example.com', '101 Market Square, Townsville', 3),
  ('Residential Goods Store', 'goods@example.com', '202 Residence Avenue, Suburbia', 3);

INSERT INTO ratings (user_id, store_id, rating)
VALUES
  (2, 1, 4),
  (2, 2, 5);
