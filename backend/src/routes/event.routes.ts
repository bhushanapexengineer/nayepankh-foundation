import { Router } from 'express';
import * as eventCtrl from '../controllers/event.controller';
import { authenticate, isAdmin, isVolunteer, optionalAuth } from '../middleware/auth';
import { validate, sanitizeInput } from '../middleware/validate';
import { upload } from '../middleware/upload';
import { eventValidation, idParamValidation, paginationValidation } from '../validators';

const router = Router();

router.use(sanitizeInput);

router.get('/', optionalAuth, paginationValidation, validate, eventCtrl.getEvents);
router.get('/:id', optionalAuth, eventCtrl.getEvent);
router.post('/', authenticate, isAdmin, upload.array('images', 5), eventValidation, validate, eventCtrl.createEvent);
router.put('/:id', authenticate, isAdmin, idParamValidation, validate, eventCtrl.updateEvent);
router.delete('/:id', authenticate, isAdmin, idParamValidation, validate, eventCtrl.deleteEvent);
router.post('/:id/register', authenticate, isVolunteer, idParamValidation, validate, eventCtrl.registerForEvent);
router.post('/:id/checkin', authenticate, isVolunteer, idParamValidation, validate, eventCtrl.checkIn);
router.post('/:id/checkout', authenticate, isVolunteer, idParamValidation, validate, eventCtrl.checkOut);

export default router;
