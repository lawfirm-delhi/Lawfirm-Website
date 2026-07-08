const consultationRepo = require('../repositories/consultation.repository');
const nodemailer = require('nodemailer');
const logger = require('../config/logger');

const dns = require('dns');

// Setup Nodemailer Transporter
const createTransporter = async () => {
  const addresses = await dns.promises.resolve4('smtp.gmail.com');
  const host = addresses[0];
  const port = 465;
  const secure = true;
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
    tls: {
      servername: 'smtp.gmail.com'
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 10000,
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
      
      transporter.sendMail(mailOptions).then(info => {
        logger.info(`Consultation email sent: ${info.messageId}`);
      }).catch(err => {
        logger.error(`Email delivery failed: ${err.message}`);
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
