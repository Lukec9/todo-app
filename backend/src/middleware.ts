import { NextFunction, Request, Response } from "express";
import Todo from "./models/todo.model.js";
import type { Todo as TodoType, UserExtended } from "../../shared/dist/types.js";
import { todoSchema } from "../../shared/dist/schemas.js";
import { ZodError } from "zod";

export const validateTodo = (req: Request, res: Response, next: NextFunction) => {
  try {
    todoSchema.parse(req.body);
    next();
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        error: "Invalid request data",
        details: error.errors,
      });
    }

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const isAuthor = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const user = req.user as UserExtended;

  if (!user?._id) {
    return res.status(401).json({ message: "User not authenticated" });
  }

  const todo: TodoType | null = await Todo.findById(id);

  if (todo === null) {
    return res.status(404).json({ message: "Todo not found" });
  }
  //@ts-expect-error it is an objectid
  if (!todo.author.equals(user._id)) {
    return res
      .status(403)
      .json({ message: "You do not have permission to do that!" });
  }

  next();
};

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json("You aren't logged in");
  }
  next();
};

export const isCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  // Cast req.user to UserExtended
  const user = req.user as UserExtended;

  if (user && req.params.id.toString() === user._id.toString()) {
    next();
  } else {
    return res
      .status(403)
      .json({ error: "You are not authorized to access this resource." });
  }
};
