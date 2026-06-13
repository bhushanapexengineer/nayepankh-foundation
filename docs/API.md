# NayePankh Foundation - API Documentation

Base URL: `http://localhost:5000/api` (development)

All responses follow the format:
```json
{ "success": true, "message": "...", "data": { ... } }
```

Paginated responses include:
```json
{ "success": true, "data": [...], "pagination": { "total": 100, "page": 1, "limit": 10, "totalPages": 10 } }
```

---

## Authentication

### POST /auth/register
Register a new user.
```json
{ "name": "John Doe", "email": "john@email.com", "password": "SecurePass1", "role": "VOLUNTEER" }
```

### POST /auth/verify-otp
Verify email with OTP.
```json
{ "email": "john@email.com", "otp": "123456" }
```

### POST /auth/login
```json
{ "email": "admin@nayepankh.org", "password": "Admin@123" }
```
Returns: `{ user, accessToken, refreshToken }`

### POST /auth/logout
Clears auth cookie.

### POST /auth/forgot-password
```json
{ "email": "john@email.com" }
```

### POST /auth/reset-password
```json
{ "token": "reset-token", "password": "NewPass123" }
```

### POST /auth/refresh-token
```json
{ "refreshToken": "..." }
```

### GET /auth/me
🔒 Returns current user profile.

---

## Volunteers

### POST /volunteers
🔒 Create volunteer profile (multipart/form-data).
Fields: fullName, gender, dateOfBirth, phone, address, city, state, country, education, occupation, skills[], interests[], availability, emergencyContact, emergencyPhone, profilePhoto (file)

### GET /volunteers
🔒👑 List volunteers. Query: `?page=1&limit=10&search=&status=PENDING`

### GET /volunteers/me
🔒 Get own volunteer profile with tasks, certificates, events.

### GET /volunteers/:id
🔒 Get volunteer by ID.

### PUT /volunteers/:id
🔒 Update volunteer profile.

### PATCH /volunteers/:id/status
🔒👑 Approve/reject volunteer.
```json
{ "status": "APPROVED" }
```

### DELETE /volunteers/:id
🔒👑 Delete volunteer.

### POST /volunteers/documents
🔒 Upload document (multipart: file, title).

### GET /volunteers/stats
🔒👑 Volunteer statistics.

---

## Projects

### GET /projects
List projects. Query: `?page=1&category=EDUCATION&status=ACTIVE&search=`

### GET /projects/:id
Get project by ID or slug.

### POST /projects
🔒👑 Create project (multipart: images[]).

### PUT /projects/:id
🔒👑 Update project.

### DELETE /projects/:id
🔒👑 Delete project.

---

## Events

### GET /events
List events. Query: `?upcoming=true&status=UPCOMING`

### GET /events/:id
Get event by ID or slug.

### POST /events
🔒👑 Create event.

### PUT /events/:id
🔒👑 Update event.

### DELETE /events/:id
🔒👑 Delete event.

### POST /events/:id/register
🔒 Register for event (volunteer must be approved).

### POST /events/:id/checkin
🔒 Check in to event.

### POST /events/:id/checkout
🔒 Check out (tracks hours).

---

## Donations

### GET /donations/campaigns
List active donation campaigns.

### POST /donations
Create donation.
```json
{ "donorName": "John", "donorEmail": "john@email.com", "amount": 1000, "type": "ONE_TIME", "campaignId": "uuid" }
```

### GET /donations
🔒👑 List donations.

### GET /donations/stats
🔒👑 Donation analytics.

### POST /donations/campaigns
🔒👑 Create campaign.

---

## Gallery

### GET /gallery
List gallery items. Query: `?type=IMAGE&page=1`

### POST /gallery
🔒👑 Upload gallery item (multipart: file, title, description).

### DELETE /gallery/:id
🔒👑 Delete gallery item.

---

## Reports & Dashboard

### GET /dashboard
🔒👑 Admin dashboard stats and charts.

### POST /reports
🔒👑 Generate report.
```json
{ "reportType": "VOLUNTEER", "title": "Monthly Report" }
```

### GET /export/excel/:type
🔒👑 Export Excel. Types: `volunteers`, `donations`

### GET /export/pdf/:id
🔒 Export volunteer certificate PDF.

---

## Tasks & Certificates

### GET /tasks
🔒 List tasks (volunteer sees own, admin sees all).

### POST /tasks
🔒👑 Create task.

### PUT /tasks/:id
🔒 Update task status.

### GET /certificates
🔒 List certificates.

### POST /certificates
🔒👑 Issue certificate.

---

## Public Content

### GET /search?q=education
Global search across projects, events, news.

### GET /testimonials
List testimonials.

### GET /news
List news articles.

### GET /team
List team members.

### GET /impact
Impact statistics for homepage.

### GET /announcements
List active announcements.

### POST /newsletter
```json
{ "email": "user@email.com" }
```

---

## Users (Admin)

### GET /users
🔒👑 List all users.

### PATCH /users/:id/role
🔒🔴 Update user role.
```json
{ "role": "ADMIN" }
```

---

## Auth Legend

| Symbol | Meaning |
|--------|---------|
| 🔒 | Requires authentication (Bearer token) |
| 👑 | Requires Admin or Super Admin role |
| 🔴 | Requires Super Admin role |

## Roles

- `SUPER_ADMIN` - Full system access
- `ADMIN` - Manage content, volunteers, reports
- `VOLUNTEER` - Dashboard, events, tasks
- `VISITOR` - Public access only

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Validation error |
| 401 | Not authenticated |
| 403 | Insufficient permissions |
| 404 | Resource not found |
| 429 | Rate limit exceeded |
| 500 | Server error |
