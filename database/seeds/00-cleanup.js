exports.seed = async function(knex) {
  try {
    return knex("projects").del();
  } catch (error) {
    console.error(error);
  }
};

//This file serves as a delete all input data (not data attributes) for the projects database
