const consultationRepo = require('../repositories/consultation.repository');
const nodemailer = require('nodemailer');
const logger = require('../config/logger');

// Setup Nodemailer Transporter
const createTransporter = async () => {
  if (process.env.SMTP_HOST) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  
  // Fallback to Ethereal Email for testing if no real SMTP is provided
  const testAccount = await nodemailer.createTestAccount();
  return nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
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
        to: 'codebreaker2603@gmail.com',
        subject: `New Consultation Booking: ${data.fullName}`,
        text: `A new consultation has been booked.
        
Details:
- Name: ${data.fullName}
- Email: ${data.email}
- Phone: ${data.mobile}
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
}

module.exports = new ConsultationService();
