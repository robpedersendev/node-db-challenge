//Initializes the express rotuer
const router = require("express").Router();

//Tells where the KNEX instruction manual is located
const db = require("../../database/config");

//This is the GET call
router.get("/", async (req, res) => {
  //Start a Try Catch statement
  try {
    //Create a tasks variable that has the assignment of
    const tasks = (await db
      //This is a Select call on the DB
      .select(
        //All tasks, 
        "tasks.*",
        //select the descriptions of the projects as "project_description"
        "projects.description as project_description",
        //Select the name of the projects as "project_name"
        "projects.name as project_name"
      )
      //This is a FROM qualifier in KNEX, for the tasks table
      .from("tasks")
      //This is a LEFT JOIN (The LEFT JOIN keyword returns all records from the left table, even if there are no matches in the right table.)
      //This also has it map over every item in the DB
      .leftJoin("projects", "tasks.project_id", "projects.id")).map(task => {
        //And has it return
      return {
        //Every task
        ...task,
        //And then reviews to see if the task has been completed or not using a ternery operator and truthiness values
        completed: task.completed === 0 ? false : true
      };
    });
    //This will return all the tasks once the await piece finishes
    res.json(tasks).status(200);
    //Unless there is an error
  } catch (error) {
    //If there is an error, then we will return an HTTP status of 500
    res.status(500).json({
      //And pass in a pre-established error message
      error: "Error occurred while attempting to get the tasks"
    });
  }
});

//This is the POST API call
router.post("/", async (req, res) => {
  //We will use destructuring to pull specific values from the body of what was sent to the server
  const { description, notes, completed, project_id } = req.body;
  //This check to make sure that both the description and the project_id have a value, if either do not
  if (!description || !project_id) {
    //Then return a status of 400, 
    return res.status(400).json({
      //And an error message 
      error: "Task properties `description` and `project_id` are both required!"
    });
  }
  //If there are valuesfor both, then initialize a try/catch
  try {
    //We are creating an array that is assigned the result of inserting
    const [id] = await db("tasks").insert({
      //The vlaues that were destructured up above
      description,
      notes,
      completed,
      project_id
    });
    //We are a creating a new array assignment of the values sent to the server
    const [task] = await db("tasks").where({ id });
    //This is sending a 201 status back to the user and is passing the same object back to the user
    res.status(201).json(task);
    //Unless there is an error message
  } catch (error) {
    //If there is an error, then we will return an HTTP status of 500
    res.status(500).json({
      error: "Error occurred while attempting to add the task"
      //And pass in a pre-established error message

    });
  }
});

//Export this as a router item
module.exports = router;
