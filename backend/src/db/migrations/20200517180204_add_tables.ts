import * as Knex from 'knex';

export async function up(knex: Knex): Promise<any> {
  await knex.schema.createTable('users', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table.string('name');
    table.string('password');
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });

  await knex.schema.createTable('runs', (table: Knex.TableBuilder) => {
    table.uuid('id').primary();
    table
      .uuid('userId')
      .references('id')
      .inTable('users')
      .notNullable()
      .onDelete('cascade');
    table.float('length');
    table.timestamp('date');
    table.float('time');
    table.dateTime('created_at').notNullable().defaultTo(knex.raw('now()'));
    table.dateTime('updated_at').notNullable().defaultTo(knex.raw('now()'));
  });
}

export async function down(knex: Knex): Promise<any> {
  await knex.schema.dropTable('runs').dropTable('users');
}
