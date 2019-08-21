//Initializes the express rotuer
const router = require("express").Router();
//Tells where the KNEX instruction manual is located
const db = require("../../database/config");

//This is the GET call
router.get("/", async (req, res) => {
  //Start a Try Catch statement
  try {
    //Create a projects variable that is assigned to the entire table "projects" which is being mapped over
    const projects = (await db("projects")).map(project => {
      //And returning 
      return {
        //Each individual project
        ...project,
        //And whether or not it is completed
        completed: project.completed === 0 ? false : true
      };
    });
    //We will also be sending the object of projects
    res.json(projects);
    //Unless there is an error
  } catch (error) {
    //Then we will return an HTTP status code of 500 and a JSON object
    res.status(500).json({
      //With an explicitly permanent error message
      error: "Error occurred while attempting to get the projects"
    });
  }
});

//This is the GET by ID call
router.get("/:id", async (req, res) => {
  //Destructure the id from the req.params
  const { id } = req.params;
  //Start a Try Catch statement
  try {
    //Create a array assignment that is assigned to the table "projects" using a where filter to specifically find the project with the previously destructured id value
    let [project] = await db("projects").where({ id });
    //If the project has no value
    if (!project) {
      //Then return an HTTP error code of 404
      return res.status(404).json({
        //And also send back a JSON object with an explicit error message
        error: `Project with 'id' ${id} does not exist`
      });
      //If there is a value for project
    } else {
      //Then assign the variable of tasks to be the foreign ID of all tasks that have the matching project id
      const tasks = await db("tasks").where({ project_id: id });
      //Then assign the variable of resources to be the foreign ID of all resources that have an assignment to the previously specified project id
      //~~~Litteral Translation~~~
      //Create resources variable, Do not continue until the following is done
      //1. Using the table "resources" use the .whereIn() filter. This takes two arguments. First is an integer which in this case represents the id that is apart of the req.params, and the second is an anonymous callback function
      //2. SELECT resource_id FROM project_resources (a column) WHERE the project_id matches the id destructured up above
      const resources = await db("resources").whereIn("id", function() {
        this.select("resource_id")
          .from("project_resources")
          .where({ project_id: id });
      });
      //The project will then be presented as a single object, with its details in the root of the object, the tasks as an array in the roote of the object and the resources as an array in the root of the object
      project = { ...project, tasks, resources };
      //Then we are going to return that project object as a JSON object
      return res.json(project);
    }
    //Unless there is an error message
  } catch (error) {
    //Then we will return an error message with an HTTP status code of 500
    res.status(500).json({
      //And an explicit error message 
      error: "Error occurred while attempting to get the project"
    });
  }
});

//This is the POST API call
router.post("/", async (req, res) => {
  //Desctructures values from the body of what was sent to the server
  const { name, description, completed } = req.body;
  //This checks the name for name value
  if (!name) {
    //If no value, then return an HTTP status of 400 and the JSON object
    return res.status(400).json({
      //With an explicit error message
      error: "Project property `name` is required!"
    });
  }
  //If there is a value, initiate a Try/Catch
  try {
    //Create an array assigned the value of id to be what was sent to the server to be inserted in the projects table
    const [id] = await db("projects").insert({ name, description, completed });
    //Create an array assigned the value of project to be what the value of the previously established array of "ID"
    const [project] = await db("projects").where({ id });
    //Then send an HTTP status of 201 and return the newly created project back to the user
    res.status(201).json(project);
    //Unless there is an error message
  } catch (error) {
    //If there is then send an HTTP status of 500 with the JSON object
    res.status(500).json({
      //With an explicit error message
      error: "Error occurred while attempting to add the project"
    });
  }
});

module.exports = router;
