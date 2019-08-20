const express = require("express");
const projectsRouter = require("./routers/projects");
const resourcesRouter = require("./routers/resources");
const tasksRouter = require("./routers/tasks");

const app = express();
app.use(express.json());
app.use("/api/projects", projectsRouter);
app.use("/api/resources", resourcesRouter);
app.use("/api/tasks", tasksRouter);

module.exports = app;
