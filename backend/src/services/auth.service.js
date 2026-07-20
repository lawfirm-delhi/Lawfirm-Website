const { db } = require('../config/database');
const { v4: uuidv4 } = require('uuid');
const { hashPassword, verifyPassword } = require('../utils/password');
const { generateTokens } = require('../utils/jwt');

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
    return await db.transaction(async (trx) => {
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
    // Generate an OTP or reset token
    const user = await db('users').where({ email }).first();
    if (!user) {
      // For security, don't throw error to prevent email enumeration
      return { message: 'If the email exists, a reset link will be sent.' };
    }
    
    // NOTE: This would normally generate an OTP and send via email.
    // Since we just need the backend method for now as per requirements:
    return { message: 'Reset email functionality is mocked for now.' };
  }
}

module.exports = new AuthService();
