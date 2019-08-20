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
