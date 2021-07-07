const knex = require("knex");
const config = require("../../knexfile");

module.exports = knex(config.development);


//This file is needed so that anytime KNEX is called to do a SQL query on the database, KNEX knows where to go - how to connect - and any other relevant information. 