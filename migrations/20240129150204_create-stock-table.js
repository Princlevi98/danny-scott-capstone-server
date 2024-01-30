/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("stock", function (table) {
    table.increments("id").primary();
    table
      .integer("location_id")
      .unsigned()
      .references("location.id")
      .onUpdate("CASCADE")
      .onDelete("CASCADE");
    table.string("item_name").notNullable();
    // table.string("status").notNullable();

    table.integer("quantity").notNullable();
    table.string("description").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table
      .timestamp("updated_at")
      .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("stock");
};
