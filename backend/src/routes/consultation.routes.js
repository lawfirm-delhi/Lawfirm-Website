const express = require('express');
const router = express.Router();
const consultationController = require('../controllers/consultation.controller');
const upload = require('../middleware/upload');
const validate = require('../middleware/validate');
const { consultationSchema } = require('../models/consultation.schema');

const handleUpload = (req, res, next) => {
  const uploadArray = upload.array('documents', 5);
  uploadArray(req, res, (err) => {
    if (err) {
      return next({ status: 400, message: err.message, isOperational: true });
    }
    next();
  });
};

router.post('/', 
  handleUpload, 
  validate(consultationSchema), 
  consultationController.bookConsultation
);

module.exports = router;
