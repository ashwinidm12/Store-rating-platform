# API Documentation

Base URL: `http://localhost:5000/api`

## Authentication

### POST /auth/register
Register a normal user (role is always `USER`).

**Body:** `{ name, email, password, address }`

### POST /auth/login
Login for all roles.

**Body:** `{ email, password }`

**Response:** `{ token, user }`

### POST /auth/logout
Logout (client-side token removal).

**Headers:** `Authorization: Bearer <token>`

### POST /auth/change-password
**Body:** `{ currentPassword, newPassword }`

## Admin (requires ADMIN role)

### GET /admin/dashboard
Returns `{ totalUsers, totalStores, totalRatings }`.

### GET /admin/users
Query params: `name`, `email`, `address`, `role`, `sortBy`, `sortOrder`, `page`, `limit`

### POST /admin/users
**Body:** `{ name, email, password, address, role }`

Roles: `ADMIN`, `USER`, `STORE_OWNER`

### GET /admin/users/:id
Returns user profile and store ratings for store owners.

### GET /admin/stores
Query params: `search`, `sortBy`, `sortOrder`, `page`, `limit`

### POST /admin/stores
**Body:** `{ name, email, address, owner_id }`

## Stores

### GET /stores
Public store listing.

Query params: `search`, `sortBy`, `sortOrder`, `page`, `limit`

### GET /stores/:id
Authenticated store details.

### GET /stores/:storeId/rating
Authenticated user's rating for a store.

## Ratings (authenticated)

### GET /ratings/me
Current user's submitted ratings.

### POST /ratings
**Body:** `{ store_id, rating }`

### PUT /ratings/:storeId
**Body:** `{ rating }`

## Store Owner (requires STORE_OWNER role)

### GET /owner/dashboard
Returns `{ stores, averageRating, ratings }`.

### GET /owner/ratings
Query params: `search`, `sortBy`, `sortOrder`, `page`, `limit`

Returns paginated list of users who rated the owner's store(s).

## Users

### GET /users/profile
Returns authenticated user profile (password excluded).

## Health

### GET /health
Returns API status.

## Common Query Parameters

| Param | Description |
|-------|-------------|
| page | Page number (default: 1) |
| limit | Records per page (default: 10) |
| sortBy | Column to sort by |
| sortOrder | `ASC` or `DESC` |
| search | Text search filter |

## Validation Rules

| Field | Rules |
|-------|-------|
| name | 20-60 characters |
| address | max 400 characters |
| password | 8-16 chars, 1 uppercase, 1 special character |
| email | valid email format |
| rating | integer 1-5 |

Import `Postman_Collection.json` for ready-to-use requests.
