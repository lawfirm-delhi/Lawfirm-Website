const consultationRepo = require('../repositories/consultation.repository');
const authRepo = require('../repositories/auth.repository');
const { successResponse } = require('../utils/response');

class AdminController {
  async getAllConsultations(req, res, next) {
    try {
      const consultations = await consultationRepo.getAllConsultations();
      successResponse(res, 200, 'All consultations retrieved successfully', consultations);
    } catch (err) {
      next(err);
    }
  }

  async updateConsultationStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      
      const allowedStatuses = ['Pending', 'Approved', 'Completed', 'Rejected'];
      if (!allowedStatuses.includes(status)) {
        return next({ status: 400, message: 'Invalid status', isOperational: true });
      }

      const updated = await consultationRepo.updateConsultationStatus(id, status);
      if (!updated) {
        return next({ status: 404, message: 'Consultation not found', isOperational: true });
      }

      successResponse(res, 200, 'Consultation status updated', updated);
    } catch (err) {
      next(err);
    }
  }
  async getClientDetails(req, res, next) {
    try {
      const { email } = req.params;
      const history = await authRepo.getClientHistoryByEmail(email);
      if (!history) {
        return res.status(404).json({ success: false, message: 'Client not found' });
      }
      successResponse(res, 200, 'Client details retrieved', history);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
