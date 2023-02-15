/* controller file to manage the logic for routes relating to tasks*/

const Schemas = require("../models/schemas");
const mongoose = require('mongoose')

//creation of task. uses req. user object from checkJWTToken middleware. finds user id, and creates new
//db entry with task, and user id information (which can then be joined to render tasks on frontend for
//that specific user)
async function createTask(req, res) {
  try {
    const { email } = req.user
    const userId = await Schemas.Registrations.findOne({email: email})
    const task = await new Schemas.Tasks({
      task: req.body.task,
      completed: false,
      user: userId._id
    }).save();
    console.log('Task added');
    res.json({ message: 'Task added' });
  } catch (error) {
    console.log(error);
    res.json({ message: 'Task not added', error });
  }
}

//find task in database, based on id, and update according to user input
async function updateTask(req, res) {
  try{
    const updatedTask = await Schemas.Tasks.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), req.body, { new: true });
    console.log("Task updated");
    res.send(updatedTask);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

//get tasks to be rendered on frontend, and filter by the user id by using req. user object from checkJWTToken middleware
async function getTasks(req, res) {
  try{
    const { email } = req.user
    console.log(email)
    const tasks = await Schemas.Tasks.find().populate("user")
    const filteredTasks = tasks.filter((task) => task.user.email === email)
    console.log("Tasks fetched")
    res.send(filteredTasks)
  } catch (error) {
    console.log(error)
    res.send(error)
  }
}

//delete a task by finding the task id, and deleting it from database
async function deleteTask(req, res) {
  try {
    const deletedTask = await Schemas.Tasks.findByIdAndDelete(req.params.id);
    console.log("Task deleted");
    res.send(deletedTask);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
}

module.exports = { createTask, updateTask, getTasks, deleteTask };