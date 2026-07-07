const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');
const authenticate = require('../middleware/authenticate');
const authorize = require('../middleware/authorize');

// Protect all admin routes
router.use(authenticate, authorize('admin', 'superadmin', 'lawyer'));

router.get('/consultations', adminController.getAllConsultations);
router.patch('/consultations/:id/status', adminController.updateConsultationStatus);

module.exports = router;
