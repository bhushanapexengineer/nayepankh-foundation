import { Request, Response } from 'express';
import { AppError, asyncHandler, sendSuccess, sendPaginated } from '../utils/errors';
import { getDB, updateDB, uuidv4 } from '../lib/store';

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const createEvent = asyncHandler(async (req: Request, res: Response) => {
  const event = {
    id: uuidv4(), ...req.body,
    slug: slugify(req.body.title) + '-' + Date.now(),
    images: req.body.images || [],
    createdAt: new Date().toISOString(),
  };
  updateDB((d) => { d.events.push(event); });
  sendSuccess(res, event, 'Event created', 201);
});

export const getEvents = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const status = req.query.status as string | undefined;
  const upcoming = req.query.upcoming === 'true';
  const db = getDB();

  let list = db.events.map((e) => ({ ...e, _count: { registrations: db.eventRegistrations.filter((r) => r.eventId === e.id).length } }));
  if (status) list = list.filter((e) => e.status === status);
  if (upcoming) list = list.filter((e) => new Date(e.date) >= new Date() && e.status === 'UPCOMING');
  list.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  sendPaginated(res, list.slice((page - 1) * limit, page * limit), list.length, page, limit);
});

export const getEvent = asyncHandler(async (req: Request, res: Response) => {
  const db = getDB();
  const event = db.events.find((e) => e.id === req.params.id || e.slug === req.params.id);
  if (!event) throw new AppError('Event not found', 404);
  sendSuccess(res, { ...event, _count: { registrations: db.eventRegistrations.filter((r) => r.eventId === event.id).length } });
});

export const updateEvent = asyncHandler(async (req: Request, res: Response) => {
  updateDB((d) => { const e = d.events.find((x) => x.id === req.params.id); if (e) Object.assign(e, req.body); });
  sendSuccess(res, getDB().events.find((e) => e.id === req.params.id), 'Event updated');
});

export const deleteEvent = asyncHandler(async (req: Request, res: Response) => {
  updateDB((d) => { d.events = d.events.filter((e) => e.id !== req.params.id); });
  sendSuccess(res, null, 'Event deleted');
});

export const registerForEvent = asyncHandler(async (req: Request, res: Response) => {
  const db = getDB();
  const volunteer = db.volunteers.find((v) => v.userId === req.user!.userId);
  if (!volunteer) throw new AppError('Volunteer profile required', 400);
  if (volunteer.status !== 'APPROVED') throw new AppError('Volunteer not approved', 403);
  if (!db.events.find((e) => e.id === req.params.id)) throw new AppError('Event not found', 404);
  if (db.eventRegistrations.find((r) => r.eventId === req.params.id && r.volunteerId === volunteer.id)) throw new AppError('Already registered', 400);

  const reg = { id: uuidv4(), eventId: String(req.params.id), volunteerId: volunteer.id, registeredAt: new Date().toISOString() };
  updateDB((d) => { d.eventRegistrations.push(reg); });
  sendSuccess(res, reg, 'Registered for event', 201);
});

export const checkIn = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, { checkIn: new Date().toISOString() }, 'Checked in');
});

export const checkOut = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, { checkOut: new Date().toISOString() }, 'Checked out');
});
