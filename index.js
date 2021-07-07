//Imports the server.js functions
const server = require("./server");
//Sets the port to run the server to 5000 or to whatever the .env file is set to
const PORT = process.env.PORT || 5000;

//This is the initial GET request at the base URL of "/" 
server.get("/", (req, res) => {
  //This sends a JSON object back
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

//Tell the server what port to listen to and also to print to the console
server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
