exports.seed = function(knex) {
  return knex("projects").insert([
    {
      name: "project i",
      description: "project i's description",
      completed: false
    },
    {
      name: "project ii",
      description: "project ii's description",
      completed: true
    },
    {
      name: "project ii",
      description: "project iii's description",
      completed: false
    },
    {
      name: "project iv",
      description: "project iv's description",
      completed: true
    }
  ]);
};
