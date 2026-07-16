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
  async updateProfile(userId, data) {
    return await db.transaction(async (trx) => {
      // Update email in users table if provided
      if (data.email) {
        await trx('users').where({ id: userId }).update({ email: data.email });
      }

      // Update client details
      const clientUpdate = {};
      if (data.fullName) clientUpdate.full_name = data.fullName;
      if (data.mobile) clientUpdate.mobile = data.mobile;
      if (data.company !== undefined) clientUpdate.company = data.company;

      if (Object.keys(clientUpdate).length > 0) {
        await trx('clients').where({ user_id: userId }).update(clientUpdate);
      }
    });
  }

  async updatePassword(userId, passwordHash) {
    return await db('users').where({ id: userId }).update({ password_hash: passwordHash });
  }
  async getClientHistoryByEmail(email) {
    const user = await db('users')
      .leftJoin('clients', 'users.id', 'clients.user_id')
      .select(
        'users.id',
        'users.email',
        'users.created_at',
        'clients.full_name as fullName',
        'clients.mobile',
        'clients.company',
        'clients.admin_notes'
      )
      .where('users.email', email)
      .first();

    if (!user) return null;

    const loginHistory = await db('login_history')
      .where('user_id', user.id)
      .orderBy('created_at', 'desc')
      .limit(50);

    const consultations = await db('consultations')
      .where('email', email)
      .orderBy('created_at', 'desc');

    return {
      profile: user,
      loginHistory,
      consultations
    };
  }

  async getAllClients() {
    return await db('users')
      .leftJoin('clients', 'users.id', 'clients.user_id')
      .select(
        'users.id as userId',
        'users.email',
        'users.is_locked as isLocked',
        'users.created_at as createdAt',
        'clients.id as clientId',
        'clients.full_name as fullName',
        'clients.mobile',
        'clients.company',
        'clients.admin_notes as adminNotes'
      )
      .where('users.role', '!=', 'superadmin')
      .orderBy('users.created_at', 'desc');
  }

  async toggleUserLock(userId, isLocked) {
    return await db('users')
      .where({ id: userId })
      .update({ is_locked: isLocked })
      .returning('*');
  }

  async updateClientNotes(email, notes) {
    const user = await db('users').where({ email }).first();
    if (!user) return null;
    
    return await db('clients')
      .where({ user_id: user.id })
      .update({ admin_notes: notes })
      .returning('*');
  }
}

module.exports = new AuthRepository();
