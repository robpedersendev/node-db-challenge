const router = require("express").Router();
const db = require("../../database/config");

router.get("/", async (req, res) => {
  try {
    const tasks = (await db
      .select(
        "tasks.*",
        "projects.description as project_description",
        "projects.name as project_name"
      )
      .from("tasks")
      .leftJoin("projects", "tasks.project_id", "projects.id")).map(task => {
      return {
        ...task,
        completed: task.completed === 0 ? false : true
      };
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      error: "Error occurred while attempting to get the tasks"
    });
  }
});

module.exports = router;
