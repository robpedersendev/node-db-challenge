module.exports = {
  //Sets up development environment of KNEX
  development: {
    //What type of DB we are using
    client: "sqlite3",
    connection: {
      //Where the DB file should be saved to/created at
      filename: "./database/projects.db3"
    },
    //Replaces undefined keys as a NULL value in the DB
    useNullAsDefault: true,
    //Where the migrations folder will be saved/created at
    migrations: {
      directory: "./database/migrations/"
    },
    //Where the seed (the initial data for the DB) data is saved/created at
    seeds: {
      directory: "./database/seeds/"
    }
  }
};
