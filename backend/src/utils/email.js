const nodemailer = require('nodemailer');

const smtpPort = parseInt(process.env.SMTP_PORT) || 465;
const smtpSecure = process.env.SMTP_SECURE !== undefined 
  ? process.env.SMTP_SECURE === 'true' 
  : smtpPort === 465;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: smtpPort,
  secure: smtpSecure,
  auth: {
    user: process.env.SMTP_USER || 'lawfirm.delhi.official@gmail.com',
    pass: process.env.SMTP_PASS || 'tvmjvtqopyugkmnp',
  },
});

const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Justice & Associates" <${process.env.SMTP_USER}>`,
      to,
      subject,
      html,
    });
    console.log('Message sent: %s', info.messageId);
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

const sendOTPVerificationEmail = async (email, otp) => {
  const subject = 'Your Password Reset OTP - Justice & Associates';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
      <h2 style="color: #c7a962; text-align: center;">Justice & Associates</h2>
      <p style="font-size: 16px; color: #333;">Hello,</p>
      <p style="font-size: 16px; color: #333;">You have requested to reset your password. Here is your One-Time Password (OTP):</p>
      <div style="background-color: #f5f5f5; padding: 15px; text-align: center; border-radius: 6px; margin: 20px 0;">
        <span style="font-size: 24px; font-weight: bold; letter-spacing: 4px; color: #1a1e2d;">${otp}</span>
      </div>
      <p style="font-size: 14px; color: #666;">This OTP is valid for the next 15 minutes. If you did not request a password reset, please ignore this email.</p>
      <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
      <p style="font-size: 12px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} Justice & Associates. All rights reserved.</p>
    </div>
  `;
  return sendEmail(email, subject, html);
};

module.exports = {
  sendEmail,
  sendOTPVerificationEmail
};
