const { db } = require('../config/database');
const { v4: uuidv4 } = require('uuid');

class AuthRepository {
  async createUser(userData, clientData) {
    return await db.transaction(async (trx) => {
      const user = await trx('users').insert({
        id: uuidv4(),
        email: userData.email,
        password_hash: userData.passwordHash,
        role: userData.role || 'client'
      }).returning('*');

      if (userData.role !== 'admin' && userData.role !== 'superadmin' && clientData) {
        await trx('clients').insert({
          id: uuidv4(),
          user_id: user[0].id,
          full_name: clientData.fullName,
          mobile: clientData.mobile,
          company: clientData.company
        });
      }

      return user[0];
    });
  }

  async getUserByEmail(email) {
    return await db('users').where({ email, deleted_at: null }).first();
  }

  async getUserById(id) {
    // Select user and client details if they exist
    return await db('users')
      .leftJoin('clients', 'users.id', 'clients.user_id')
      .where('users.id', id)
      .whereNull('users.deleted_at')
      .select(
        'users.id',
        'users.email',
        'users.role',
        'clients.full_name',
        'clients.mobile',
        'clients.company'
      )
      .first();
  }

  async saveRefreshToken(userId, token, expiresAt) {
    return await db('refresh_tokens').insert({
      id: uuidv4(),
      user_id: userId,
      token,
      expires_at: expiresAt
    });
  }

  async deleteRefreshToken(token) {
    return await db('refresh_tokens').where({ token }).del();
  }

  async getRefreshToken(token) {
    return await db('refresh_tokens').where({ token }).first();
  }

  async logLoginAttempt(userId, ip, userAgent, success) {
    return await db('login_history').insert({
      id: uuidv4(),
      user_id: userId,
      ip_address: ip,
      user_agent: userAgent,
      success
    });
  }

  async updateFailedLoginAttempts(userId, count, isLocked = false) {
    return await db('users').where({ id: userId }).update({
      failed_login_attempts: count,
      is_locked: isLocked
    });
  }
}

module.exports = new AuthRepository();
