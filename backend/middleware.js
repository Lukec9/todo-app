const Todo = require("./models/todoModel");
const { todoSchema } = require("./schemas.js");

module.exports.validateTodo = (req, res, next) => {
  const { error } = todoSchema.validate(req.body);
  console.log(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(",");
    res.status(400).json({ error: msg });
  } else {
    next();
  }
};

module.exports.isAuthor = async (req, res, next) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  if (!todo.author.equals(req.user._id)) {
    return res.json("error", "You do not have permission to do that!");
  }
  next();
};

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.json("You aren't logged in");
  }
  next();
};

module.exports.isAuthorized = (req, res, next) => {
  if (req.user && req.params.id.toString() === req.user._id.toString()) {
    next();
  } else {
    console.log(req.user._id, "yes", req.params.id, "the params");
    return res
      .status(403)
      .json({ error: "You are not authorized to access this resource." });
  }
};
