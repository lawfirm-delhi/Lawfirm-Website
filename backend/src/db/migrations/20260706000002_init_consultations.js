/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.createTable('consultations', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.string('reference_number').notNullable().unique();
    table.uuid('client_id').references('id').inTable('clients').nullable();
    
    table.string('name').notNullable();
    table.string('email').notNullable();
    table.string('phone').notNullable();
    table.string('company').nullable();

    table.string('practice_area').notNullable();
    table.string('subject').notNullable();
    table.text('description').notNullable();
    table.string('consultation_mode').notNullable();
    table.date('preferred_date').nullable();
    table.string('preferred_time').nullable();
    
    table.string('status').notNullable().defaultTo('Pending');
    
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });

  await knex.schema.createTable('documents', (table) => {
    table.uuid('id').primary().defaultTo(knex.fn.uuid());
    table.uuid('consultation_id').references('id').inTable('consultations').onDelete('CASCADE').nullable();
    table.uuid('case_id').nullable();
    table.uuid('uploaded_by').references('id').inTable('users').nullable();
    
    table.string('original_name').notNullable();
    table.string('filename').notNullable();
    table.string('mime_type').notNullable();
    table.integer('size').notNullable();
    table.string('path').notNullable();
    
    table.timestamps(true, true);
    table.timestamp('deleted_at').nullable();
  });
};

exports.down = async function(knex) {
  await knex.schema.dropTableIfExists('documents');
  await knex.schema.dropTableIfExists('consultations');
};
