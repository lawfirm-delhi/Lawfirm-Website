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
router.patch('/consultations/:id/assign', adminController.assignConsultation);
router.patch('/consultations/:id/status', adminController.updateConsultationStatus);
router.post('/consultations', adminController.createConsultation);
router.delete('/consultations/:id', adminController.deleteConsultation);

// Profile Verification
router.post('/verify-profile', (req, res) => {
  const { profileName, password } = req.body;
  const profiles = {
    'Main Admin': 'Admin@123',
    'Garima': 'Garima@123',
    'Pankaj': 'Pankaj@123'
  };

  if (profiles[profileName] && profiles[profileName] === password) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid profile password.' });
  }
});

router.get('/clients', adminController.getAllClients);
router.patch('/clients/:id/lock', adminController.toggleUserLock);
router.get('/clients/:email/details', adminController.getClientDetails);
router.patch('/clients/:email/notes', adminController.updateClientNotes);

module.exports = router;
