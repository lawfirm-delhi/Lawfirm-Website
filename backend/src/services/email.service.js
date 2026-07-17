const nodemailer = require('nodemailer');
const env = require('../config/env');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: env.SMTP_HOST || 'smtp.gmail.com',
      port: env.SMTP_PORT || 465,
      secure: env.SMTP_SECURE !== 'false',
      auth: {
        user: env.SMTP_USER,
        pass: env.SMTP_PASS,
      },
    });
  }

  async sendPasswordResetEmail(email, otp) {
    try {
      const mailOptions = {
        from: `"Justice & Associates" <${env.SMTP_USER}>`,
        to: email,
        subject: 'Password Reset Verification Code',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #c8a46a;">Justice & Associates</h2>
            <p>You requested a password reset. Please use the following 6-digit code to verify your identity:</p>
            <div style="background: #f1f5f9; padding: 20px; text-align: center; font-size: 24px; letter-spacing: 5px; font-weight: bold; border-radius: 8px; margin: 20px 0;">
              ${otp}
            </div>
            <p>This code will expire in 15 minutes.</p>
            <p>If you did not request a password reset, please ignore this email.</p>
          </div>
        `
      };

      await this.transporter.sendMail(mailOptions);
      logger.info(`Password reset email sent to ${email}`);
      return true;
    } catch (error) {
      logger.error('Failed to send email:', error);
      throw new Error('Failed to send verification email');
    }
  }
}

module.exports = new EmailService();
