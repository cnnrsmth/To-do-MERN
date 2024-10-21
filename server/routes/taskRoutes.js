/*used for handling routes relating to tasks, such as posting, editing, deleting, and grabbing*/

const express = require("express");
const taskController = require("../controllers/taskController");
const {
  checkJWTToken,
  checkTaskLength,
  checkContentType,
} = require("../middleware/middleware");
const router = express.Router();

//posts a task. uses multiple middleware to e.g. authenticate user token, check type, length etc. Makes a
//call to createTask controller in taskController
router.post(
  "/",
  checkJWTToken,
  checkTaskLength,
  checkContentType,
  taskController.createTask
);

//edit task. makes a call to updateTask controller in taskController
router.put("/:id", taskController.updateTask);

//gets tasks to display on UI. makes a call to getTasks controller in taskController. Uses middleware to
//authenticate user token (and ubsequently conditionally render the tasks relevant to that specific user)
router.get("/getTasks", checkJWTToken, taskController.getTasks);

//deletes tasks. makes a call to deleteTasks controller in taskController
router.delete("/:id", taskController.deleteTask);

module.exports = router;
