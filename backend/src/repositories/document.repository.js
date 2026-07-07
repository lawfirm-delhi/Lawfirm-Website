const { db } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class DocumentRepository {
  async saveDocumentMetadata({ consultationId, uploadedBy, originalName, filename, mimeType, size, path }) {
    const document = await db('documents').insert({
      id: uuidv4(),
      consultation_id: consultationId,
      uploaded_by: uploadedBy,
      original_name: originalName,
      filename: filename,
      mime_type: mimeType,
      size: size,
      path: path
    }).returning('*');
    
    return document[0];
  }

  async getDocumentsByConsultationId(consultationId) {
    return await db('documents')
      .where({ consultation_id: consultationId, deleted_at: null })
      .orderBy('created_at', 'desc');
  }

  async getDocumentById(id) {
    return await db('documents').where({ id, deleted_at: null }).first();
  }
}

module.exports = new DocumentRepository();
