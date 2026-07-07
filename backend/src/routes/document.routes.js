const express = require('express');
const router = express.Router();
const documentController = require('../controllers/document.controller');
const authenticate = require('../middleware/authenticate');
const upload = require('../middleware/upload');

// All document routes require authentication
router.use(authenticate);

// We use upload.single('document') because the frontend will send the file under the 'document' field
router.post('/upload', upload.single('document'), documentController.uploadDocument);

router.get('/case/:consultationId', documentController.getConsultationDocuments);

module.exports = router;
