const { db } = require('../config/database');

class AuthRepository {
  async getUserById(id) {
    return await db('users')
      .leftJoin('clients', 'users.id', 'clients.user_id')
      .where('users.id', id)
      .select(
        'users.id',
        'users.email',
        'users.role',
        'users.is_locked',
        'clients.full_name',
        'clients.company',
        'clients.mobile',
        'clients.admin_notes'
      )
      .first();
  }

  async getAllClients() {
    return await db('users')
      .join('clients', 'users.id', 'clients.user_id')
      .where('users.role', 'client')
      .select(
        'users.id',
        'users.email',
        'users.is_locked',
        'users.created_at',
        'clients.full_name',
        'clients.company',
        'clients.mobile',
        'clients.admin_notes'
      );
  }

  async getClientHistoryByEmail(email) {
    const clientData = await db('users')
      .join('clients', 'users.id', 'clients.user_id')
      .where('users.email', email)
      .select(
        'users.id',
        'users.email',
        'users.is_locked',
        'users.created_at',
        'clients.full_name',
        'clients.company',
        'clients.mobile',
        'clients.admin_notes'
      )
      .first();

    if (!clientData) return null;

    // Fetch their consultations
    const consultations = await db('consultations')
      .where('user_id', clientData.id)
      .orderBy('created_at', 'desc');

    clientData.consultations = consultations;
    return clientData;
  }

  async toggleUserLock(id, isLocked) {
    await db('users').where({ id }).update({ is_locked: isLocked });
    return await this.getUserById(id);
  }

  async updateClientNotes(email, notes) {
    const user = await db('users').where({ email }).first();
    if (!user) return null;

    await db('clients').where({ user_id: user.id }).update({ admin_notes: notes });
    return await this.getClientHistoryByEmail(email);
  }
}

module.exports = new AuthRepository();
