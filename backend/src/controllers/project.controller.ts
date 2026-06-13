import { Request, Response } from 'express';
import { AppError, asyncHandler, sendSuccess, sendPaginated } from '../utils/errors';
import { getDB, updateDB, uuidv4 } from '../lib/store';

const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const createProject = asyncHandler(async (req: Request, res: Response) => {
  const project = {
    id: uuidv4(), ...req.body,
    slug: slugify(req.body.title) + '-' + Date.now(),
    images: req.body.images || [],
    createdAt: new Date().toISOString(),
  };
  updateDB((d) => { d.projects.push(project); });
  sendSuccess(res, project, 'Project created', 201);
});

export const getProjects = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const category = req.query.category as string | undefined;
  const status = req.query.status as string | undefined;
  const search = ((req.query.search as string) || '').toLowerCase();
  const db = getDB();

  let list = [...db.projects];
  if (category) list = list.filter((p) => p.category === category);
  if (status) list = list.filter((p) => p.status === status);
  if (search) list = list.filter((p) => p.title.toLowerCase().includes(search));

  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  sendPaginated(res, list.slice((page - 1) * limit, page * limit), list.length, page, limit);
});

export const getProject = asyncHandler(async (req: Request, res: Response) => {
  const db = getDB();
  const project = db.projects.find((p) => p.id === req.params.id || p.slug === req.params.id);
  if (!project) throw new AppError('Project not found', 404);
  sendSuccess(res, project);
});

export const updateProject = asyncHandler(async (req: Request, res: Response) => {
  updateDB((d) => { const p = d.projects.find((x) => x.id === req.params.id); if (p) Object.assign(p, req.body); });
  sendSuccess(res, getDB().projects.find((p) => p.id === req.params.id), 'Project updated');
});

export const deleteProject = asyncHandler(async (req: Request, res: Response) => {
  updateDB((d) => { d.projects = d.projects.filter((p) => p.id !== req.params.id); });
  sendSuccess(res, null, 'Project deleted');
});
