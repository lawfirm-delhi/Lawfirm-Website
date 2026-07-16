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

  async getAllClients(req, res, next) {
    try {
      const clients = await authRepo.getAllClients();
      successResponse(res, 200, 'All clients retrieved', clients);
    } catch (err) {
      next(err);
    }
  }

  async toggleUserLock(req, res, next) {
    try {
      const { id } = req.params;
      const { isLocked } = req.body;
      const updated = await authRepo.toggleUserLock(id, isLocked);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }
      successResponse(res, 200, 'User lock status updated', updated);
    } catch (err) {
      next(err);
    }
  }

  async updateClientNotes(req, res, next) {
    try {
      const { email } = req.params;
      const { notes } = req.body;
      const updated = await authRepo.updateClientNotes(email, notes);
      if (!updated) {
        return res.status(404).json({ success: false, message: 'Client not found' });
      }
      successResponse(res, 200, 'Client notes updated', updated);
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
