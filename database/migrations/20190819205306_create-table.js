//Once a migration file has been created, after you run npx knex migrate:latest, you will need to create a new one if your knex seed files require an additional table within your existing database. 

//This doesnt mean that you can not create a new one directly in SQLite or other SQL platform, however. 

//The exports.up is the instructions to create or add data to the db
exports.up = function(knex) {
  //Create the Schema
  return knex.schema
    //.createTable creates the table and takes in two arguments
    //First is the name of the table, second is the individual column type, then the column name, and the additional attributes
    .createTable("projects", table => {
      //This defaults to the name of "id" in the database
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

//The exports.down is the instructions to delete the database tables, but you have to call them explicitly
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
