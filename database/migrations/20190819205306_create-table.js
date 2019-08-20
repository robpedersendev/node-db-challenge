exports.up = function(knex) {
  return knex.schema
    .createTable("projects", table => {
      table.increments();
      table.string("name").notNullable();
      table.string("description");
      table
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
    })

    .createTable("resources", table => {
      table.increments();
      table
        .string("name")
        .unique()
        .notNullable();
      table.string("description");
    })

    .createTable("tasks", table => {
      table.increments();
      table.string("description").notNullable();
      table.string("notes");
      table
        .boolean("completed")
        .notNullable()
        .defaultTo(false);
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects");
    })

    .createTable("project_resources", table => {
      table
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("projects.id");
      table
        .integer("resource_id")
        .unsigned()
        .notNullable()
        .references("resources.id");
      table.primary(["project_id", "resource_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
