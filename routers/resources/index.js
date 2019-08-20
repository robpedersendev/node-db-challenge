//Initializes the express rotuer
const router = require("express").Router();
//Tells where the KNEX instruction manual is located
const db = require("../../database/config");

//This is the GET call
router.get("/", async (req, res) => {
  //Start a Try Catch statement
  try {
    //Create a resources variable that is assigned to the entire table "resources"
    const resources = await db("resources");
    //Return that assignment as a json object, and return a http 200 code
    res.json(resources).status(200);
    //Unless there is an error
  } catch (error) {
    //If there is an error, then we will return an HTTP status of 500
    res.status(500).json({
      //And pass in a pre-established error message
      error: "Error occurred while attempting to get the resources"
    });
  }
});

//This is the POST API call
router.post("/", async (req, res) => {
  //Desctructures values from the body of what was sent to the server
  const { name, description } = req.body;
  //This checks the name for name value
  if (!name) {
    //If there is no value then return a status of 400, and a the JSON obejct
    return res.status(400).json({
      //Which is an error message
      error: "Resource property `name` is required!"
    });
  }
  //If there is a value for name, then initiate a TRY/CATCH statement
  try {
    //Create an array assignement that is assigned to the insertion of the destructured values above into the reources database
    const [id] = await db("resources").insert({ name, description });
    //Once that await completes then we are going to assign what was inserted in the reources database directly from the resoruces database and assign it to the array assignement of resources
    const [resource] = await db("resources").where({ id });
    //Once that await completes we will send a HTTP status of 201, and the object "resoruce" that we just got
    res.status(201).json(resource);
        //Unless there is an error message
  } catch (error) {
      //If there is an error, then we will return an HTTP status of 500
      res.status(500).json({
        //And pass in a pre-established error message
        error: "Error occurred while attempting to add the resource"
     });
  }
});

//Export this as a router item
module.exports = router;
