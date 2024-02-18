const todoModel = require("../models/todoModel");
const mongoose = require("mongoose");

module.exports.index = async (req, res) => {
  const todos = await todoModel.find({});
  res.status(200).json(todos);
};

module.exports.createTodo = async (req, res) => {
  try {
    const todo = new todoModel(req.body);
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports.getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }

  const todo = await todoModel.findById(id);

  if (!todo) {
    return res.status(404).json({ error: "No such todo" });
  }

  res.status(200).json(todo);
};

module.exports.editTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such todo" });
  }

  const todo = await todoModel.findByIdAndUpdate(id, { ...req.body });

  if (!todo) {
    return res.status(400).json({ error: "No such todo" });
  }

  res.status(200).json(todo);
};

module.exports.deleteTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such todo" });
  }

  const todo = await todoModel.findByIdAndDelete(id);

  if (!todo) {
    return res.status(400).json({ error: "No such todo" });
  }

  res.status(200).json(todo);
};
