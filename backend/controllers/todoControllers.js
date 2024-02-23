const todoModel = require("../models/todoModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

module.exports.index = async (req, res) => {
  if (!req.user) {
    // console.log(req.user);
    // console.log(req.session);
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    // console.log(req.user);
    // console.log(req.session);
    const todos = await todoModel.find({ author: req.user._id });
    // const todos = await todoModel.find({});
    res.status(200).json(todos);
  } catch (error) {
    // console.log(req.user);
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports.createTodo = async (req, res) => {
  try {
    // console.log(req.body.author);
    const todo = new todoModel(req.body);
    const user = await User.findById(req.body.author);
    user.todos.push(todo);
    await user.save();
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    // console.log(req.body);
    res.status(400).json({ error: error.message });
  }
};

module.exports.getTodo = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such todo" });
  }

  const todo = await todoModel
    .findById(id)
    .populate({ path: "author", select: "username email _id" });

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
