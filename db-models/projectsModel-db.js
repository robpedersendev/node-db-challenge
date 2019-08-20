const knex = require("knex");
const knexConfig = require("../knexfile");
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  add,
  getProjectPlusActions
};

function find() {
  return db("projects");
}

function findActions(id) {
  return db("actions").where({ "actions.project_id": id });
}

async function findById(id) {
  const project = await db("projects")
    .where({ id })
    .first();

  const actions = await findActions(id);
  return project, [actions];
}

function add(project) {
  return db("projects").insert(project);
}

function getProjectPlusActions(id) {
  return db("actions")
    .where({ "actions.project_id": id })
    .join("projects", "project_id", "actions.project_id")
    .select(
      "projects.id",
      "projects.name",
      "projects.description",
      "projects.isCompleted"
    )
    .first();
}
