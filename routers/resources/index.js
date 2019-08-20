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

module.exports = router;
