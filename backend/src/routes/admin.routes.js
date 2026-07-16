const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin.controller');

// Custom simple password authentication middleware
const simpleAdminAuth = (req, res, next) => {
  const password = req.headers['x-admin-password'];
  if (password === 'Welcome@123#') {
    next();
  } else {
    res.status(401).json({ success: false, message: 'Unauthorized. Invalid admin password.' });
  }
};

// Protect all admin routes
router.use(simpleAdminAuth);

router.get('/consultations', adminController.getAllConsultations);
router.patch('/consultations/:id/status', adminController.updateConsultationStatus);
router.get('/clients/:email/details', adminController.getClientDetails);

module.exports = router;
