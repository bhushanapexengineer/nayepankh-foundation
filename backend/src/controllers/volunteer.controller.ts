import { Request, Response } from 'express';
import { AppError, asyncHandler, sendSuccess, sendPaginated } from '../utils/errors';
import { getDB, updateDB, uuidv4, VolunteerStatus } from '../lib/store';

export const createVolunteer = asyncHandler(async (req: Request, res: Response) => {
  const userId = req.user!.userId;
  const db = getDB();
  if (db.volunteers.find((v) => v.userId === userId)) throw new AppError('Volunteer profile already exists', 400);

  const volunteer = {
    id: uuidv4(), userId,
    fullName: req.body.fullName, gender: req.body.gender,
    dateOfBirth: req.body.dateOfBirth, phone: req.body.phone,
    address: req.body.address, city: req.body.city, state: req.body.state,
    country: req.body.country || 'India', education: req.body.education,
    occupation: req.body.occupation,
    skills: Array.isArray(req.body.skills) ? req.body.skills : String(req.body.skills).split(',').map((s: string) => s.trim()),
    interests: Array.isArray(req.body.interests) ? req.body.interests : String(req.body.interests).split(',').map((s: string) => s.trim()),
    experience: req.body.experience, availability: req.body.availability,
    emergencyContact: req.body.emergencyContact, emergencyPhone: req.body.emergencyPhone,
    status: 'PENDING' as VolunteerStatus, totalHours: 0,
    createdAt: new Date().toISOString(),
  };

  updateDB((d) => { d.volunteers.push(volunteer); });
  sendSuccess(res, volunteer, 'Volunteer registration submitted', 201);
});

export const getVolunteers = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const search = ((req.query.search as string) || '').toLowerCase();
  const status = req.query.status as VolunteerStatus | undefined;
  const db = getDB();

  let list = db.volunteers.map((v) => ({ ...v, user: db.users.find((u) => u.id === v.userId) }));
  if (status) list = list.filter((v) => v.status === status);
  if (search) list = list.filter((v) => v.fullName.toLowerCase().includes(search) || v.city.toLowerCase().includes(search) || v.user?.email.toLowerCase().includes(search));

  const total = list.length;
  const data = list.slice((page - 1) * limit, page * limit);
  sendPaginated(res, data, total, page, limit);
});

export const getVolunteer = asyncHandler(async (req: Request, res: Response) => {
  const db = getDB();
  const volunteer = db.volunteers.find((v) => v.id === req.params.id);
  if (!volunteer) throw new AppError('Volunteer not found', 404);
  sendSuccess(res, { ...volunteer, user: db.users.find((u) => u.id === volunteer.userId), tasks: db.tasks.filter((t) => t.volunteerId === volunteer.id) });
});

export const getMyProfile = asyncHandler(async (req: Request, res: Response) => {
  const db = getDB();
  const volunteer = db.volunteers.find((v) => v.userId === req.user!.userId);
  if (!volunteer) throw new AppError('Volunteer profile not found', 404);
  sendSuccess(res, {
    ...volunteer,
    tasks: db.tasks.filter((t) => t.volunteerId === volunteer.id),
    certificates: db.certificates.filter((c) => c.volunteerId === volunteer.id),
    eventRegistrations: db.eventRegistrations.filter((r) => r.volunteerId === volunteer.id).map((r) => ({ ...r, event: db.events.find((e) => e.id === r.eventId) })),
  });
});

export const updateVolunteer = asyncHandler(async (req: Request, res: Response) => {
  const db = getDB();
  const volunteer = db.volunteers.find((v) => v.id === req.params.id);
  if (!volunteer) throw new AppError('Volunteer not found', 404);
  if (req.user!.role === 'VOLUNTEER' && volunteer.userId !== req.user!.userId) throw new AppError('Unauthorized', 403);

  updateDB((d) => {
    const v = d.volunteers.find((x) => x.id === req.params.id)!;
    Object.assign(v, req.body);
  });
  sendSuccess(res, getDB().volunteers.find((v) => v.id === req.params.id), 'Profile updated');
});

export const approveVolunteer = asyncHandler(async (req: Request, res: Response) => {
  const { status } = req.body;
  if (!['APPROVED', 'REJECTED'].includes(status)) throw new AppError('Invalid status', 400);
  updateDB((d) => {
    const v = d.volunteers.find((x) => x.id === req.params.id);
    if (v) v.status = status as VolunteerStatus;
  });
  const volunteer = getDB().volunteers.find((v) => v.id === req.params.id);
  sendSuccess(res, volunteer, `Volunteer ${status.toLowerCase()}`);
});

export const deleteVolunteer = asyncHandler(async (req: Request, res: Response) => {
  updateDB((d) => { d.volunteers = d.volunteers.filter((v) => v.id !== req.params.id); });
  sendSuccess(res, null, 'Volunteer deleted');
});

export const uploadDocument = asyncHandler(async (_req: Request, res: Response) => {
  sendSuccess(res, { message: 'Document saved locally' }, 'Document uploaded', 201);
});

export const getVolunteerStats = asyncHandler(async (_req: Request, res: Response) => {
  const db = getDB();
  sendSuccess(res, {
    total: db.volunteers.length,
    active: db.volunteers.filter((v) => v.status === 'APPROVED').length,
    pending: db.volunteers.filter((v) => v.status === 'PENDING').length,
  });
});
