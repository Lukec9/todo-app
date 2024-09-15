import { NextFunction, Request, Response } from "express";
import csrf from "csrf";
import { ZodError } from "zod";
import Todo from "./models/todo.model.js";
import { todoSchema, userSchema } from "../../shared/dist/schemas.js";
import type { Todo as TodoType, UserExtended } from "../../shared/dist/types.js";

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

const csrfTokens = new csrf();

export function createCsrfToken(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  if (!req.session.csrfToken) {
    // @ts-ignore
    req.session.csrfToken = csrfTokens.create(req.session.id);
  }
  next();
}

export function verifyCsrfToken(req: Request, res: Response, next: NextFunction) {
  const csrfToken = req.headers["X-CSRF-Token"] || req.cookies.csrfToken;

  if (!csrfToken) {
    return res.status(403).json({ error: "CSRF token missing." });
  }

  if (csrfTokens.verify(req.session.id, csrfToken as string)) {
    return next();
  } else {
    return res.status(403).json({ error: "Invalid CSRF token." });
  }
}

export function verifyCsrfTokenOnRoutes(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const allowedMethods = ["POST", "PATCH", "DELETE"];

  if (allowedMethods.includes(req.method)) {
    verifyCsrfToken(req, res, next);
  } else {
    next();
  }
}

export const validateUser = (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password } = req.body;
  const result = userSchema.safeParse({ email, username, password });

  if (!result.success) {
    return res.status(400).json({ error: result.error.message });
  }

  next();
};
