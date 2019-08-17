const express = require("express");
const helmet = require("helmet");

const PORT = process.env.PORT || 6500;

const server = express();

server.use(helmet());
server.use(express.json());

//Logs to the terminal
server.use(logger);

function logger(req, res, next) {
  console.log(`${req.method} at ${req.url} was just performed`);
  next();
}

server.get("/", (req, res) => {
  res.status(200).send("<h1>Welcome to the NodeDB Challenge</h1>");
});

server.use("/api/projects", require("./routers/projectsRouter"));
server.use("/api/actions", require("./routers/actionsRouter"));

server.listen(PORT, () => {
  console.log(`The server is listening on ${PORT}`);
});
