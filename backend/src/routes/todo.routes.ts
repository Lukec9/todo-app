import express from "express";
const router = express.Router();
import todos from "../controllers/todo.controller.js";
import { validateTodo, isAuthor, isLoggedIn } from "../middleware.js";

router
  .route("/")
  .get(isLoggedIn, todos.index)
  .post(isLoggedIn, validateTodo, todos.createTodo);

router
  .route("/:id")
  .get(isLoggedIn, isAuthor, todos.getTodo)
  .patch(isLoggedIn, isAuthor, validateTodo, todos.editTodo)
  .delete(isLoggedIn, isAuthor, todos.deleteTodo);

export default router;
