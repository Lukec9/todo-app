const express = require("express");
const router = express.Router();
const todos = require("../controllers/todoControllers");
const { validateTodo } = require("../middleware");

// Validation middleware is giving me an error that tells me
// some views are trying to be rendered
// And I'm assuming it has to do with the dependencies

router.route("/").get(todos.index).post(validateTodo, todos.createTodo);

router
  .route("/:id")
  .get(todos.getTodo)
  .patch(validateTodo, todos.editTodo)
  .delete(todos.deleteTodo);

module.exports = router;
