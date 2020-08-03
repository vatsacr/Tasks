const express = require("express");
//const mongodb = require("mongodb");
const Task = require("../models/Task");

const router = express.Router();

//Get tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.json({ message: err });
  }
});

//Add task
router.post("/", async (req, res) => {
  const task = new Task({
    name: req.body.name,
  });
  try {
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.json({ message: err });
  }
});

//Get specific task
router.get("/:taskId", async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    res.json(task);
  } catch (err) {
    res.json({ message: err });
  }
});

//Delete task
router.delete("/:taskId", async (req, res) => {
  try {
    const task = await Task.remove({ _id: req.params.taskId });
    res.json(task);
  } catch (err) {
    res.json({ message: err });
  }
});

//Update task
router.put("/:taskId", async (req, res) => {
  try {
    const updatedTask = await Task.updateOne(
      { _id: req.params.taskId },
      { $set: { name: req.body.name, status: req.body.status } }
    );
    res.json(updatedTask);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
