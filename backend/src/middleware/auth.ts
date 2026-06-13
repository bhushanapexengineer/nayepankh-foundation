import { Request, Response, NextFunction } from 'express';
import type { Role } from '../lib/store';
import { verifyAccessToken, TokenPayload } from '../utils/jwt';
import { AppError } from '../utils/errors';

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export const authenticate = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : req.cookies?.token;

  if (!token) {
    return next(new AppError('Authentication required', 401));
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch {
    next(new AppError('Invalid or expired token', 401));
  }
};

export const optionalAuth = (req: Request, _res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : req.cookies?.token;

  if (token) {
    try {
      req.user = verifyAccessToken(token);
    } catch {
      // ignore invalid token for optional auth
    }
  }
  next();
};

export const authorize = (...roles: Role[]) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Authentication required', 401));
    }
    if (!roles.includes(req.user.role)) {
      return next(new AppError('Insufficient permissions', 403));
    }
    next();
  };
};

export const isAdmin = authorize('SUPER_ADMIN', 'ADMIN');
export const isSuperAdmin = authorize('SUPER_ADMIN');
export const isVolunteer = authorize('VOLUNTEER', 'ADMIN', 'SUPER_ADMIN');
