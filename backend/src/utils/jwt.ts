import jwt, { SignOptions } from 'jsonwebtoken';
import crypto from 'crypto';
import { Role } from '../lib/store';

export interface TokenPayload {
  userId: string;
  email: string;
  role: Role;
}

const accessOptions: SignOptions = { expiresIn: '7d' };
const refreshOptions: SignOptions = { expiresIn: '30d' };

export const generateAccessToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'dev-secret', accessOptions);
};

export const generateRefreshToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret', refreshOptions);
};

export const verifyAccessToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
};

export const verifyRefreshToken = (token: string): TokenPayload => {
  return jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as TokenPayload;
};

export const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const generateResetToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};
