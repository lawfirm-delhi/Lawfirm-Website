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

      // Send automated email confirmation response to client (as per PDF page 6)
      const clientSubject = 'Thank you for contacting NYATI | Consultation Request Received';
      const clientHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px; line-height: 1.6; color: #333;">
          <h2 style="color: #c7a962; margin-bottom: 20px;">NYATI Law Chamber</h2>
          <p>Dear ${data.name},</p>
          <p>Thank you for reaching out to NYATI (formerly PK Sinha and Associates). We have successfully received your inquiry and any attached documents submitted through our website contact form.</p>
          <p>Our legal team, under the guidance of our founder, Advocate Pankaj Sinha, is currently reviewing the details of your query. Given the critical nature of legal timelines, we treat every inquiry with the utmost priority.</p>
          
          <h3 style="color: #c7a962; border-bottom: 1px solid #eee; padding-bottom: 5px; margin-top: 25px;">What happens next?</h3>
          <ul style="padding-left: 20px; margin: 10px 0;">
            <li style="margin-bottom: 8px;"><strong>Case Assessment:</strong> We will assess the initial details provided regarding your matter (District Court, High Court, or CAT/Service matter).</li>
            <li style="margin-bottom: 8px;"><strong>Response Time:</strong> A member of our team or an associate will contact you via phone or email to discuss the next steps or to schedule a formal consultation.</li>
          </ul>
          
          <p style="font-style: italic; font-size: 13px; color: #666; margin-top: 25px;">Please note: Submitting this form or receiving this confirmation does not establish a formal attorney-client relationship.</p>
          <p>Thank you for placing your trust in NYATI.</p>
          
          <hr style="border: 0; border-top: 1px solid #eee; margin: 25px 0;" />
          <p style="margin: 0; font-size: 14px; font-weight: bold; color: #333;">Warm regards,</p>
          <p style="margin: 3px 0; font-size: 14px; font-weight: bold; color: #c7a962;">NYATI Team</p>
          <p style="margin: 5px 0 0 0; font-size: 12px; color: #999;">
            <a href="https://www.nyatilegal.com" style="color: #c7a962; text-decoration: none;">www.nyatilegal.com</a>
          </p>
        </div>
      `;
      sendEmail(data.email, clientSubject, clientHtml).then(() => {
        logger.info(`Automated confirmation response email sent to client: ${data.email}`);
      }).catch(err => {
        logger.error(`Failed to send automated confirmation email to client: ${err.message}`);
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
