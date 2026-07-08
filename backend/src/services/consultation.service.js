const consultationRepo = require('../repositories/consultation.repository');
const nodemailer = require('nodemailer');
const logger = require('../config/logger');

// Setup Nodemailer Transporter
const createTransporter = async () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = process.env.SMTP_PORT || 465;
  const secure = process.env.SMTP_SECURE !== 'false';
  const user = process.env.SMTP_USER || 'codebreaker2603@gmail.com';
  const pass = process.env.SMTP_PASS || 'turgmswpxxuetvcg';

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  });
};

class ConsultationService {
  async bookConsultation(data, files) {
    const consultation = await consultationRepo.createConsultation(data, files);
    
    try {
      const transporter = await createTransporter();
      const mailOptions = {
        from: '"Justice & Associates Booking" <no-reply@justiceassociates.com>',
        to: process.env.ADMIN_EMAIL || 'lawfirm.delhi.official@gmail.com',
        subject: `New Consultation Booking: ${data.name}`,
        text: `A new consultation has been booked.
        
Details:
- Name: ${data.name}
- Email: ${data.email}
- Phone: ${data.phone}
- Practice Area: ${data.practiceArea}
- Reference Number: ${consultation.reference_number}

Message/Description:
${data.description}
`
      };
      
      const info = await transporter.sendMail(mailOptions);
      logger.info(`Consultation email sent: ${info.messageId}`);
      if (!process.env.SMTP_HOST) {
        logger.info(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`);
      }
    } catch (emailErr) {
      logger.error(`Failed to send consultation email: ${emailErr.message}`);
      // Don't fail the consultation booking just because email failed
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
