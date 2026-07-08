const consultationRepo = require('../repositories/consultation.repository');
const { Resend } = require('resend');
const logger = require('../config/logger');

// Setup Resend
const resend = new Resend(process.env.RESEND_API_KEY || 're_SB9NyZRs_3VEF5uzWtS6hXsMERiUPi8Yz');

class ConsultationService {
  async bookConsultation(data, files) {
    const consultation = await consultationRepo.createConsultation(data, files);
    
    try {
      const mailOptions = {
        from: 'onboarding@resend.dev', // Default sender for unverified domains
        to: process.env.ADMIN_EMAIL || 'lawfirm.delhi.official@gmail.com',
        subject: `New Consultation Booking: ${data.name}`,
        text: `A new consultation has been booked.
        
Details:
- Reference Number: ${consultation.reference_number}
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}
- Company: ${data.company || 'N/A'}
- Practice Area: ${data.practiceArea}
- Consultation Mode: ${data.consultationMode || 'N/A'}
- Preferred Date: ${data.preferredDate || 'N/A'}
- Preferred Time: ${data.preferredTime || 'N/A'}
- Subject: ${data.subject || 'N/A'}

Message/Description:
${data.description}
`
      };
      
      resend.emails.send(mailOptions).then(response => {
        if (response.error) {
          logger.error(`Email delivery failed: ${response.error.message}`);
        } else {
          logger.info(`Consultation email sent with Resend ID: ${response.data.id}`);
        }
      }).catch(err => {
        logger.error(`Email delivery error: ${err.message}`);
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
