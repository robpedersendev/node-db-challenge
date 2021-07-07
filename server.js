//Gain access to express
const express = require("express");

//Importing routes
const projectsRouter = require("./routers/projects");
const resourcesRouter = require("./routers/resources");
const tasksRouter = require("./routers/tasks");

//Set server to the express functions
const server = express();

//Force all endpoints to be seen as JSON endpoints
server.use(express.json());

//Routes
server.use("/api/projects", projectsRouter);
server.use("/api/resources", resourcesRouter);
server.use("/api/tasks", tasksRouter);

module.exports = server;
