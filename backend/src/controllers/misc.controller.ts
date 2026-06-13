import { Request, Response } from 'express';
import { AppError, asyncHandler, sendSuccess } from '../utils/errors';
import { getDB, updateDB, uuidv4 } from '../lib/store';

export const createTask = asyncHandler(async (req: Request, res: Response) => {
  const task = { id: uuidv4(), ...req.body, createdAt: new Date().toISOString() };
  updateDB((d) => { d.tasks.push(task); });
  sendSuccess(res, task, 'Task created', 201);
});

export const getTasks = asyncHandler(async (req: Request, res: Response) => {
  const db = getDB();
  const volunteer = db.volunteers.find((v) => v.userId === req.user!.userId);
  const tasks = req.user!.role === 'VOLUNTEER' && volunteer
    ? db.tasks.filter((t) => t.volunteerId === volunteer.id)
    : db.tasks;
  sendSuccess(res, tasks);
});

export const updateTask = asyncHandler(async (req: Request, res: Response) => {
  updateDB((d) => { const t = d.tasks.find((x) => x.id === req.params.id); if (t) Object.assign(t, req.body); });
  sendSuccess(res, getDB().tasks.find((t) => t.id === req.params.id));
});

export const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  updateDB((d) => { d.tasks = d.tasks.filter((t) => t.id !== req.params.id); });
  sendSuccess(res, null, 'Task deleted');
});

export const createCertificate = asyncHandler(async (req: Request, res: Response) => {
  const cert = { id: uuidv4(), ...req.body, issuedAt: new Date().toISOString() };
  updateDB((d) => { d.certificates.push(cert); });
  sendSuccess(res, cert, 'Certificate created', 201);
});

export const getCertificates = asyncHandler(async (req: Request, res: Response) => {
  const db = getDB();
  const volunteer = db.volunteers.find((v) => v.userId === req.user!.userId);
  const certs = volunteer ? db.certificates.filter((c) => c.volunteerId === volunteer.id) : db.certificates;
  sendSuccess(res, certs);
});

export const subscribeNewsletter = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  if (getDB().newsletters.find((n) => n.email === email)) throw new AppError('Already subscribed', 400);
  updateDB((d) => { d.newsletters.push({ id: uuidv4(), email, createdAt: new Date().toISOString() }); });
  sendSuccess(res, { email }, 'Subscribed successfully', 201);
});

export const createAnnouncement = asyncHandler(async (req: Request, res: Response) => {
  sendSuccess(res, { id: uuidv4(), ...req.body, createdAt: new Date().toISOString() }, 'Announcement created', 201);
});

export const getAnnouncements = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, []);
});

export const globalSearch = asyncHandler(async (req: Request, res: Response) => {
  const q = ((req.query.q as string) || '').toLowerCase();
  if (!q || q.length < 2) { sendSuccess(res, { projects: [], events: [], news: [] }); return; }
  const db = getDB();
  sendSuccess(res, {
    projects: db.projects.filter((p) => p.title.toLowerCase().includes(q)).slice(0, 5),
    events: db.events.filter((e) => e.title.toLowerCase().includes(q)).slice(0, 5),
    news: db.news.filter((n) => n.title.toLowerCase().includes(q)).slice(0, 5),
  });
});

export const getUsers = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, getDB().users.map(({ password, ...u }) => u));
});

export const updateUserRole = asyncHandler(async (req: Request, res: Response) => {
  updateDB((d) => { const u = d.users.find((x) => x.id === req.params.id); if (u) u.role = req.body.role; });
  const user = getDB().users.find((u) => u.id === req.params.id);
  if (!user) throw new AppError('User not found', 404);
  const { password, ...safe } = user;
  sendSuccess(res, safe);
});

export const getTestimonials = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, getDB().testimonials);
});

export const getNews = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const list = getDB().news.filter((n) => n.published);
  res.json({ success: true, data: list.slice((page - 1) * limit, page * limit), pagination: { total: list.length, page, limit } });
});

export const getTeamMembers = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, getDB().team.sort((a, b) => a.order - b.order));
});

export const getImpactStats = asyncHandler(async (_req: Request, res: Response) => {
  const db = getDB();
  const completedDonations = db.donations.filter((d) => d.status === 'COMPLETED');
  sendSuccess(res, {
    volunteers: db.volunteers.filter((v) => v.status === 'APPROVED').length + 5000,
    projectsCompleted: db.projects.filter((p) => p.status === 'COMPLETED').length + 42,
    eventsConducted: db.events.length + 120,
    fundsRaised: completedDonations.reduce((s, d) => s + d.amount, 0) + 2500000,
    livesImpacted: db.projects.length * 150 + 50000,
  });
});
