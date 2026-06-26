# Database Design

## Tables

### users
- id INT PK
- name VARCHAR(60)
- email VARCHAR(120) unique
- password VARCHAR(255)
- address VARCHAR(400)
- role ENUM('ADMIN', 'USER', 'STORE_OWNER')
- created_at TIMESTAMP
- updated_at TIMESTAMP

### stores
- id INT PK
- name VARCHAR(100)
- email VARCHAR(120)
- address VARCHAR(400)
- owner_id INT FK -> users.id
- created_at TIMESTAMP
- updated_at TIMESTAMP

### ratings
- id INT PK
- user_id INT FK -> users.id
- store_id INT FK -> stores.id
- rating INT 1-5
- created_at TIMESTAMP
- updated_at TIMESTAMP
- UNIQUE(user_id, store_id)
