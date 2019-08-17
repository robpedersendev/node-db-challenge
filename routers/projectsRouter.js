const express = require("express");
const router = express.Router();
const db = require("../db-models/projectsModel-db");

router.get("/", async (req, res) => {
  try {
    const projects = await db.find();
    console.log(
      `This is coming from the ${
        req.method
      } request within projectsRouter.js. Here are the current projects: ${projects}`
    );
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.post("/", async (req, res) => {
  try {
    const newProject = await db.add(req.body);
    console.log(
      `This is coming from the ${
        req.method
      } request within projectsRouter.js. This project: ${newProject} was added`
    );
    res.status(200).json(newProject);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get("/:id", (req, res) => {
  db.findById(req.params.id)
    .then(project => {
      if (project) {
        console.log(
          `This is coming from the ${
            req.method
          } request within projectsRouter.js. You are now viewing the project with the id of: ${
            req.params.id
          }.`
        );
        res.status(200).json(project);
      } else {
        res.status(404), json({ message: "No id was found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
