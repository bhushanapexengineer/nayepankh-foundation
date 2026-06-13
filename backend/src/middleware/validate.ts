import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const validate = (req: Request, _res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const message = errors.array().map((e) => e.msg).join(', ');
    return next(new AppError(message, 400));
  }
  next();
};

export const sanitizeInput = (req: Request, _res: Response, next: NextFunction) => {
  const sanitize = (obj: Record<string, unknown>): Record<string, unknown> => {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      if (typeof value === 'string') {
        result[key] = value.replace(/<[^>]*>/g, '').trim();
      } else if (value && typeof value === 'object' && !Array.isArray(value)) {
        result[key] = sanitize(value as Record<string, unknown>);
      } else {
        result[key] = value;
      }
    }
    return result;
  };

  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query as Record<string, unknown>) as typeof req.query;
  next();
};
