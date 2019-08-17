const express = require("express");
const router = express.Router();
const db = require("../db-models/actionsModel-db");

router.get("/", async (req, res) => {
  try {
    const actions = await db.find();
    console.log(
      `This is coming from the ${
        req.method
      } request within actionsRouter.js. Here are the current actions: ${actions}`
    );
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const newProject = await Actions.add(req.body);
    console.log(
      `This is coming from the ${
        req.method
      } request within projectsRouter.js. This project: ${newProject} was added`
    );
    res.status(200).json("action added");
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
