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
      const user = await trx('users').insert({
        id: uuidv4(),
        email: adminEmail,
        password_hash: passwordHash,
        role: 'admin'
      }).returning('*');

      console.log(`Created admin user with ID: ${user[0].id}`);
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
