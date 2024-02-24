const express = require("express");
const router = express.Router();
const todos = require("../controllers/todoControllers");
const { validateTodo, isAuthor, isLoggedIn } = require("../middleware");

// Validation middleware is giving me an error that tells me
// some views are trying to be rendered
// And I'm assuming it has to do with the dependencies
// THIS IS AFTER FIXING: I forgot about this basically I just needed to res.json instead of
// Other things

router
  .route("/")
  .get(isLoggedIn, todos.index)
  .post(isLoggedIn, validateTodo, todos.createTodo);

router
  .route("/:id")
  .get(isLoggedIn, isAuthor, todos.getTodo)
  .patch(isLoggedIn, isAuthor, validateTodo, todos.editTodo)
  .delete(isLoggedIn, isAuthor, todos.deleteTodo);

module.exports = router;
