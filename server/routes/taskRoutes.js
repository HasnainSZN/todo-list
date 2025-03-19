const express = require("express");
const Task = require("../models/Task");

const router = express.Router();

// Create a Task
router.post("/", async (req, res) => {
  const newTask = new Task(req.body);
  await newTask.save();
  res.json(newTask);
});

// Get All Tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Update a Task
router.put("/:id", async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTask);
});

// Delete a Task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
});

module.exports = router;
