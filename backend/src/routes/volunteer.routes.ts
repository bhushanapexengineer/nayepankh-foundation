import { Router } from 'express';
import * as volunteerCtrl from '../controllers/volunteer.controller';
import { authenticate, isAdmin, isVolunteer } from '../middleware/auth';
import { validate, sanitizeInput } from '../middleware/validate';
import { upload } from '../middleware/upload';
import { volunteerValidation, idParamValidation, paginationValidation } from '../validators';

const router = Router();

router.use(sanitizeInput);

router.post('/', authenticate, upload.single('profilePhoto'), volunteerValidation, validate, volunteerCtrl.createVolunteer);
router.get('/me', authenticate, isVolunteer, volunteerCtrl.getMyProfile);
router.get('/stats', authenticate, isAdmin, volunteerCtrl.getVolunteerStats);
router.get('/', authenticate, isAdmin, paginationValidation, validate, volunteerCtrl.getVolunteers);
router.get('/:id', authenticate, idParamValidation, validate, volunteerCtrl.getVolunteer);
router.put('/:id', authenticate, upload.single('profilePhoto'), idParamValidation, validate, volunteerCtrl.updateVolunteer);
router.patch('/:id/status', authenticate, isAdmin, idParamValidation, validate, volunteerCtrl.approveVolunteer);
router.delete('/:id', authenticate, isAdmin, idParamValidation, validate, volunteerCtrl.deleteVolunteer);
router.post('/documents', authenticate, isVolunteer, upload.single('file'), volunteerCtrl.uploadDocument);

export default router;
