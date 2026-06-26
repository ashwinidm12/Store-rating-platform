# Deployment Guide

This guide covers deploying the Store Rating Platform to a production environment.

## Architecture Overview

```
[Browser] → [React Frontend (Nginx/Static)] → [Express API] → [MySQL Database]
```

## 1. Production Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
DB_HOST=your-db-host
DB_USER=store_app
DB_PASSWORD=strong_random_password
DB_NAME=store_rating_db
JWT_SECRET=long_random_secret_at_least_32_chars
JWT_EXPIRES_IN=12h
NODE_ENV=production
```

### Frontend (`frontend/.env.production`)

```env
VITE_API_URL=https://api.yourdomain.com/api
```

Rebuild the frontend after changing environment variables:

```bash
cd frontend && npm run build
```

## 2. Database Setup

1. Create a dedicated MySQL user with least privilege:

```sql
CREATE USER 'store_app'@'%' IDENTIFIED BY 'strong_random_password';
GRANT SELECT, INSERT, UPDATE, DELETE ON store_rating_db.* TO 'store_app'@'%';
FLUSH PRIVILEGES;
```

2. Run schema and seed scripts:

```bash
mysql -u store_app -p < database/schema.sql
mysql -u store_app -p < database/seed.sql
```

3. Change default seed account passwords immediately after first login.

## 3. Backend Deployment

### Option A: PM2 (recommended for VPS)

```bash
cd backend
npm install --production
npm start
```

Using PM2:

```bash
npm install -g pm2
pm2 start src/server.js --name store-rating-api
pm2 save
pm2 startup
```

### Option B: Docker

Example Dockerfile for backend:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 5000
CMD ["node", "src/server.js"]
```

## 4. Frontend Deployment

Build static assets:

```bash
cd frontend
npm install
npm run build
```

Serve the `frontend/dist` folder using Nginx, Apache, Vercel, Netlify, or S3 + CloudFront.

### Nginx example

```nginx
server {
    listen 80;
    server_name yourdomain.com;
    root /var/www/store-rating-platform/frontend/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

## 5. Reverse Proxy for API

Route API traffic through Nginx:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:5000/api/;
    proxy_http_version 1.1;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
}
```

## 6. HTTPS

Use Let's Encrypt with Certbot:

```bash
sudo certbot --nginx -d yourdomain.com -d api.yourdomain.com
```

## 7. Security Checklist

- [ ] Set a strong `JWT_SECRET`
- [ ] Use HTTPS everywhere
- [ ] Restrict MySQL access to application server IP
- [ ] Change all default seed passwords
- [ ] Enable firewall (allow only 80/443 and SSH)
- [ ] Set `NODE_ENV=production`
- [ ] Configure CORS to allow only your frontend domain
- [ ] Enable automated database backups
- [ ] Monitor logs with PM2 or a log aggregation service

## 8. GitHub Repository Structure

Recommended repository layout:

```
store-rating-platform/
├── .github/workflows/     # CI/CD pipelines (optional)
├── backend/
├── frontend/
├── database/
├── docs/
├── .gitignore
└── README.md
```

Do not commit `.env` files. Use `.env.example` as templates.

## 9. Health Monitoring

Verify the API is running:

```bash
curl https://api.yourdomain.com/api/health
```

Expected response:

```json
{ "success": true, "message": "Store Rating Platform API is running" }
```

## 10. Troubleshooting

| Issue | Solution |
|-------|----------|
| Database connection failed | Verify DB credentials, host, and firewall rules |
| 401 on all requests | Check JWT secret consistency and token expiry |
| CORS errors | Update backend CORS config for production domain |
| Blank frontend page | Ensure `VITE_API_URL` was set before `npm run build` |
| Sequelize sync errors | Run `database/schema.sql` manually first |
