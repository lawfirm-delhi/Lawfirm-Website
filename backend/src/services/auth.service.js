const { db } = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { hashPassword, verifyPassword } = require('../utils/password');
const { generateTokens } = require('../utils/jwt');
const { sendOTPVerificationEmail, sendEmail } = require('../utils/email');
const crypto = require('crypto');

class AuthService {
  async signup(data) {
    const { fullName, email, phone, password } = data;

    // Check if user exists
    const existingUser = await db('users').where({ email }).first();
    if (existingUser) {
      const error = new Error('Email is already registered');
      error.statusCode = 409;
      throw error;
    }

    const hashedPassword = await hashPassword(password);

    // Create user and client profile in transaction
    const result = await db.transaction(async (trx) => {
      const userId = uuidv4();

      await trx('users').insert({
        id: userId,
        email,
        password_hash: hashedPassword,
        role: 'client',
        is_verified: true, // Instant verification as requested
      });

      await trx('clients').insert({
        id: uuidv4(),
        user_id: userId,
        full_name: fullName,
        mobile: phone,
      });

      // Generate 48h token
      const tokens = generateTokens({ id: userId, role: 'client' }, '48h');
      
      return {
        user: { id: userId, email, role: 'client', full_name: fullName },
        tokens
      };
    });

    // Send emails in the background after transaction completes successfully
    const clientEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #A38342; text-align: center;">Welcome to NYATI</h2>
        <p style="font-size: 16px; color: #333;">Dear ${fullName},</p>
        <p style="font-size: 16px; color: #333;">Thank you for registering on the NYATI Client Portal. Your account has been successfully created.</p>
        <p style="font-size: 16px; color: #333;">You can now log in to your portal to book consultations, track your cases, and upload legal documentation securely.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://lawfirm-frontend-gnti.onrender.com/login" style="background-color: #A38342; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-weight: bold;">Log In to Portal</a>
        </div>
        <p style="font-size: 14px; color: #666;">If you have any questions or require immediate legal assistance, please reply to this email.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} NYATI. All rights reserved.</p>
      </div>
    `;

    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #0B1D45; text-align: center;">New Client Registration</h2>
        <p style="font-size: 16px; color: #333;">Hello Case Management Team,</p>
        <p style="font-size: 16px; color: #333;">A new client has registered on the NYATI Portal. Here are their details:</p>
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 16px;">
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold; width: 30%;">Full Name:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${fullName}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Email Address:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${email}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Phone Number:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding: 8px; border-bottom: 1px solid #eee; font-weight: bold;">Registration Date:</td>
            <td style="padding: 8px; border-bottom: 1px solid #eee;">${new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' })} (IST)</td>
          </tr>
        </table>
        <p style="font-size: 14px; color: #666;">This profile is now active in the system.</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #999; text-align: center;">&copy; ${new Date().getFullYear()} NYATI. All rights reserved.</p>
      </div>
    `;

    // Fire-and-forget in background
    sendEmail(email, 'Welcome to NYATI Client Portal', clientEmailHtml).catch(err => {
      console.error('Failed to send welcome email:', err);
    });

    const adminEmail = process.env.ADMIN_EMAIL || 'lawfirm.delhi.official@gmail.com';
    sendEmail(adminEmail, `New Client Registration - ${fullName}`, adminEmailHtml).catch(err => {
      console.error('Failed to send admin notification email:', err);
    });

    return result;
  }

  async login(email, password) {
    const user = await db('users').where({ email }).first();
    
    if (!user) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    if (user.is_locked) {
      const error = new Error('Account is locked. Please contact support.');
      error.statusCode = 403;
      throw error;
    }

    const isMatch = await verifyPassword(password, user.password_hash);
    
    if (!isMatch) {
      const error = new Error('Invalid email or password');
      error.statusCode = 401;
      throw error;
    }

    // Get client profile
    const client = await db('clients').where({ user_id: user.id }).first();
    const fullName = client ? client.full_name : 'User';

    // Generate 48h token as requested
    const tokens = generateTokens({ id: user.id, role: user.role }, '48h');

    // Update last login
    await db('login_history').insert({
      id: uuidv4(),
      user_id: user.id,
      success: true,
      ip_address: 'frontend',
      user_agent: 'frontend'
    });

    return {
      user: { id: user.id, email: user.email, role: user.role, full_name: fullName },
      tokens
    };
  }

  async forgotPassword(email) {
    const user = await db('users').where({ email }).first();
    if (!user) {
      // For security, don't throw error to prevent email enumeration
      return { message: 'If the email exists, a reset link will be sent.' };
    }
    
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Set expiration to 15 minutes from now
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Save OTP to user record
    await db('users').where({ id: user.id }).update({
      reset_otp: otp,
      reset_otp_expires_at: expiresAt,
      updated_at: new Date()
    });

    // Send email
    await sendOTPVerificationEmail(user.email, otp);

    return { message: 'OTP sent successfully to your email.' };
  }

  async resetPassword(email, otp, newPassword) {
    const user = await db('users').where({ email }).first();
    
    if (!user) {
      const error = new Error('Invalid email or OTP');
      error.statusCode = 400;
      throw error;
    }

    // Check if OTP matches and is not expired
    if (user.reset_otp !== otp) {
      const error = new Error('Invalid OTP');
      error.statusCode = 400;
      throw error;
    }

    if (!user.reset_otp_expires_at || new Date(user.reset_otp_expires_at) < new Date()) {
      const error = new Error('OTP has expired');
      error.statusCode = 400;
      throw error;
    }

    // Hash new password
    const hashedPassword = await hashPassword(newPassword);

    // Update password and clear OTP
    await db('users').where({ id: user.id }).update({
      password_hash: hashedPassword,
      reset_otp: null,
      reset_otp_expires_at: null,
      updated_at: new Date()
    });

    return { message: 'Password reset successfully. You can now log in.' };
  }

  async updateProfile(userId, profileData) {
    const { fullName, phone, company } = profileData;
    
    // Check if client record exists first
    const existingClient = await db('clients').where({ user_id: userId }).first();
    
    if (existingClient) {
      await db('clients').where({ user_id: userId }).update({
        full_name: fullName,
        mobile: phone,
        company: company || null,
        updated_at: new Date()
      });
    } else {
      // Create it if it's missing (e.g. legacy accounts or admins testing)
      await db('clients').insert({
        id: uuidv4(),
        user_id: userId,
        full_name: fullName,
        mobile: phone,
        company: company || null
      });
    }

    const updatedClient = await db('clients').where({ user_id: userId }).first();
    const user = await db('users').where({ id: userId }).first();
    
    return {
      id: user.id,
      email: user.email,
      role: user.role,
      full_name: updatedClient.full_name,
      mobile: updatedClient.mobile,
      company: updatedClient.company
    };
  }
}

module.exports = new AuthService();
