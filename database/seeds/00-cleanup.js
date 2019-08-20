exports.seed = async function(knex) {
  try {
    return knex("projects").del();
  } catch (error) {
    console.error(error);
  }
};
