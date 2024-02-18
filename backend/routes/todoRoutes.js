const express = require("express");
const router = express.Router();
const todos = require("../controllers/todoControllers");

router.route("/").get(todos.index).post(todos.createTodo);

router
  .route("/:id")
  .get(todos.getTodo)
  .patch(todos.editTodo)
  .delete(todos.deleteTodo);

module.exports = router;
