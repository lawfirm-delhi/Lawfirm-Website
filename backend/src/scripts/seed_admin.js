const { db } = require('../config/database');
const { hashPassword } = require('../utils/password');
const { v4: uuidv4 } = require('uuid');

async function seedAdmin() {
  try {
    console.log('Seeding admin user...');
    
    const adminEmail = 'admin@justiceassociates.example';
    const adminPassword = 'AdminPassword123!';
    
    // Check if admin exists
    const existing = await db('users').where({ email: adminEmail }).first();
    if (existing) {
      console.log('Admin user already exists.');
      process.exit(0);
    }

    const passwordHash = await hashPassword(adminPassword);

    await db.transaction(async (trx) => {
      const adminId = uuidv4();
      await trx('users').insert({
        id: adminId,
        email: adminEmail,
        password_hash: passwordHash,
        role: 'admin',
        is_verified: true
      });

      console.log(`Created admin user with ID: ${adminId}`);
      console.log(`Email: ${adminEmail}`);
      console.log(`Password: ${adminPassword}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin user:', error);
    process.exit(1);
  }
}

seedAdmin();
