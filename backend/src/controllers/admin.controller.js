const consultationRepo = require('../repositories/consultation.repository');
const { successResponse } = require('../utils/response');

class AdminController {
  async getAllConsultations(req, res, next) {
    try {
      const assignedTo = req.query.assigned_to;
      const consultations = await consultationRepo.getAllConsultations(assignedTo);
      successResponse(res, 200, 'All consultations retrieved successfully', consultations);
    } catch (err) {
      next(err);
    }
  }

  async assignConsultation(req, res, next) {
    try {
      const { id } = req.params;
      const { assigned_to } = req.body;

      const updated = await consultationRepo.assignConsultation(id, assigned_to);
      if (!updated) {
        return next({ status: 404, message: 'Consultation not found', isOperational: true });
      }

      successResponse(res, 200, 'Consultation assigned successfully', updated);
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

  async createConsultation(req, res, next) {
    try {
      const consultation = await consultationRepo.createConsultation(req.body, []);
      successResponse(res, 201, 'Consultation created successfully', consultation);
    } catch (err) {
      next(err);
    }
  }

  async deleteConsultation(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await consultationRepo.deleteConsultation(id);
      if (!deleted || deleted.length === 0) {
        return res.status(404).json({ success: false, message: 'Consultation not found' });
      }
      successResponse(res, 200, 'Consultation deleted successfully', deleted[0]);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AdminController();
