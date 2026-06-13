import { Router } from 'express';
import * as donationCtrl from '../controllers/donation.controller';
import { authenticate, isAdmin, optionalAuth } from '../middleware/auth';
import { validate, sanitizeInput } from '../middleware/validate';
import { donationValidation, idParamValidation, paginationValidation } from '../validators';

const router = Router();

router.use(sanitizeInput);

router.get('/campaigns', optionalAuth, donationCtrl.getCampaigns);
router.get('/stats', authenticate, isAdmin, donationCtrl.getDonationStats);
router.post('/', optionalAuth, donationValidation, validate, donationCtrl.createDonation);
router.get('/', authenticate, isAdmin, paginationValidation, validate, donationCtrl.getDonations);
router.get('/:id', authenticate, isAdmin, idParamValidation, validate, donationCtrl.getDonation);
router.put('/:id', authenticate, isAdmin, idParamValidation, validate, donationCtrl.updateDonation);
router.delete('/:id', authenticate, isAdmin, idParamValidation, validate, donationCtrl.deleteDonation);
router.post('/campaigns', authenticate, isAdmin, donationCtrl.createCampaign);

export default router;
