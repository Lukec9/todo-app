import { Request, Response } from 'express'
import todoModel from "../models/todo.model.js";
import type { Todo } from '@shared/types.js'
import User from "../models/user.model.js";
import mongoose from "mongoose";

const index = async (req: Request, res: Response) => {
  const user = req.user

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const todos: Todo[] = await todoModel
      //@ts-ignore
      .find({ author: user._id })
      .sort({ createdAt: -1 });
    res.status(200).json(todos);
  } catch (error) {
    console.error("Error fetching todos:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createTodo = async (req: Request, res: Response) => {
  try {
    const todo = new todoModel(req.body);
    const user = await User.findById(req.body.author);
    user.todos.push(todo);
    await user.save();
    await todo.save();
    res.status(200).json(todo);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ error: error.message });

    }
  }
};

const getTodo = async (req: Request, res: Response) => {
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

const editTodo = async (req: Request, res: Response) => {
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

const deleteTodo = async (req: Request, res: Response) => {
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

export default {
  index, createTodo, getTodo, editTodo, deleteTodo
}