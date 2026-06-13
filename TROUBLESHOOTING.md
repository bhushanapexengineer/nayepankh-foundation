# Troubleshooting Guide

## npm SSL Certificate Errors

If you see `UNABLE_TO_VERIFY_LEAF_SIGNATURE`:

```powershell
npm config set strict-ssl false
npm install
```

For Prisma generate:

```powershell
$env:NODE_TLS_REJECT_UNAUTHORIZED=0
npx prisma generate
```

---

## Backend: esbuild / tsx Platform Error

If `tsx watch` fails with an esbuild platform error, use the compiled dev mode:

```powershell
npm run dev:prod
```

Or rebuild esbuild:

```powershell
npm rebuild esbuild
npm install tsx --save-dev
```

---

## Backend: Prisma Client Not Generated

```powershell
cd backend
$env:NODE_TLS_REJECT_UNAUTHORIZED=0
npx prisma generate
npm run build
npm run dev:prod
```

---

## Database Connection Failed

Error: `Can't reach database server at localhost:5432`

**Option A — Supabase (Recommended, free):**
1. Create project at [supabase.com](https://supabase.com)
2. Copy connection string from Settings → Database
3. Update `DATABASE_URL` in `backend/.env`
4. Run:
   ```powershell
   npx prisma db push
   npm run db:seed
   ```

**Option B — Local PostgreSQL:**
1. Install PostgreSQL
2. Create database: `CREATE DATABASE nayepankh;`
3. Update `DATABASE_URL` in `backend/.env`

---

## Frontend: Google Fonts Build Error

Fixed — fonts now load via CSS `@import` in `globals.css` instead of `next/font`.

If build still fails on network-restricted environments, fonts fall back to Segoe UI.

---

## Frontend: Port Already in Use

Next.js will auto-switch to port 3001. Access at `http://localhost:3001`.

---

## Verify Everything Works

```powershell
# Backend health
Invoke-RestMethod http://localhost:5000/health

# Frontend
# Open http://localhost:3000 (or 3001)
```

---

## Default Login Credentials

After running `npm run db:seed`:

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@nayepankh.org | Admin@123 |
| Admin | manager@nayepankh.org | Admin@123 |
