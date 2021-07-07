exports.seed = function(knex) {
  return knex("resources").insert([
    { name: "resource i", description: "resource i's description" },
    { name: "resource ii", description: "resource ii's description" },
    { name: "resource iii", description: "resource iii's description" },
    { name: "resource iv", description: "resource iv's description" }
  ]);
};


//This seed file inserts pre-existing data to the resources table