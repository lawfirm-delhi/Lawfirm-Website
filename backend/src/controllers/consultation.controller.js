const consultationService = require('../services/consultation.service');
const { successResponse } = require('../utils/response');

class ConsultationController {
  async bookConsultation(req, res, next) {
    try {
      const result = await consultationService.bookConsultation(req.body, req.files);
      successResponse(res, 201, 'Consultation request submitted successfully', result);
    } catch (err) {
      next(err);
    }
  }

  async getMe(req, res, next) {
    try {
      const consultations = await consultationService.getConsultationsForUser(req.user.id);
      successResponse(res, 200, 'User consultations retrieved', consultations);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new ConsultationController();
