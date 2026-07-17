const { db } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class ConsultationRepository {
  async getNextReferenceNumber(trx) {
    const year = new Date().getFullYear();
    const query = trx ? trx('consultations') : db('consultations');
    const countRecord = await query.count('id as count').first();
    const nextNum = parseInt(countRecord.count, 10) + 1;
    return `CONS-${year}-${nextNum.toString().padStart(6, '0')}`;
  }

  async createConsultation(data, documents) {
    return await db.transaction(async (trx) => {
      const refNumber = await this.getNextReferenceNumber(trx);
      const consultationId = uuidv4();
      
      const newConsultation = {
        id: consultationId,
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
      };

      await trx('consultations').insert(newConsultation);

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

      return newConsultation;
    });
  }
  async getConsultationsByUserId(userId) {
    // 1. Get the client record for this user
    const client = await db('clients').where('user_id', userId).first();
    const user = await db('users').where('id', userId).first();

    // 2. Fetch consultations matching either the client_id or the user's email
    let query = db('consultations')
      .where('deleted_at', null)
      .orderBy('created_at', 'desc');

    if (client) {
      query = query.where(function() {
        this.where('client_id', client.id)
            .orWhere('email', user.email);
      });
    } else if (user) {
      query = query.where('email', user.email);
    } else {
      return [];
    }

    return await query;
  }

  async getAllConsultations(assignedTo = null) {
    let query = db('consultations').where('deleted_at', null);
    
    if (assignedTo && assignedTo !== 'Main Admin') {
      query = query.where('assigned_to', assignedTo);
    }
    
    return await query.orderBy('created_at', 'desc');
  }

  async updateConsultationStatus(id, status) {
    const updated = await db('consultations')
      .where({ id })
      .update({ status })
      .returning('*');
    return updated[0];
  }
  
  async assignConsultation(id, assignedTo) {
    const updated = await db('consultations')
      .where({ id })
      .update({ assigned_to: assignedTo })
      .returning('*');
    return updated[0];
  }
  async deleteConsultation(id) {
    return await db('consultations')
      .where({ id })
      .update({ deleted_at: new Date() })
      .returning('*');
  }
}

module.exports = new ConsultationRepository();
