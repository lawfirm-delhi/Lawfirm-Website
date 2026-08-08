const consultationRepo = require('../repositories/consultation.repository');
const { sendEmail } = require('../utils/email');
const logger = require('../config/logger');

class ConsultationService {
  async bookConsultation(data, files) {
    const consultation = await consultationRepo.createConsultation(data, files);
    
    try {
      const subject = `New Consultation Booking: ${data.name}`;
      const html = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
          <h2 style="color: #c7a962; text-align: center;">New Consultation Booking</h2>
          <p>A new consultation has been booked through the website.</p>
          
          <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 40%;">Reference Number:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${consultation.reference_number}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Client Name:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Company:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.company || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Practice Area:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.practiceArea}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Mode:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.consultationMode || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Preferred Date:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.preferredDate || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Preferred Time:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.preferredTime || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Subject:</td>
              <td style="padding: 8px; border-bottom: 1px solid #eee;">${data.subject || 'N/A'}</td>
            </tr>
          </table>
          
          <div style="margin-top: 20px;">
            <strong style="display: block; margin-bottom: 5px;">Description / Message:</strong>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 14px; color: #333; line-height: 1.5;">${data.description}</div>
          </div>
        </div>
      `;

      const adminEmail = process.env.ADMIN_EMAIL || 'lawfirm.delhi.official@gmail.com';
      sendEmail(adminEmail, subject, html).then(() => {
        logger.info(`Consultation booking email sent successfully to ${adminEmail}`);
      }).catch(err => {
        logger.error(`Failed to send consultation booking email: ${err.message}`);
      });
    } catch (err) {
      logger.error('Failed to configure email: ' + err.message);
    }

    return {
      referenceNumber: consultation.reference_number,
      status: consultation.status,
      message: 'Consultation booked successfully. We will contact you shortly.'
    };
  }

  async getConsultationsForUser(userId) {
    return await consultationRepo.getConsultationsByUserId(userId);
  }
}

module.exports = new ConsultationService();
