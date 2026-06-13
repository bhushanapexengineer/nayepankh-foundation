import { Router } from 'express';
import * as authCtrl from '../controllers/auth.controller';
import { authenticate } from '../middleware/auth';
import { validate, sanitizeInput } from '../middleware/validate';
import { registerValidation, loginValidation } from '../validators';

const router = Router();

router.use(sanitizeInput);

router.post('/register', registerValidation, validate, authCtrl.register);
router.post('/verify-otp', authCtrl.verifyOTP);
router.post('/login', loginValidation, validate, authCtrl.login);
router.post('/logout', authCtrl.logout);
router.post('/forgot-password', authCtrl.forgotPassword);
router.post('/reset-password', authCtrl.resetPassword);
router.post('/refresh-token', authCtrl.refreshToken);
router.get('/me', authenticate, authCtrl.getMe);

export default router;
