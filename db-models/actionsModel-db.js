const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  add
};

function find() {
  return db("actions");
}

function findById(id) {
  return db("actions")
    .where({ id })
    .first();
}

function add(project) {
  return db("actions").insert(project);
}
