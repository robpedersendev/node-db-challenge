const router = require("express").Router();
const db = require("../../database/config");

router.get("/", async (req, res) => {
  try {
    const projects = (await db("projects")).map(project => {
      return {
        ...project,
        completed: project.completed === 0 ? false : true
      };
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({
      error: "Error occurred while attempting to get the projects"
    });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let [project] = await db("projects").where({ id });

    if (!project) {
      return res.status(404).json({
        error: `Project with 'id' ${id} does not exist`
      });
    } else {
      const tasks = await db("tasks").where({ project_id: id });
      const resources = await db("resources").whereIn("id", function() {
        this.select("resource_id")
          .from("project_resources")
          .where({ project_id: id });
      });
      project = { ...project, tasks, resources };
      return res.json(project);
    }
  } catch (error) {
    res.status(500).json({
      error: "Error occurred while attempting to get the project"
    });
  }
});
