import { Request, Response } from 'express';
import { hashPassword, comparePassword } from '../utils/password';
import { generateAccessToken, generateRefreshToken, generateOTP, generateResetToken } from '../utils/jwt';
import { sendOTPEmail, sendPasswordResetEmail } from '../utils/email';
import { AppError, asyncHandler, sendSuccess } from '../utils/errors';
import { getDB, updateDB, uuidv4, Role } from '../lib/store';

export const register = asyncHandler(async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  const db = getDB();

  if (db.users.find((u) => u.email === email)) throw new AppError('Email already registered', 400);

  const hashedPassword = await hashPassword(password);
  const otp = generateOTP();
  const user = {
    id: uuidv4(), name, email, password: hashedPassword,
    role: (role === 'VOLUNTEER' ? 'VOLUNTEER' : 'VISITOR') as Role,
    isVerified: false, otp, otpExpiry: new Date(Date.now() + 10 * 60 * 1000).toISOString(),
    createdAt: new Date().toISOString(),
  };

  updateDB((d) => { d.users.push(user); });
  await sendOTPEmail(email, otp);
  sendSuccess(res, { user: { id: user.id, name: user.name, email: user.email, role: user.role, createdAt: user.createdAt } }, 'Registration successful', 201);
});

export const verifyOTP = asyncHandler(async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  const db = getDB();
  const user = db.users.find((u) => u.email === email);
  if (!user) throw new AppError('User not found', 404);
  if (user.otp !== otp) throw new AppError('Invalid OTP', 400);
  if (user.otpExpiry && new Date(user.otpExpiry) < new Date()) throw new AppError('OTP expired', 400);

  updateDB((d) => {
    const u = d.users.find((x) => x.id === user.id)!;
    u.isVerified = true; u.otp = null; u.otpExpiry = null;
  });

  const tokens = {
    accessToken: generateAccessToken({ userId: user.id, email: user.email, role: user.role }),
    refreshToken: generateRefreshToken({ userId: user.id, email: user.email, role: user.role }),
  };
  res.cookie('token', tokens.accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
  sendSuccess(res, { user: { id: user.id, name: user.name, email: user.email, role: user.role }, ...tokens });
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = getDB().users.find((u) => u.email === email);
  if (!user) throw new AppError('Invalid credentials', 401);
  if (!(await comparePassword(password, user.password))) throw new AppError('Invalid credentials', 401);

  const tokens = {
    accessToken: generateAccessToken({ userId: user.id, email: user.email, role: user.role }),
    refreshToken: generateRefreshToken({ userId: user.id, email: user.email, role: user.role }),
  };
  res.cookie('token', tokens.accessToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict', maxAge: 7 * 24 * 60 * 60 * 1000 });
  sendSuccess(res, { user: { id: user.id, name: user.name, email: user.email, role: user.role }, ...tokens });
});

export const logout = asyncHandler(async (_req: Request, res: Response) => {
  res.clearCookie('token');
  sendSuccess(res, null, 'Logged out successfully');
});

export const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const { email } = req.body;
  const user = getDB().users.find((u) => u.email === email);
  if (user) {
    const resetToken = generateResetToken();
    updateDB((d) => {
      const u = d.users.find((x) => x.id === user.id)!;
      u.resetToken = resetToken;
      u.resetExpiry = new Date(Date.now() + 60 * 60 * 1000).toISOString();
    });
    await sendPasswordResetEmail(email, `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`);
  }
  sendSuccess(res, null, 'If email exists, reset link has been sent');
});

export const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const { token, password } = req.body;
  const db = getDB();
  const user = db.users.find((u) => u.resetToken === token && u.resetExpiry && new Date(u.resetExpiry) > new Date());
  if (!user) throw new AppError('Invalid or expired reset token', 400);

  const hashedPassword = await hashPassword(password);
  updateDB((d) => {
    const u = d.users.find((x) => x.id === user.id)!;
    u.password = hashedPassword; u.resetToken = null; u.resetExpiry = null;
  });
  sendSuccess(res, null, 'Password reset successful');
});

export const getMe = asyncHandler(async (req: Request, res: Response) => {
  const db = getDB();
  const user = db.users.find((u) => u.id === req.user!.userId);
  if (!user) throw new AppError('User not found', 404);
  const volunteer = db.volunteers.find((v) => v.userId === user.id);
  sendSuccess(res, { id: user.id, name: user.name, email: user.email, role: user.role, isVerified: user.isVerified, createdAt: user.createdAt, volunteer });
});

export const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  const { refreshToken: token } = req.body;
  if (!token) throw new AppError('Refresh token required', 400);
  const { verifyRefreshToken } = await import('../utils/jwt');
  sendSuccess(res, { accessToken: generateAccessToken(verifyRefreshToken(token)) });
});
