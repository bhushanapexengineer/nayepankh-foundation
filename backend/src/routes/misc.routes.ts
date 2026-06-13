import { Router } from 'express';
import * as galleryCtrl from '../controllers/gallery.controller';
import * as reportCtrl from '../controllers/report.controller';
import * as miscCtrl from '../controllers/misc.controller';
import { authenticate, isAdmin, isVolunteer } from '../middleware/auth';
import { validate, sanitizeInput } from '../middleware/validate';
import { upload } from '../middleware/upload';
import { paginationValidation } from '../validators';

const router = Router();

router.use(sanitizeInput);

// Gallery
router.get('/gallery', paginationValidation, validate, galleryCtrl.getGallery);
router.post('/gallery', authenticate, isAdmin, upload.single('file'), galleryCtrl.createGalleryItem);
router.delete('/gallery/:id', authenticate, isAdmin, galleryCtrl.deleteGalleryItem);

// Reports
router.get('/reports', authenticate, isAdmin, reportCtrl.getReports);
router.post('/reports', authenticate, isAdmin, reportCtrl.generateReport);
router.get('/export/excel/:type', authenticate, isAdmin, reportCtrl.exportExcel);
router.get('/export/pdf/:id', authenticate, reportCtrl.exportPDF);
router.get('/dashboard', authenticate, isAdmin, reportCtrl.getDashboardStats);

// Tasks
router.get('/tasks', authenticate, miscCtrl.getTasks);
router.post('/tasks', authenticate, isAdmin, miscCtrl.createTask);
router.put('/tasks/:id', authenticate, miscCtrl.updateTask);
router.delete('/tasks/:id', authenticate, isAdmin, miscCtrl.deleteTask);

// Certificates
router.get('/certificates', authenticate, isVolunteer, miscCtrl.getCertificates);
router.post('/certificates', authenticate, isAdmin, miscCtrl.createCertificate);

// Newsletter & Announcements
router.post('/newsletter', miscCtrl.subscribeNewsletter);
router.get('/announcements', miscCtrl.getAnnouncements);
router.post('/announcements', authenticate, isAdmin, miscCtrl.createAnnouncement);

// Public content
router.get('/search', miscCtrl.globalSearch);
router.get('/testimonials', miscCtrl.getTestimonials);
router.get('/news', miscCtrl.getNews);
router.get('/team', miscCtrl.getTeamMembers);
router.get('/impact', miscCtrl.getImpactStats);

// Users
router.get('/users', authenticate, isAdmin, miscCtrl.getUsers);
router.patch('/users/:id/role', authenticate, isAdmin, miscCtrl.updateUserRole);

export default router;
