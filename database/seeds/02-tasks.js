exports.seed = function(knex) {
  return knex("tasks").insert([
    {
      description: "task i description",
      notes: "these are notes",
      completed: false,
      project_id: 1
    },
    {
      description: "task ii description",
      notes: "these are notes",
      completed: true,
      project_id: 2
    },
    {
      description: "task iii description",
      notes: "these are notes",
      completed: false,
      project_id: 3
    },
    {
      description: "task iv description",
      notes: "these are notes",
      completed: true,
      project_id: 4
    }
  ]);
};

//This seed file inserts data into the tasks table