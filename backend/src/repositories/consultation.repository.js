const { db } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class ConsultationRepository {
  async getNextReferenceNumber() {
    const year = new Date().getFullYear();
    const countRecord = await db('consultations').count('id as count').first();
    const nextNum = parseInt(countRecord.count, 10) + 1;
    return `CONS-${year}-${nextNum.toString().padStart(6, '0')}`;
  }

  async createConsultation(data, documents) {
    return await db.transaction(async (trx) => {
      const refNumber = await this.getNextReferenceNumber();
      
      const consultation = await trx('consultations').insert({
        id: uuidv4(),
        reference_number: refNumber,
        name: data.name,
        email: data.email,
        phone: data.phone,
        company: data.company,
        practice_area: data.practiceArea,
        subject: data.subject,
        description: data.description,
        consultation_mode: data.consultationMode,
        preferred_date: data.preferredDate,
        preferred_time: data.preferredTime,
        status: 'Pending'
      }).returning('*');

      const consultationId = consultation[0].id;

      if (documents && documents.length > 0) {
        const docsToInsert = documents.map(doc => ({
          id: uuidv4(),
          consultation_id: consultationId,
          original_name: doc.originalname,
          filename: doc.filename,
          mime_type: doc.mimetype,
          size: doc.size,
          path: doc.path
        }));
        await trx('documents').insert(docsToInsert);
      }

      return consultation[0];
    });
  }
}

module.exports = new ConsultationRepository();
