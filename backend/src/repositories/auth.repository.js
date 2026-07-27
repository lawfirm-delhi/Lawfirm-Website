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
    const clients = await db('users')
      .join('clients', 'users.id', 'clients.user_id')
      .where('users.role', 'client')
      .select(
        'users.id as userId',
        'users.email',
        'users.is_locked as isLocked',
        'users.created_at as createdAt',
        'clients.full_name as fullName',
        'clients.company',
        'clients.mobile',
        'clients.admin_notes'
      );

    return clients.map(c => ({
      ...c,
      isLocked: Boolean(c.isLocked)
    }));
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
        'clients.id as client_id',
        'clients.full_name',
        'clients.company',
        'clients.mobile',
        'clients.admin_notes'
      )
      .first();

    if (!clientData) return null;

    // Fetch their consultations
    const consultations = await db('consultations')
      .where('client_id', clientData.client_id)
      .orWhere('email', clientData.email)
      .andWhere('deleted_at', null)
      .orderBy('created_at', 'desc');

    // Fetch login history
    const loginHistory = await db('login_history')
      .where('user_id', clientData.id)
      .orderBy('created_at', 'desc')
      .limit(10);

    return {
      profile: {
        id: clientData.id,
        email: clientData.email,
        isLocked: Boolean(clientData.is_locked),
        created_at: clientData.created_at,
        fullName: clientData.full_name,
        company: clientData.company,
        mobile: clientData.mobile,
        admin_notes: clientData.admin_notes
      },
      consultations,
      loginHistory
    };
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
