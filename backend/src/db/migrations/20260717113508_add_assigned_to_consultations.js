/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  await knex.schema.alterTable('consultations', (table) => {
    table.string('assigned_to').notNullable().defaultTo('Unassigned');
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function(knex) {
  await knex.schema.alterTable('consultations', (table) => {
    table.dropColumn('assigned_to');
  });
};
