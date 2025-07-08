/*
 * Copyright 2024 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

// @ts-check

/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function up(knex) {
  await knex.schema.alterTable('user_info', table => {
    table.renameColumn('exp', 'updated_at');
  });

  // Sqlite doesn't support adding a column with non-constant default when table has data
  // so we need to add it as nullable first, then set the value to the updated_at value
  await knex.schema.alterTable('user_info', table => {
    table.timestamp('created_at').nullable();
  });

  await knex('user_info').update({
    created_at: knex.ref('updated_at'),
  });

  // Then alter to non-nullable and set the default to now()
  await knex.schema.alterTable('user_info', table => {
    table
      .timestamp('created_at')
      .notNullable()
      .defaultTo(knex.fn.now())
      .alter();
  });
};

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function down(knex) {
  await knex.schema.alterTable('user_info', table => {
    table.dropColumn('created_at');
    table.renameColumn('updated_at', 'exp');
  });
};
