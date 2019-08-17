const express = require("express");
const router = express.Router();
const Actions = require("../models/actionsModel");

router.get("/", async (req, res) => {
  try {
    const actions = await Actions.find();
    res.status(200).json(actions);
  } catch (error) {
    res.status(500).json(error);
  }
});
