const documentRepo = require('../repositories/document.repository');
const { successResponse } = require('../utils/response');

class DocumentController {
  async uploadDocument(req, res, next) {
    try {
      const { consultationId } = req.body;
      const file = req.file;

      if (!file) {
        return next({ status: 400, message: 'No file uploaded', isOperational: true });
      }

      if (!consultationId) {
        return next({ status: 400, message: 'consultationId is required', isOperational: true });
      }

      const document = await documentRepo.saveDocumentMetadata({
        consultationId,
        uploadedBy: req.user.id,
        originalName: file.originalname,
        filename: file.filename,
        mimeType: file.mimetype,
        size: file.size,
        path: file.path // In the future, this would be the Cloudinary URL
      });

      successResponse(res, 201, 'Document uploaded successfully', document);
    } catch (err) {
      next(err);
    }
  }

  async getConsultationDocuments(req, res, next) {
    try {
      const { consultationId } = req.params;
      const documents = await documentRepo.getDocumentsByConsultationId(consultationId);
      successResponse(res, 200, 'Documents retrieved successfully', documents);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new DocumentController();
