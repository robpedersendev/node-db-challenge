const server = require("./server");
const PORT = process.env.PORT || 5000;

server.get("/", (req, res) => {
  res.json({
    message:
      "Thanks for trying this API! CRUD operations can be made on the " +
      "following routes:",
    routes: {
      projects: "/api/projects",
      resources: "/api/resources",
      tasks: "/api/tasks"
    }
  });
});

server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
