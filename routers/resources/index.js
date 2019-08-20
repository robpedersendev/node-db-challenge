const router = require("express").Router();
const db = require("../../database/config");

router.get("/", async (req, res) => {
  try {
    const resources = await db("resources");
    res.json(resources);
  } catch (error) {
    res.status(500).json({
      error: "Error occurred while attempting to get the resources"
    });
  }
});

router.post("/", async (req, res) => {
  const { name, description } = req.body;

  if (!name) {
    return res.status(400).json({
      error: "Resource property `name` is required!"
    });
  }

  try {
    const [id] = await db("resources").insert({ name, description });
    const [resource] = await db("resources").where({ id });
    res.status(201).json(resource);
  } catch (error) {
    res.status(500).json({
      error: "Error occurred while attempting to add the resource"
    });
  }
});

module.exports = router;
