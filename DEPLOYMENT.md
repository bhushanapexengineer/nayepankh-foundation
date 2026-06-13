# Deployment Guide - NayePankh Foundation

## Architecture

```
┌─────────────┐     ┌──────────────┐     ┌──────────────┐
│   Vercel    │────▶│    Render    │────▶│   Supabase   │
│  (Frontend) │     │   (Backend)  │     │ (PostgreSQL) │
└─────────────┘     └──────────────┘     └──────────────┘
                           │
                    ┌──────┴───────┐
                    │  Cloudinary  │
                    │  (Storage)   │
                    └──────────────┘
```

---

## 1. Database (Supabase)

1. Create account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **Settings → Database** and copy the connection string
4. Use the **Connection pooling** URL for production:
   ```
   postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
   ```

### Run Migrations

```bash
cd backend
DATABASE_URL="your-supabase-url" npx prisma db push
DATABASE_URL="your-supabase-url" npm run db:seed
```

---

## 2. Backend (Render)

1. Push code to GitHub
2. Go to [render.com](https://render.com) → New Web Service
3. Connect your repository, set root directory to `backend`
4. Configure:
   - **Build Command:** `npm install && npx prisma generate && npm run build`
   - **Start Command:** `npm start`
   - **Environment:** Node

5. Set environment variables:

| Variable | Value |
|----------|-------|
| `DATABASE_URL` | Supabase connection string |
| `JWT_SECRET` | Random 64-char string |
| `JWT_REFRESH_SECRET` | Random 64-char string |
| `FRONTEND_URL` | Your Vercel URL |
| `NODE_ENV` | production |
| `CLOUDINARY_CLOUD_NAME` | Your Cloudinary cloud name |
| `CLOUDINARY_API_KEY` | Your Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Your Cloudinary API secret |
| `SMTP_HOST` | smtp.gmail.com |
| `SMTP_PORT` | 587 |
| `SMTP_USER` | Your email |
| `SMTP_PASS` | App password |

Alternatively, use the included `render.yaml` for Blueprint deployment.

---

## 3. Frontend (Vercel)

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import Project
3. Set root directory to `frontend`
4. Framework preset: **Next.js**
5. Set environment variables:

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_API_URL` | `https://your-render-app.onrender.com/api` |
| `NEXT_PUBLIC_SITE_URL` | `https://your-vercel-app.vercel.app` |
| `NEXT_PUBLIC_SITE_NAME` | NayePankh Foundation |

6. Deploy

---

## 4. Cloudinary Setup

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Copy Cloud Name, API Key, API Secret from Dashboard
3. Add to backend environment variables
4. Files are stored in `nayepankh/` folder

---

## 5. Email Setup (Gmail SMTP)

1. Enable 2FA on your Google account
2. Generate an App Password at [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use the app password as `SMTP_PASS`

---

## 6. Post-Deployment Checklist

- [ ] Database migrated and seeded
- [ ] Backend health check: `GET /health`
- [ ] Frontend loads correctly
- [ ] Login works with seeded admin credentials
- [ ] CORS configured (FRONTEND_URL matches Vercel URL)
- [ ] File uploads work (Cloudinary configured)
- [ ] Email notifications work (SMTP configured)
- [ ] SSL/HTTPS enabled on all services
- [ ] Change default admin passwords

---

## Environment Variables Summary

### Backend (.env)
```
DATABASE_URL=
PORT=5000
NODE_ENV=production
FRONTEND_URL=
JWT_SECRET=
JWT_REFRESH_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
EMAIL_FROM=
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SITE_NAME=NayePankh Foundation
```

---

## Local Development

```bash
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

Visit `http://localhost:3000`
