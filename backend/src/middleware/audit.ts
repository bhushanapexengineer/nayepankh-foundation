import { Request, Response, NextFunction } from 'express';

export const auditLog = (_action: string, _entity?: string) => {
  return (_req: Request, _res: Response, next: NextFunction) => {
    next();
  };
};
