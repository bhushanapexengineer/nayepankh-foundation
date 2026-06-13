import { body, param, query } from 'express-validator';

export const registerValidation = [
  body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 100 }),
  body('email').trim().isEmail().withMessage('Valid email is required').normalizeEmail(),
  body('password')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('Password must contain uppercase, lowercase, and number'),
];

export const loginValidation = [
  body('email').trim().isEmail().normalizeEmail(),
  body('password').notEmpty(),
];

export const volunteerValidation = [
  body('fullName').trim().notEmpty().withMessage('Full name is required'),
  body('gender').trim().notEmpty(),
  body('dateOfBirth').isISO8601().withMessage('Valid date of birth required'),
  body('phone').trim().notEmpty().matches(/^[+]?[\d\s-]{10,15}$/).withMessage('Valid phone required'),
  body('address').trim().notEmpty(),
  body('city').trim().notEmpty(),
  body('state').trim().notEmpty(),
  body('country').optional().trim(),
  body('education').trim().notEmpty(),
  body('occupation').optional().trim(),
  body('skills').isArray({ min: 1 }).withMessage('At least one skill required'),
  body('interests').isArray({ min: 1 }).withMessage('At least one interest required'),
  body('availability').trim().notEmpty(),
  body('emergencyContact').trim().notEmpty(),
  body('emergencyPhone').trim().notEmpty(),
];

export const projectValidation = [
  body('title').trim().notEmpty(),
  body('description').trim().notEmpty(),
  body('category').isIn(['EDUCATION', 'ENVIRONMENT', 'WOMEN_EMPOWERMENT', 'RURAL_DEVELOPMENT', 'HEALTH', 'SKILL_DEVELOPMENT']),
  body('status').optional().isIn(['PLANNING', 'ACTIVE', 'COMPLETED', 'ON_HOLD']),
];

export const eventValidation = [
  body('title').trim().notEmpty(),
  body('description').trim().notEmpty(),
  body('date').isISO8601(),
  body('location').trim().notEmpty(),
];

export const donationValidation = [
  body('donorName').trim().notEmpty(),
  body('donorEmail').trim().isEmail(),
  body('amount').isFloat({ min: 1 }),
  body('type').optional().isIn(['ONE_TIME', 'MONTHLY']),
];

export const paginationValidation = [
  query('page').optional().isInt({ min: 1 }).toInt(),
  query('limit').optional().isInt({ min: 1, max: 100 }).toInt(),
  query('search').optional().trim(),
];

export const idParamValidation = [param('id').isUUID().withMessage('Invalid ID')];
