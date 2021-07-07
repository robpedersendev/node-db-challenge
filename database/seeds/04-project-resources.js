exports.seed = function(knex) {
  return knex("project_resources").insert([
    { project_id: 1, resource_id: 1 },
    { project_id: 1, resource_id: 2 },
    { project_id: 1, resource_id: 3 },
    { project_id: 1, resource_id: 4 },
    { project_id: 2, resource_id: 3 },
    { project_id: 2, resource_id: 4 }
  ]);
};


//This seed file inserts pre-existing data into the project_resoruces table