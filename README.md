# NayePankh Foundation 🌱

NGO website with volunteer management, donations, events & projects.  
**No database needed** — data is stored in a local JSON file, auto-created on first run.

---

## Run Locally (2 terminals)

### Terminal 1 — Backend
```bash
cd backend
npm install
npm run dev
```
Runs at → http://localhost:5000

### Terminal 2 — Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs at → http://localhost:3000

Open **http://localhost:3000** in your browser.

---

## Login Credentials

| Role        | Email                    | Password  |
|-------------|--------------------------|-----------|
| Super Admin | admin@nayepankh.org      | Admin@123 |
| Admin       | manager@nayepankh.org    | Admin@123 |

---

## Tech Stack
- **Frontend:** Next.js 15, TypeScript, Tailwind CSS, Framer Motion
- **Backend:** Express.js, TypeScript, JWT Auth, JSON file storage (no DB)
