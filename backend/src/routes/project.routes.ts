import { Router } from 'express';
import * as projectCtrl from '../controllers/project.controller';
import { authenticate, isAdmin, optionalAuth } from '../middleware/auth';
import { validate, sanitizeInput } from '../middleware/validate';
import { upload } from '../middleware/upload';
import { projectValidation, idParamValidation, paginationValidation } from '../validators';

const router = Router();

router.use(sanitizeInput);

router.get('/', optionalAuth, paginationValidation, validate, projectCtrl.getProjects);
router.get('/:id', optionalAuth, projectCtrl.getProject);
router.post('/', authenticate, isAdmin, upload.array('images', 5), projectValidation, validate, projectCtrl.createProject);
router.put('/:id', authenticate, isAdmin, idParamValidation, validate, projectCtrl.updateProject);
router.delete('/:id', authenticate, isAdmin, idParamValidation, validate, projectCtrl.deleteProject);

export default router;
