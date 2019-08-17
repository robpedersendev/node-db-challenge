const express = require("express");
const router = express.router();
const db = require("../projectsModels-db");

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
