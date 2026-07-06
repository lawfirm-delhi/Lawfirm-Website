/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('email').notNullable().unique();
    table.string('password_hash').notNullable();
    table.string('role').notNullable().defaultTo('client'); // 'client', 'lawyer', 'admin', 'superadmin'
    table.boolean('is_verified').defaultTo(false);
    table.boolean('is_locked').defaultTo(false);
    table.integer('failed_login_attempts').defaultTo(0);
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });

  await knex.schema.createTable('clients', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('full_name').notNullable();
    table.string('mobile').notNullable();
    table.string('company').nullable();
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });

  await knex.schema.createTable('refresh_tokens', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('token').notNullable().unique();
    table.timestamp('expires_at').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });

  await knex.schema.createTable('login_history', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('user_id').references('id').inTable('users').onDelete('CASCADE');
    table.string('ip_address').nullable();
    table.string('user_agent').nullable();
    table.boolean('success').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('login_history');
  await knex.schema.dropTableIfExists('refresh_tokens');
  await knex.schema.dropTableIfExists('clients');
  await knex.schema.dropTableIfExists('users');
};
