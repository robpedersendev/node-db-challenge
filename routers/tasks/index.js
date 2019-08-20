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

router.post("/", async (req, res) => {
  const { description, notes, completed, project_id } = req.body;

  if (!description || !project_id) {
    return res.status(400).json({
      error: "Task properties `description` and `project_id` are both required!"
    });
  }

  try {
    const [id] = await db("tasks").insert({
      description,
      notes,
      completed,
      project_id
    });
    const [task] = await db("tasks").where({ id });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({
      error: "Error occurred while attempting to add the task"
    });
  }
});

module.exports = router;
