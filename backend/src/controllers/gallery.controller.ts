import { Request, Response } from 'express';
import { AppError, asyncHandler, sendSuccess } from '../utils/errors';
import { getDB, updateDB, uuidv4 } from '../lib/store';

export const createGalleryItem = asyncHandler(async (req: Request, res: Response) => {
  const item = {
    id: uuidv4(), title: req.body.title || 'Gallery Item', description: req.body.description,
    url: req.body.url || 'https://images.unsplash.com/photo-1559027615-cd4628903329?w=600',
    type: req.body.type || 'IMAGE', featured: req.body.featured === 'true',
    createdAt: new Date().toISOString(),
  };
  updateDB((d) => { d.gallery.push(item); });
  sendSuccess(res, item, 'Gallery item created', 201);
});

export const getGallery = asyncHandler(async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 20;
  const type = req.query.type as string | undefined;
  const db = getDB();
  let list = [...db.gallery];
  if (type) list = list.filter((g) => g.type === type);
  list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  sendSuccess(res, { data: list.slice((page - 1) * limit, page * limit), pagination: { total: list.length, page, limit } });
});

export const deleteGalleryItem = asyncHandler(async (req: Request, res: Response) => {
  updateDB((d) => { d.gallery = d.gallery.filter((g) => g.id !== req.params.id); });
  sendSuccess(res, null, 'Gallery item deleted');
});
