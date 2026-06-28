# Store Rating Platform

A production-ready full-stack store rating platform built with **React**, **Express**, **MySQL**, **JWT**, **bcrypt**, and **Sequelize** using an MVC architecture.

## Features

- Single login system with JWT authentication and role-based authorization
- Three user roles: **System Administrator**, **Normal User**, **Store Owner**
- Secure password hashing with bcrypt
- Admin dashboard with user/store management and statistics
- Store browsing, search, and rating submission for normal users
- Store owner dashboard with average rating and rating list
- Sortable, searchable, paginated data tables (10 records per page)
- Responsive UI with sidebar, navbar, toast notifications, loading spinners, and confirmation dialogs
- Frontend and backend validation for all forms

## Demo Video

Watch the demo: [https://youtu.be/zY1g77WZUcw](https://youtu.be/zY1g77WZUcw)

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, Vite, React Router, Axios, React Toastify |
| Backend | Express.js, Sequelize ORM |
| Database | MySQL |
| Auth | JWT + bcrypt |

## Project Structure

```
store-rating-platform/
├── backend/
│   └── src/
│       ├── config/          # Database & JWT configuration
│       ├── controllers/     # Request handlers
│       ├── middleware/      # Auth, roles, validation, errors
│       ├── models/          # Sequelize models
│       ├── routes/          # API routes
│       ├── services/        # Business logic
│       └── utils/           # Validators, token helpers
├── frontend/
│   └── src/
│       ├── api/             # Axios instance & API helpers
│       ├── components/      # Reusable UI components
│       ├── context/         # Auth context
│       ├── hooks/           # Custom hooks
│       ├── pages/           # Role-based pages
│       └── routes/          # React Router setup
├── database/
│   ├── schema.sql           # MySQL schema
│   ├── seed.sql             # Seed data
│   └── sample_data.sql      # Additional sample data
└── docs/
    ├── API_Documentation.md
    ├── Database_Design.md
    ├── Deployment_Guide.md
    └── Postman_Collection.json
```

## Prerequisites

- Node.js 18+
- MySQL 8+
- npm

## Quick Start

### 1. Clone and install dependencies

```bash
cd store-rating-platform/backend && npm install
cd ../frontend && npm install
```

### 2. Configure environment variables

```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

Update `backend/.env` with your MySQL credentials and a strong JWT secret.

### 3. Create database and seed data

**Option A — use the dedicated app user (matches `backend/.env.example`):**

```bash
mysql -u root -p < database/setup-user.sql
mysql -u store_app -p'StrongPass!2026' < database/schema.sql
mysql -u store_app -p'StrongPass!2026' < database/seed.sql
```

**Option B — use your existing MySQL root user:**

Edit `backend/.env` and set:

```env
DB_USER=root
DB_PASSWORD=your_actual_mysql_root_password
```

Then run:

```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

If you see `Access denied for user 'store_app'@'localhost'`, the app user was never created — use Option A or switch to Option B.

### 4. Start the application

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api
- Health check: http://localhost:5000/api/health

## Default Seed Accounts

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@example.com | Admin@123 |
| Normal User | user@example.com | User@1234 |
| Store Owner | owner@example.com | Owner@123 |

## API Endpoints

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register normal user |
| POST | `/api/auth/login` | Public | Login all roles |
| POST | `/api/auth/logout` | Auth | Logout |
| POST | `/api/auth/change-password` | Auth | Change password |
| GET | `/api/admin/dashboard` | Admin | Dashboard stats |
| GET | `/api/admin/users` | Admin | List users (filter/sort/page) |
| POST | `/api/admin/users` | Admin | Create user |
| GET | `/api/admin/users/:id` | Admin | User details |
| GET | `/api/admin/stores` | Admin | List stores |
| POST | `/api/admin/stores` | Admin | Create store |
| GET | `/api/stores` | Public | Browse stores |
| GET | `/api/stores/:id` | Auth | Store details |
| GET | `/api/stores/:storeId/rating` | Auth | User's rating for store |
| GET | `/api/ratings/me` | Auth | Current user's ratings |
| POST | `/api/ratings` | User | Submit rating |
| PUT | `/api/ratings/:storeId` | User | Update rating |
| GET | `/api/owner/dashboard` | Store Owner | Owner dashboard |
| GET | `/api/owner/ratings` | Store Owner | Ratings list |
| GET | `/api/users/profile` | Auth | User profile |
| GET | `/api/health` | Public | Health check |

See `docs/API_Documentation.md` and import `docs/Postman_Collection.json` into Postman.

## Validation Rules

| Field | Rules |
|-------|-------|
| Name | 20–60 characters |
| Address | Max 400 characters |
| Password | 8–16 characters, 1 uppercase, 1 special character |
| Email | Standard email format |
| Rating | 1–5 (integer) |

## Database Schema

- **users** — id, name, email, password, address, role, timestamps
- **stores** — id, name, email, address, owner_id, timestamps
- **ratings** — id, user_id, store_id, rating, timestamps
- **Constraint:** UNIQUE(user_id, store_id)

See `database/schema.sql` and `docs/Database_Design.md`.

## Deployment

See `docs/Deployment_Guide.md` for production deployment instructions.

## License

MIT
